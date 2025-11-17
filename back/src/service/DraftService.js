import {
    createDraftQuery,
    createColorQuery,
    createFormAnswerQuery,
    createFormQuestionQuery,
    createInvitationColorQuery,
    createPlaceQuery,
    createPlanItemQuery,
    createWishQuery,
    deleteFormAnswersQuery,
    deleteFormQuestionsQuery,
    deleteInvitationColorsQuery,
    deletePlanItemsQuery,
    deleteWishesQuery,
    getAllInvitationsQuery,
    getColorIdQuery,
    getFormQuestionByPositionQuery,
    getInvitationPlaceIdQuery,
    getInvitationQuery,
    getTemplateIdQuery,
    updateInvitationPlaceIdQuery,
    updateInvitationsQuery,
    updatePlaceQuery, publishInvitationQuery, deleteInvitation, getDraftQuery
} from "../queries/InvitationQueries.js";

import {
    beginTransaction,
    commitTransaction,
    connectClient,
    releaseClient,
    rollbackTransaction
} from "../queries/CommonQueries.js";

import {getInvitationDetails} from "../utils/InvitationUtils.js";
import {errorResponse} from "../utils/errorUtils.js";
import {cleanupAllImages, cleanupOldImages, getParams, r2} from "../utils/R2Utils.js";

export const createDraft = async (userId, templateName) => {
    let client;
    try {
        client = await connectClient();
        const template = await getTemplateIdQuery(templateName, client);
        if (template.length === 0)
            return errorResponse('Template not found');

        const draft = await createDraftQuery(userId, template[0].id, client);
        let defaultColors;
        switch (templateName) {
            case "red_velvet":
                defaultColors = [
                    { colorCode: "#FFFFFF", position: 0 },
                    { colorCode: "#CC231A", position: 1 },
                    { colorCode: "#821415", position: 2 },
                    { colorCode: "#1C1C1C", position: 3 },
                ];
                break;
            case "nezhnost":
                defaultColors = [
                    { colorCode: "#EBCECA", position: 0 },
                    { colorCode: "#D2A69D", position: 1 },
                    { colorCode: "#A2AEBA", position: 2 },
                    { colorCode: "#7C8D9D", position: 3 },
                ];
                break;
            default:
                defaultColors = [
                    { colorCode: "#FFFFFF", position: 0 },
                    { colorCode: "#FFFFFF", position: 1 },
                    { colorCode: "#FFFFFF", position: 2 },
                    { colorCode: "#FFFFFF", position: 3 },
                ];
                break;
        }
        const defaultWishes = [{wish: "Будем очень признательны, если Вы воздержитесь от криков «Горько». Ведь поцелуй – это знак выражения чувств, и он не может быть по заказу.", position: 0}, {wish: "Мы с теплотой относимся к детям любого возраста. Но для свадьбы выбрали формат 18+.", position: 1}];

        for (const { colorCode, position } of defaultColors) {
            const existingColor = await getColorIdQuery(colorCode, client);
            const colorId = existingColor.length ? existingColor[0].id : (await createColorQuery(colorCode, client))[0].id;
            await createInvitationColorQuery(draft[0].id, colorId, position, client);
        }
        for (const wish of defaultWishes) {
            await createWishQuery(wish.wish, wish.position, draft[0].id, client);
        }

        const response = await getInvitationDetails(draft[0].id, false, client);
        await commitTransaction(client);

        return response;
    } catch (error) {
        return errorResponse('Failed to create draft: ' + error);
    } finally {
        if (client) releaseClient(client);
    }
};

export const uploadImageToDraft = async (draftId, file, type, userId) => {
    let draft;
    let currentPlace;

    const params = getParams(file, type, draftId);
    const data = await r2.upload(params).promise();
    const imageUrl = data.Location;
    if (!(type === "coupleImage" || type === "placeImage"))
        return errorResponse('Invalid type');

    if (type === "placeImage") {
        draft = await getDraft(draftId, userId);
        currentPlace = draft.place;
    }

    const updateResult = await updateDraft(
        draftId,
        type === "coupleImage" ? {coupleImage: imageUrl} : {place: {...currentPlace, placeImage: imageUrl}},
        userId);
    if (updateResult.error) {
        await r2.deleteObject(params).promise();
        return errorResponse('Failed to upload image');
    } else {
        await cleanupOldImages(draftId, type, params.Key);
        return updateResult;
    }
}

export const resetDraftImage = async (draftId, type, userId) => {
    if (!(type === "coupleImage" || type === "placeImage"))
        return errorResponse('Invalid type');

    const updateResult = await updateDraft(
        draftId,
        type === "coupleImage" ? {coupleImage: null} : {place: {placeImage: null}},
        userId);
    if (updateResult.error) {
        return errorResponse('Failed to upload image');
    } else {
        await cleanupAllImages(draftId, type);
        return updateResult;
    }
}

