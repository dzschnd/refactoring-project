import prisma from "../config/prisma.js";
export const getInvitationDetailsQuery = async (invitationId, isPublished, client = prisma) => {
    const id = Number(invitationId);
    const invitation = await client.invitation.findFirst({
        where: { id: id, isPublished: isPublished },
        include: {
            template: true,
            place: true,
            invitationColors: { include: { color: true }, orderBy: { position: "asc" } },
            planItems: { orderBy: { position: "asc" } },
            wishes: { orderBy: { position: "asc" } },
            questions: { orderBy: { position: "asc" } },
            answers: { orderBy: { position: "asc" } },
        },
    });
    if (!invitation) {
        return [];
    }
    const answers = invitation.answers.map((answer) => {
        const question = invitation.questions.find((q) => q.id === answer.questionId);
        return {
            answer: answer.answer,
            position: answer.position,
            question_position: question ? question.position : null,
        };
    });
    return [
        {
            id: invitation.id,
            partner_1_name: invitation.partner1Name,
            partner_2_name: invitation.partner2Name,
            couple_image: invitation.coupleImage,
            author_id: invitation.authorId,
            template_id: invitation.templateId,
            event_date: invitation.eventDate ? invitation.eventDate.toISOString().split("T")[0] : null,
            is_published: invitation.isPublished,
            template_name: invitation.template.name,
            place: invitation.place
                ? {
                    address: invitation.place.address,
                    place_image: invitation.place.placeImage,
                    link: invitation.place.link,
                }
                : null,
            colors: invitation.invitationColors.map((ic) => ({
                color_code: ic.color.colorCode,
                position: ic.position,
            })),
            plan_items: invitation.planItems.map((item) => ({
                event_time: item.eventTime,
                description: item.description,
                position: item.position,
            })),
            wishes: invitation.wishes.map((wish) => ({
                wish: wish.wish,
                position: wish.position,
            })),
            questions: invitation.questions.map((question) => ({
                id: question.id,
                question: question.question,
                position: question.position,
                type: question.type,
            })),
            answers: answers,
        },
    ];
};
export const getInvitationQuery = async (invitationId, client = prisma) => {
    return client.invitation.findMany({
        where: { id: Number(invitationId), isPublished: true },
    });
};
export const getDraftQuery = async (invitationId, authorId, client = prisma) => {
    return client.invitation.findMany({
        where: { id: Number(invitationId), authorId: Number(authorId), isPublished: false },
    });
};
export const getAllInvitationsQuery = async (authorId, isPublished, client = prisma) => {
    return client.invitation.findMany({
        where: { authorId: Number(authorId), isPublished: isPublished },
        orderBy: { createdAt: "desc" },
    });
};
export const getTemplateIdQuery = async (templateName, client = prisma) => {
    return client.template.findMany({
        where: { name: templateName },
        select: { id: true },
    });
};
export const getInvitationPlaceIdQuery = async (invitationId, client = prisma) => {
    return client.invitation.findMany({
        where: { id: Number(invitationId) },
        select: { placeId: true },
    });
};
export const getColorIdQuery = async (colorCode, client = prisma) => {
    return client.color.findMany({
        where: { colorCode: colorCode },
        select: { id: true },
    });
};
export const getFormQuestionByPositionQuery = async (invitationId, position, client = prisma) => {
    return client.formQuestion.findMany({
        where: { invitationId: Number(invitationId), position: Number(position) },
        select: { id: true },
    });
};
export const getAllFormQuestionsQuery = async (invitationId, client = prisma) => {
    return client.formQuestion.findMany({
        where: { invitationId: Number(invitationId) },
    });
};
export const getAllFormAnswersQuery = async (invitationId, client = prisma) => {
    return client.formAnswer.findMany({
        where: { invitationId: Number(invitationId) },
    });
};
export const getAllGuestAnswersQuery = async (authorId, client = prisma) => {
    return client.guestAnswer.findMany({
        where: { invitation: { authorId: Number(authorId) } },
    });
};
export const createDraftQuery = async (authorId, templateId, client = prisma) => {
    const created = await client.invitation.create({
        data: { authorId: Number(authorId), templateId: Number(templateId) },
    });
    return [created];
};
export const createPlaceQuery = async (address, placeImage, link, client = prisma) => {
    const created = await client.place.create({
        data: { address: address, placeImage: placeImage, link: link },
    });
    return [created];
};
export const createInvitationColorQuery = async (invitationId, colorId, position, client = prisma) => {
    const created = await client.invitationColor.create({
        data: {
            invitationId: Number(invitationId),
            colorId: Number(colorId),
            position: Number(position),
        },
    });
    return [created];
};
export const createColorQuery = async (colorCode, client = prisma) => {
    const created = await client.color.create({
        data: { colorCode: colorCode },
    });
    return [created];
};
export const createPlanItemQuery = async (eventTime, description, position, invitationId, client = prisma) => {
    const created = await client.planItem.create({
        data: {
            eventTime: eventTime,
            description: description,
            position: Number(position),
            invitationId: Number(invitationId),
        },
    });
    return [created];
};
export const createWishQuery = async (wish, position, invitationId, client = prisma) => {
    const created = await client.wish.create({
        data: { wish: wish, position: Number(position), invitationId: Number(invitationId) },
    });
    return [created];
};
export const createFormQuestionQuery = async (question, type, position, invitationId, client = prisma) => {
    const created = await client.formQuestion.create({
        data: {
            question: question,
            type: type,
            position: Number(position),
            invitationId: Number(invitationId),
        },
    });
    return [created];
};
export const createFormAnswerQuery = async (answer, questionId, position, invitationId, client = prisma) => {
    const created = await client.formAnswer.create({
        data: {
            answer: answer,
            questionId: Number(questionId),
            position: Number(position),
            invitationId: Number(invitationId),
        },
    });
    return [created];
};
export const createGuestAnswerQuery = async (invitationId, questionId, guestName, isComing, answer, guestId, client = prisma) => {
    const created = await client.guestAnswer.create({
        data: {
            invitationId: Number(invitationId),
            questionId: Number(questionId),
            guestName: guestName,
            isComing: isComing,
            answer: answer,
            guestId: String(guestId),
        },
    });
    return [created];
};
export const publishInvitationQuery = async (invitationId, authorId, client = prisma) => {
    await client.invitation.updateMany({
        where: { id: Number(invitationId), authorId: Number(authorId), isPublished: false },
        data: { isPublished: true },
    });
    return [];
};
export const updatePlaceQuery = async (address, placeImage, link, placeId, client = prisma) => {
    await client.place.update({
        where: { id: Number(placeId) },
        data: { address: address, placeImage: placeImage, link: link },
    });
    return [];
};
export const updateInvitationPlaceIdQuery = async (placeId, invitationId, client = prisma) => {
    await client.invitation.update({
        where: { id: Number(invitationId) },
        data: { placeId: Number(placeId) },
    });
    return [];
};
export const deleteInvitation = async (invitationId, authorId, client = prisma) => {
    const result = await client.invitation.deleteMany({
        where: { id: Number(invitationId), authorId: Number(authorId), isPublished: false },
    });
    return result.count;
};
export const deleteInvitationColorsQuery = async (invitationId, client = prisma) => {
    const result = await client.invitationColor.deleteMany({
        where: { invitationId: Number(invitationId) },
    });
    return result.count;
};
export const deletePlanItemsQuery = async (invitationId, client = prisma) => {
    const result = await client.planItem.deleteMany({
        where: { invitationId: Number(invitationId) },
    });
    return result.count;
};
export const deleteWishesQuery = async (invitationId, client = prisma) => {
    const result = await client.wish.deleteMany({
        where: { invitationId: Number(invitationId) },
    });
    return result.count;
};
export const deleteFormQuestionsQuery = async (invitationId, client = prisma) => {
    const result = await client.formQuestion.deleteMany({
        where: { invitationId: Number(invitationId) },
    });
    return result.count;
};
export const deleteFormAnswersQuery = async (invitationId, client = prisma) => {
    const result = await client.formAnswer.deleteMany({
        where: { invitationId: Number(invitationId) },
    });
    return result.count;
};
export const deleteGuestAnswersQuery = async (invitationId, guestId, client = prisma) => {
    const result = await client.guestAnswer.deleteMany({
        where: { invitationId: Number(invitationId), guestId: String(guestId) },
    });
    return result.count;
};
export const deleteGuestAnswersByInvitationQuery = async (invitationId, client = prisma) => {
    const result = await client.guestAnswer.deleteMany({
        where: { invitationId: Number(invitationId) },
    });
    return result.count;
};
