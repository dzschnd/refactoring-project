import * as PublishedInvitationService from "../service/PublishedInvitationService.js";
import { SERVER_ERROR } from "../messages/messages.js";
import { isServiceError } from "../types/service.js";
import { ForbiddenError, InternalServerError, NotFoundError, UnprocessableEntityError, } from "../errors/index.js";
export const getInvitation = async (req, res) => {
    const { id: invitationId } = req.params;
    const invitationInfo = await PublishedInvitationService.getInvitation(invitationId);
    if (isServiceError(invitationInfo)) {
        if (invitationInfo.error === 'Invitation not found') {
            throw new NotFoundError("Invitation not found");
        }
        throw new InternalServerError(SERVER_ERROR);
    }
    return res.status(200).json(invitationInfo);
};
export const getAllInvitations = async (req, res) => {
    if (!req.user) {
        throw new ForbiddenError("Forbidden");
    }
    const allInvitationsInfo = await PublishedInvitationService.getAllInvitations(req.user.id);
    if (isServiceError(allInvitationsInfo)) {
        throw new InternalServerError(SERVER_ERROR);
    }
    return res.status(200).json(allInvitationsInfo);
};
export const submitGuestAnswers = async (req, res) => {
    const { id: invitationId } = req.params;
    const { answers, guestName, isComing } = req.body;
    const guestId = req.session.id;
    const guestAnswer = await PublishedInvitationService.submitGuestAnswers(invitationId, answers, guestName, isComing, String(guestId));
    if (isServiceError(guestAnswer)) {
        if (guestAnswer.error === 'Invitation not found') {
            throw new NotFoundError("Invitation not found");
        }
        if (guestAnswer.error === 'Question not found') {
            throw new NotFoundError("Question not found");
        }
        if (guestAnswer.error === 'No questions found for invitation') {
            throw new NotFoundError("No questions found for invitation");
        }
        if (guestAnswer.error === 'Not all questions are answered') {
            throw new UnprocessableEntityError("Not all questions are answered");
        }
        throw new InternalServerError(SERVER_ERROR);
    }
    return res.status(201).json(guestAnswer);
};
export const getAllGuestAnswers = async (req, res) => {
    if (!req.user) {
        throw new ForbiddenError("Forbidden");
    }
    const allGuestAnswers = await PublishedInvitationService.getAllGuestAnswers(req.user.id);
    if (isServiceError(allGuestAnswers)) {
        if (allGuestAnswers.error === 'No guest answers found') {
            throw new NotFoundError("No guest answers found");
        }
        throw new InternalServerError(SERVER_ERROR);
    }
    return res.status(200).json(allGuestAnswers);
};
