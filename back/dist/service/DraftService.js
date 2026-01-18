import prisma from "../config/prisma.js";
import { createDraftQuery, createColorQuery, createFormAnswerQuery, createFormQuestionQuery, createInvitationColorQuery, createPlaceQuery, createPlanItemQuery, createWishQuery, deleteFormAnswersQuery, deleteFormQuestionsQuery, deleteInvitationColorsQuery, deletePlanItemsQuery, deleteWishesQuery, getAllInvitationsQuery, getColorIdQuery, getFormQuestionByPositionQuery, getInvitationPlaceIdQuery, getTemplateIdQuery, updateInvitationPlaceIdQuery, updatePlaceQuery, publishInvitationQuery, deleteInvitation, getDraftQuery } from "../queries/InvitationQueries.js";
import { getInvitationDetails } from "../utils/InvitationUtils.js";
import { errorResponse } from "../utils/errorUtils.js";
import logger from "../logger.js";
import { cleanupAllImages, cleanupOldImages, getParams, r2 } from "../utils/R2Utils.js";
export const createDraft = async (userId, templateName) => {
    try {
        return await prisma.$transaction(async (tx) => {
            const template = await getTemplateIdQuery(templateName, tx);
            if (template.length === 0)
                return errorResponse("Template not found");
            const draft = await createDraftQuery(userId, template[0].id, tx);
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
            const defaultWishes = [
                { wish: "Будем очень признательны, если Вы воздержитесь от криков «Горько». Ведь поцелуй – это знак выражения чувств, и он не может быть по заказу.", position: 0 },
                { wish: "Мы с теплотой относимся к детям любого возраста. Но для свадьбы выбрали формат 18+.", position: 1 }
            ];
            for (const { colorCode, position } of defaultColors) {
                const existingColor = await getColorIdQuery(colorCode, tx);
                const colorId = existingColor.length ? existingColor[0].id : (await createColorQuery(colorCode, tx))[0].id;
                await createInvitationColorQuery(draft[0].id, colorId, position, tx);
            }
            for (const wish of defaultWishes) {
                await createWishQuery(wish.wish, wish.position, draft[0].id, tx);
            }
            const details = await getInvitationDetails(draft[0].id, false, tx);
            if (!details) {
                return errorResponse("Draft not found");
            }
            return details;
        });
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        return errorResponse("Failed to create draft: " + message);
    }
};
export const uploadImageToDraft = async (draftId, file, type, userId) => {
    let draft;
    let currentPlace;
    const params = getParams(file, type, draftId);
    const data = await r2.upload(params).promise();
    const imageUrl = data.Location;
    if (!(type === "coupleImage" || type === "placeImage"))
        return errorResponse("Invalid type");
    if (type === "placeImage") {
        draft = await getDraft(draftId, userId);
        if ("error" in draft) {
            return draft;
        }
        currentPlace = draft.place;
    }
    const safePlace = currentPlace ?? { address: null, placeImage: null, link: null };
    const updateResult = await updateDraft(draftId, type === "coupleImage" ? { coupleImage: imageUrl } : { place: { ...safePlace, placeImage: imageUrl } }, userId);
    if ("error" in updateResult) {
        await r2.deleteObject(params).promise();
        return errorResponse("Failed to upload image");
    }
    else {
        await cleanupOldImages(draftId, type, params.Key);
        return updateResult;
    }
};
export const resetDraftImage = async (draftId, type, userId) => {
    if (!(type === "coupleImage" || type === "placeImage"))
        return errorResponse("Invalid type");
    const updateResult = await updateDraft(draftId, type === "coupleImage" ? { coupleImage: null } : { place: { address: null, placeImage: null, link: null } }, userId);
    if ("error" in updateResult) {
        return errorResponse("Failed to upload image");
    }
    else {
        await cleanupAllImages(draftId, type);
        return updateResult;
    }
};
export const updateDraft = async (draftId, data, userId) => {
    try {
        return await prisma.$transaction(async (tx) => {
            const draft = await getDraftQuery(draftId, userId, tx);
            if (draft.length === 0) {
                return errorResponse("Draft not found");
            }
            const { firstPartnerName: firstPartnerName, secondPartnerName: secondPartnerName, coupleImage: coupleImage, eventDate: eventDate, templateName: templateName, colors: colors, place: place, planItems: planItems, wishes: wishes, questions: questions, answers: answers } = data;
            const updateData = {};
            if (firstPartnerName) {
                updateData.partner1Name = firstPartnerName;
            }
            if (secondPartnerName) {
                updateData.partner2Name = secondPartnerName;
            }
            if (coupleImage !== undefined) {
                updateData.coupleImage = coupleImage;
            }
            if (eventDate) {
                updateData.eventDate = new Date(eventDate);
            }
            if (templateName) {
                const template = await getTemplateIdQuery(templateName, tx);
                if (template.length === 0) {
                    return errorResponse("Template not found");
                }
                updateData.templateId = template[0].id;
            }
            if (Object.keys(updateData).length > 0) {
                await tx.invitation.update({
                    where: { id: Number(draftId) },
                    data: updateData
                });
            }
            if (place) {
                const placeRecord = await getInvitationPlaceIdQuery(draftId, tx);
                if (placeRecord.length && placeRecord[0].placeId) {
                    await updatePlaceQuery(place.address, place.placeImage, place.link, placeRecord[0].placeId, tx);
                }
                else {
                    const newPlace = await createPlaceQuery(place.address, place.placeImage, place.link, tx);
                    await updateInvitationPlaceIdQuery(newPlace[0].id, draftId, tx);
                }
            }
            if (colors) {
                await deleteInvitationColorsQuery(draftId, tx);
                for (const { colorCode, position } of colors) {
                    const existingColor = await getColorIdQuery(colorCode, tx);
                    const colorId = existingColor.length ? existingColor[0].id : (await createColorQuery(colorCode, tx))[0].id;
                    await createInvitationColorQuery(draftId, colorId, position, tx);
                }
            }
            if (planItems) {
                await deletePlanItemsQuery(draftId, tx);
                for (const item of planItems) {
                    await createPlanItemQuery(item.eventTime, item.description, item.position, draftId, tx);
                }
            }
            if (wishes) {
                await deleteWishesQuery(draftId, tx);
                for (const wish of wishes) {
                    await createWishQuery(wish.wish, wish.position, draftId, tx);
                }
            }
            const insertedQuestions = [];
            if (questions) {
                await deleteFormQuestionsQuery(draftId, tx);
                for (const question of questions) {
                    const newQuestion = await createFormQuestionQuery(question.question, question.type, question.position, draftId, tx);
                    insertedQuestions.push(newQuestion[0]);
                }
            }
            const questionsList = questions ?? [];
            if (answers) {
                await deleteFormAnswersQuery(draftId, tx);
                for (const answer of answers) {
                    const question = await getFormQuestionByPositionQuery(draftId, answer.questionPosition, tx);
                    if (questionsList.filter((q) => q.position === answer.questionPosition).length === 0 && question.length === 0) {
                        return errorResponse("Question for some of the answers not found");
                    }
                    question.push(...insertedQuestions);
                    await createFormAnswerQuery(answer.answer, question[0].id, answer.position, draftId, tx);
                }
            }
            const details = await getInvitationDetails(draftId, false, tx);
            if (!details) {
                return errorResponse("Draft not found");
            }
            return details;
        });
    }
    catch (error) {
        logger.error({ err: error }, "Failed to update draft");
        return errorResponse("Failed to update draft");
    }
};
export const publishDraft = async (invitationId, userId) => {
    try {
        return await prisma.$transaction(async (tx) => {
            const existingDraft = await getDraftQuery(invitationId, userId, tx);
            if (existingDraft.length === 0)
                return errorResponse("Draft not found");
            await publishInvitationQuery(invitationId, userId, tx);
            const details = await getInvitationDetails(invitationId, true, tx);
            if (!details) {
                return errorResponse("Invitation not found");
            }
            return details;
        });
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        return errorResponse("Failed to publish invitation: " + message);
    }
};
export const getDraft = async (draftId, userId) => {
    try {
        const draftInfo = await getInvitationDetails(draftId, false);
        if (!draftInfo || draftInfo.authorId !== userId)
            return errorResponse("Draft not found");
        return draftInfo;
    }
    catch (error) {
        logger.error({ err: error }, "Failed to retrieve draft");
        return errorResponse("Failed to retrieve draft");
    }
};
export const getAllDrafts = async (userId) => {
    try {
        const drafts = await getAllInvitationsQuery(userId, false);
        const details = await Promise.all(drafts.map(draft => getInvitationDetails(draft.id, false)));
        return details.filter((draft) => draft !== null);
    }
    catch (error) {
        logger.error({ err: error }, "Failed to retrieve drafts");
        return errorResponse("Failed to retrieve drafts");
    }
};
export const deleteDraft = async (draftId, userId) => {
    try {
        const draft = await getDraftQuery(draftId, userId);
        if (draft.length === 0)
            return errorResponse("Draft not found");
        await deleteInvitation(draftId, userId);
        return { message: "Draft deleted successfully" };
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        logger.error({ err: error }, "Failed to delete draft");
        return errorResponse("Failed to delete draft: " + message);
    }
};
