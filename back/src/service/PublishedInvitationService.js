import {
    getAllInvitationsQuery,
    getInvitationQuery,
    getFormQuestionByPositionQuery,
    createGuestAnswerQuery,
    getAllGuestAnswersQuery, deleteGuestAnswersQuery, getAllFormQuestionsQuery
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

export const getInvitation = async (invitationId) => {
    let client;
    try {
        client = await connectClient();
        const invitationInfo = await getInvitationDetails(invitationId, true, client);
        if (!invitationInfo)
            return errorResponse('Invitation not found');
        return invitationInfo;
    } catch (error) {
        console.log(error);
        return errorResponse('Failed to retrieve invitation');
    } finally {
        if (client) releaseClient(client);
    }
};

export const getAllInvitations = async (userId) => {
    let client;
    try {
        client = await connectClient();
        const existingInvitations = await getAllInvitationsQuery(userId, true, client);
        return await Promise.all(existingInvitations.map(invitation => getInvitationDetails(invitation.id, true, client)));
    } catch (error) {
        return errorResponse('Failed to retrieve invitations');
    } finally {
        if (client) releaseClient(client);
    }
};

export const submitGuestAnswers = async (invitationId, answers, guestName, isComing, guestId) => {
    let client;
    try {
        client = await connectClient();
        await beginTransaction(client);

        const existingInvitation = await getInvitationQuery(invitationId, client);

        if (existingInvitation.length === 0) {
            return errorResponse('Invitation not found');
        }

        const existingQuestions = await getAllFormQuestionsQuery(invitationId, client);
        if (existingQuestions.length === 0) {
            return errorResponse('No questions found for invitation');
        }

        const answeredQuestionsPositions = new Set(answers.sort((a, b) => a.questionPosition - b.questionPosition).map((answer) => answer.questionPosition));
        const existingQuestionsPositions = new Set(existingQuestions.sort((a, b) => a.position - b.position).map((question) => question.position));
        console.log(answeredQuestionsPositions.size)
        console.log(existingQuestionsPositions.size)
        if (existingQuestionsPositions.size !== answeredQuestionsPositions.size)
            return errorResponse('Not all questions are answered');

        await deleteGuestAnswersQuery(invitationId, guestId, client);
        for (const answer of answers) {
            const answeredQuestion = existingQuestions.filter(question => question.position === answer.questionPosition);
            if (answeredQuestion.length === 0) {
                return errorResponse('Question not found');
            }

            await createGuestAnswerQuery(invitationId, answeredQuestion[0].id, guestName, isComing, answer.answer, guestId, client);
        }

        await commitTransaction(client)
        return {message: 'Answers submitted successfully'};
    } catch (error) {
        console.error(error);
        if (client) await rollbackTransaction(client);
        return errorResponse('Failed to create guest answer');
    } finally {
        if (client) releaseClient(client);
    }
};

export const getAllGuestAnswers = async (authorId) => {
    let client;
    try {
        client = await connectClient();
        const existingGuestAnswers = await getAllGuestAnswersQuery(authorId, client);
        if (existingGuestAnswers.length === 0) return errorResponse('No guest answers found');
        return existingGuestAnswers;
    } catch (error) {
        console.error(error);
        return errorResponse('Failed to retrieve guest answers');
    } finally {
        if (client) releaseClient(client);
    }
};
