import {getInvitationDetailsQuery} from "../queries/InvitationQueries.js";

export const getInvitationDetails = async (invitationId, isPublished, client) => {
    const result = await getInvitationDetailsQuery(invitationId, isPublished, client);
    if (result.length === 0) {
        return null;
    }

    const invitationData = result[0];

    const formattedPlace = invitationData.place ? {
            address: invitationData.place.address,
            link: invitationData.place.link,
            placeImage: invitationData.place.place_image
        } : null;

    const formattedPlanItems = invitationData.plan_items ? invitationData.plan_items.map(item => {
        const [hours, minutes] = item.event_time.split(':');
        return {
            position: item.position,
            description: item.description,
            eventTime: `${hours}:${minutes}`
        };
    }) : null;

    const formattedColors = invitationData.colors ? invitationData.colors.map(color => {
        return {
            position: color.position,
            colorCode: color.color_code
        };
    }) : null;

    const formattedAnswers = invitationData.answers ? invitationData.answers.map(answer => {
        return {
            position: answer.position,
            answer: answer.answer,
            questionPosition: answer.question_position
        };
    }) : null;

    return {
        id: invitationData.id,
        firstPartnerName: invitationData.partner_1_name,
        secondPartnerName: invitationData.partner_2_name,
        coupleImage: invitationData.couple_image,
        authorId: invitationData.author_id,
        templateName: invitationData.template_name,
        eventDate: invitationData.event_date,
        isPublished: invitationData.is_published,
        colors: invitationData.colors.length === 0 ? null : formattedColors,
        place: formattedPlace,
        planItems: invitationData.plan_items.length === 0 ? null : formattedPlanItems,
        wishes: invitationData.wishes.length === 0 ? null : invitationData.wishes,
        questions: invitationData.questions.length === 0 ? null : invitationData.questions,
        answers: invitationData.answers.length === 0 ? null : formattedAnswers,
    };
};
