import * as DraftService from "../service/DraftService.js";
import { SERVER_ERROR } from "../messages/messages.js";
import { isServiceError } from "../types/service.js";
import { BadRequestError, ForbiddenError, InternalServerError, NotFoundError, } from "../errors/index.js";
export const createDraft = async (req, res) => {
    if (!req.user) {
        throw new ForbiddenError("Forbidden");
    }
    const draftInfo = await DraftService.createDraft(req.user.id, req.body.templateName);
    if (isServiceError(draftInfo)) {
        if (draftInfo.error === 'Template not found') {
            throw new NotFoundError("Template not found");
        }
        throw new InternalServerError(SERVER_ERROR);
    }
    return res.status(200).json(draftInfo);
};
export const updateDraft = async (req, res) => {
    if (!req.user) {
        throw new ForbiddenError("Forbidden");
    }
    const draftInfo = await DraftService.updateDraft(req.params.id, req.body, req.user.id);
    if (isServiceError(draftInfo)) {
        if (draftInfo.error === 'Draft not found') {
            throw new NotFoundError("Draft not found");
        }
        if (draftInfo.error === 'Template not found') {
            throw new NotFoundError("Template not found");
        }
        if (draftInfo.error === 'Question for some of the answers not found') {
            throw new BadRequestError("Question for some of the answers not found");
        }
        throw new InternalServerError(SERVER_ERROR);
    }
    return res.status(200).json(draftInfo);
};
export const publishDraft = async (req, res) => {
    if (!req.user) {
        throw new ForbiddenError("Forbidden");
    }
    const { id: invitationId } = req.params;
    const invitationInfo = await DraftService.publishDraft(invitationId, req.user.id);
    if (isServiceError(invitationInfo)) {
        if (invitationInfo.error === 'Draft not found') {
            throw new NotFoundError("Draft not found");
        }
        throw new InternalServerError(SERVER_ERROR);
    }
    return res.status(200).json(invitationInfo);
};
export const validateDraft = async (_req, res) => {
    return res.status(200).json({ message: 'Draft is valid' });
};
export const getDraft = async (req, res) => {
    if (!req.user) {
        throw new ForbiddenError("Forbidden");
    }
    const draftInfo = await DraftService.getDraft(req.params.id, req.user.id);
    if (isServiceError(draftInfo)) {
        if (draftInfo.error === 'Draft not found') {
            throw new NotFoundError("Draft not found");
        }
        throw new InternalServerError(SERVER_ERROR);
    }
    return res.status(200).json(draftInfo);
};
export const getAllDrafts = async (req, res) => {
    if (!req.user) {
        throw new ForbiddenError("Forbidden");
    }
    const allDraftsInfo = await DraftService.getAllDrafts(req.user.id);
    if (isServiceError(allDraftsInfo)) {
        throw new InternalServerError(SERVER_ERROR);
    }
    return res.status(200).json(allDraftsInfo);
};
export const deleteDraft = async (req, res) => {
    if (!req.user) {
        throw new ForbiddenError("Forbidden");
    }
    const deleteResponse = await DraftService.deleteDraft(req.params.id, req.user.id);
    if (isServiceError(deleteResponse)) {
        if (deleteResponse.error === 'Draft not found') {
            throw new NotFoundError("Draft not found");
        }
        throw new InternalServerError(SERVER_ERROR);
    }
    return res.status(200).json(deleteResponse);
};
