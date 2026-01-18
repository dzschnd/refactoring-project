import prisma from "../config/prisma.js";
import { getAllInvitationsQuery, getInvitationQuery, createGuestAnswerQuery, getAllGuestAnswersQuery, deleteGuestAnswersQuery, getAllFormQuestionsQuery } from "../queries/InvitationQueries.js";
import { getInvitationDetails } from "../utils/InvitationUtils.js";
import { errorResponse } from "../utils/errorUtils.js";
import logger from "../logger.js";
export const getInvitation = async (invitationId) => {
    try {
        const invitationInfo = await getInvitationDetails(invitationId, true);
        if (!invitationInfo)
            return errorResponse("Invitation not found");
        return invitationInfo;
    }
    catch (error) {
        logger.error({ err: error }, "Failed to retrieve invitation");
        return errorResponse("Failed to retrieve invitation");
    }
};
export const getAllInvitations = async (userId) => {
    try {
        const existingInvitations = await getAllInvitationsQuery(userId, true);
        const details = await Promise.all(existingInvitations.map(invitation => getInvitationDetails(invitation.id, true)));
        return details.filter((invitation) => invitation !== null);
    }
    catch (error) {
        return errorResponse("Failed to retrieve invitations");
    }
};
export const submitGuestAnswers = async (invitationId, answers, guestName, isComing, guestId) => {
    try {
        return await prisma.$transaction(async (tx) => {
            const existingInvitation = await getInvitationQuery(invitationId, tx);
            if (existingInvitation.length === 0) {
                return errorResponse("Invitation not found");
            }
            const existingQuestions = await getAllFormQuestionsQuery(invitationId, tx);
            if (existingQuestions.length === 0) {
                return errorResponse("No questions found for invitation");
            }
            const answeredQuestionsPositions = new Set(answers.sort((a, b) => a.questionPosition - b.questionPosition).map((answer) => answer.questionPosition));
            const existingQuestionsPositions = new Set(existingQuestions.sort((a, b) => a.position - b.position).map((question) => question.position));
            if (existingQuestionsPositions.size !== answeredQuestionsPositions.size)
                return errorResponse("Not all questions are answered");
            await deleteGuestAnswersQuery(invitationId, guestId, tx);
            for (const answer of answers) {
                const answeredQuestion = existingQuestions.filter(question => question.position === answer.questionPosition);
                if (answeredQuestion.length === 0) {
                    return errorResponse("Question not found");
                }
                await createGuestAnswerQuery(invitationId, answeredQuestion[0].id, guestName, isComing, answer.answer, guestId, tx);
            }
            return { message: "Answers submitted successfully" };
        });
    }
    catch (error) {
        logger.error({ err: error }, "Failed to create guest answer");
        return errorResponse("Failed to create guest answer");
    }
};
export const getAllGuestAnswers = async (authorId) => {
    try {
        const existingGuestAnswers = await getAllGuestAnswersQuery(authorId);
        if (existingGuestAnswers.length === 0)
            return errorResponse("No guest answers found");
        return existingGuestAnswers;
    }
    catch (error) {
        logger.error({ err: error }, "Failed to retrieve guest answers");
        return errorResponse("Failed to retrieve guest answers");
    }
};