export const updateDraft = async (draftId, data, userId) => {
    let client;
    try {
        client = await connectClient();
        await beginTransaction(client);

        const draft = await getDraftQuery(draftId, userId, client);
        if (draft.length === 0) {
            return errorResponse('Draft not found');
        }

        const {
            firstPartnerName: firstPartnerName,
            secondPartnerName: secondPartnerName,
            coupleImage: coupleImage,
            eventDate: eventDate,
            templateName: templateName,
            colors: colors,
            place: place,
            planItems: planItems,
            wishes: wishes,
            questions: questions,
            answers: answers
        } = data;

        const updates = [];
        const values = [];

        if (firstPartnerName) {
            updates.push(`partner_1_name = $${updates.length + 1}`);
            values.push(firstPartnerName);
        }
        if (secondPartnerName) {
            updates.push(`partner_2_name = $${updates.length + 1}`);
            values.push(secondPartnerName);
        }
        if (coupleImage !== undefined) {
            updates.push(`couple_image = $${updates.length + 1}`);
            values.push(coupleImage);
        }
        if (eventDate) {
            updates.push(`event_date = $${updates.length + 1}`);
            values.push(eventDate);
        }

        if (templateName) {
            const template = await getTemplateIdQuery(templateName, client);
            if (template.length === 0) {
                return errorResponse('Template not found');
            }
            updates.push(`template_id = $${updates.length + 1}`);
            values.push(template[0].id);
        }

        if (updates.length > 0) {
            await updateInvitationsQuery(`SET ${updates.join(', ')}`, [...values, draftId], client);
        }

        // Handle place updates
        if (place) {
            const placeRecord = await getInvitationPlaceIdQuery(draftId, client);
            if (placeRecord.length && placeRecord[0].place_id) {
                // Update existing place
                await updatePlaceQuery(place.address, place.placeImage, place.link, placeRecord[0].place_id, client);
            } else {
                // Create new place
                const newPlace = await createPlaceQuery(place.address, place.placeImage, place.link, client);
                await updateInvitationPlaceIdQuery(newPlace[0].id, draftId, client);
            }
        }

        // Handle colors updates
        if (colors) {
            await deleteInvitationColorsQuery(draftId, client);
            for (const { colorCode, position } of colors) {
                const existingColor = await getColorIdQuery(colorCode, client);
                const colorId = existingColor.length ? existingColor[0].id : (await createColorQuery(colorCode, client))[0].id;
                await createInvitationColorQuery(draftId, colorId, position, client);
            }
        }

        // Handle plan items updates
        if (planItems) {
            await deletePlanItemsQuery(draftId, client);
            for (const item of planItems) {
                await createPlanItemQuery(item.eventTime, item.description, item.position, draftId, client);
            }
        }

        // Handle wishes updates
        if (wishes) {
            await deleteWishesQuery(draftId, client);
            for (const wish of wishes) {
                await createWishQuery(wish.wish, wish.position, draftId, client);
            }
        }

        // Handle questions updates
        const insertedQuestions = [];
        if (questions) {
            await deleteFormQuestionsQuery(draftId, client);
            for (const question of questions) {
                const newQuestion = await createFormQuestionQuery(question.question, question.type, question.position, draftId, client);
                insertedQuestions.push(newQuestion[0]);
            }
        }

        if (answers) {
            await deleteFormAnswersQuery(draftId, client);
            for (const answer of answers) {
                const question = await getFormQuestionByPositionQuery(draftId, answer.questionPosition, client);
                if (questions.filter((q) => q.position === answer.questionPosition) === 0 && question.length === 0) {
                    return errorResponse('Question for some of the answers not found');
                }
                question.push(...insertedQuestions);
                await createFormAnswerQuery(answer.answer, question[0].id, answer.position, draftId, client);
            }
        }

        await commitTransaction(client);
        return await getInvitationDetails(draftId, false, client);
    } catch (error) {
        console.log(error);
        if (client) await rollbackTransaction(client);
        return errorResponse('Failed to update draft');
    } finally {
        if (client) releaseClient(client);
    }
};

export const publishDraft = async (invitationId, userId) => {
    let client;
    try {
        client = await connectClient();
        const existingDraft = await getDraftQuery(invitationId, userId, client);
        if (existingDraft.length === 0)
            return errorResponse('Draft not found');

        await publishInvitationQuery(invitationId, userId, client);
        return await getInvitationDetails(invitationId, true, client);
    } catch (error) {
        return errorResponse('Failed to publish invitation: ' + error);
    } finally {
        if (client) releaseClient(client);
    }
};

export const getDraft = async (draftId, userId) => {
    let client;
    try {
        client = await connectClient();
        const draftInfo = await getInvitationDetails(draftId, false, client);
        if (!draftInfo || draftInfo.authorId !== userId)
            return errorResponse('Draft not found');
        return draftInfo;
    } catch (error) {
        console.log(error)
        return errorResponse('Failed to retrieve draft');
    } finally {
        if (client) releaseClient(client);
    }
};

export const getAllDrafts = async (userId) => {
    let client;
    try {
        client = await connectClient();
        const drafts = await getAllInvitationsQuery(userId, false, client);
        return await Promise.all(drafts.map(draft => getInvitationDetails(draft.id, false, client)));
    } catch (error) {
        console.log(error)
        return errorResponse('Failed to retrieve drafts');
    } finally {
        if (client) releaseClient(client);
    }
};

export const deleteDraft = async (draftId, userId) => {
    let client;
    try {
        client = await connectClient();
        const draft = await getDraftQuery(draftId, userId, client);
        if (draft.length === 0)
            return errorResponse('Draft not found');

        await deleteInvitation(draftId, userId, client);

        await commitTransaction(client);

        return { message: 'Draft deleted successfully' };
    } catch (error) {
        return errorResponse('Failed to delete draft: ' + error.message);
    } finally {
        if (client) releaseClient(client);
    }
};
