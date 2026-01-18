import * as PublishedInvitationService from "../service/PublishedInvitationService.js";
import { errorResponse } from "../utils/errorUtils.js";
import { SERVER_ERROR } from "../messages/messages.js";
export const getInvitation = async (req, res) => {
    const { id: invitationId } = req.params;
    const invitationInfo = await PublishedInvitationService.getInvitation(invitationId);
    if ("error" in invitationInfo) {
        const statusCode = invitationInfo.error === 'Invitation not found'
            ? 404
            : 500;
        return res.status(statusCode).json(errorResponse(invitationInfo.status === 500 ? SERVER_ERROR : invitationInfo.error));
    }
    return res.status(200).json(invitationInfo);
};
export const getAllInvitations = async (req, res) => {
    if (!req.user) {
        return res.status(403).json(errorResponse("Forbidden"));
    }
    const allInvitationsInfo = await PublishedInvitationService.getAllInvitations(req.user.id);
    if ("error" in allInvitationsInfo) {
        return res.status(500).json(errorResponse(allInvitationsInfo.status === 500 ? SERVER_ERROR : allInvitationsInfo.error));
    }
    return res.status(200).json(allInvitationsInfo);
};
export const submitGuestAnswers = async (req, res) => {
    const { id: invitationId } = req.params;
    const { answers, guestName, isComing } = req.body;
    const guestId = req.session.id;
    const guestAnswer = await PublishedInvitationService.submitGuestAnswers(invitationId, answers, guestName, isComing, String(guestId));
    if ("error" in guestAnswer) {
        const statusCode = guestAnswer.error === 'Invitation not found' || guestAnswer.error === 'Question not found' || guestAnswer.error === 'No questions found for invitation'
            ? 404 : guestAnswer.error === 'Not all questions are answered'
            ? 422
            : 500;
        return res.status(statusCode).json(errorResponse(guestAnswer.status === 500 ? SERVER_ERROR : guestAnswer.error));
    }
    return res.status(201).json(guestAnswer);
};
export const getAllGuestAnswers = async (req, res) => {
    if (!req.user) {
        return res.status(403).json(errorResponse("Forbidden"));
    }
    const allGuestAnswers = await PublishedInvitationService.getAllGuestAnswers(req.user.id);
    if ("error" in allGuestAnswers) {
        const statusCode = allGuestAnswers.error === 'No guest answers found'
            ? 404
            : 500;
        return res.status(statusCode).json(errorResponse(allGuestAnswers.status === 500 ? SERVER_ERROR : allGuestAnswers.error));
    }
    return res.status(200).json(allGuestAnswers);
};
