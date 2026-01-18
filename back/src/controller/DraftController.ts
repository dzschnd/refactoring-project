import type { Request, Response } from "express";
import * as DraftService from "../service/DraftService.js";
import {errorResponse} from "../utils/errorUtils.js";
import { SERVER_ERROR } from "../messages/messages.js";
import { isServiceError } from "../types/service.js";

export const createDraft = async (req: Request, res: Response): Promise<Response> => {
    if (!req.user) {
        return res.status(403).json(errorResponse("Forbidden"));
    }
    const draftInfo = await DraftService.createDraft(req.user.id, req.body.templateName);
    if (isServiceError(draftInfo)) {
        const errorStatus = draftInfo.error === 'Template not found'
            ? 404
            : 500
        return res.status(errorStatus).json(errorResponse(draftInfo.status === 500 ? SERVER_ERROR : draftInfo.error));
    }
    return res.status(200).json(draftInfo);
};

export const updateDraft = async (req: Request, res: Response): Promise<Response> => {
    if (!req.user) {
        return res.status(403).json(errorResponse("Forbidden"));
    }
    const draftInfo = await DraftService.updateDraft(req.params.id, req.body, req.user.id);
    if (isServiceError(draftInfo)) {
        const errorStatus = draftInfo.error === 'Draft not found' || draftInfo.error === 'Template not found' || draftInfo.error === 'Question for some of the answers not found'
            ? 404
            : 500;
        return res.status(errorStatus).json(errorResponse(draftInfo.status === 500 ? SERVER_ERROR : draftInfo.error));
    }
    return res.status(200).json(draftInfo);
};

export const publishDraft = async (req: Request, res: Response): Promise<Response> => {
    if (!req.user) {
        return res.status(403).json(errorResponse("Forbidden"));
    }
    const { id: invitationId } = req.params;

    const invitationInfo = await DraftService.publishDraft(invitationId, req.user.id);
    if (isServiceError(invitationInfo)) {
        const statusCode = invitationInfo.error === 'Draft not found'
            ? 404
            : 500;
        return res.status(statusCode).json(errorResponse(invitationInfo.status === 500 ? SERVER_ERROR : invitationInfo.error));
    }
    return res.status(200).json(invitationInfo);
};

export const validateDraft = async (_req: Request, res: Response): Promise<Response> => {
    return res.status(200).json({message: 'Draft is valid'});
};

export const getDraft = async (req: Request, res: Response): Promise<Response> => {
    if (!req.user) {
        return res.status(403).json(errorResponse("Forbidden"));
    }
    const draftInfo = await DraftService.getDraft(req.params.id, req.user.id);
    if (isServiceError(draftInfo)) {
        const errorStatus = draftInfo.error === 'Draft not found'
            ? 404
            : 500;
        return res.status(errorStatus).json(errorResponse(draftInfo.status === 500 ? SERVER_ERROR : draftInfo.error));
    }
    return res.status(200).json(draftInfo);
};

export const getAllDrafts = async (req: Request, res: Response): Promise<Response> => {
    if (!req.user) {
        return res.status(403).json(errorResponse("Forbidden"));
    }
    const allDraftsInfo = await DraftService.getAllDrafts(req.user.id);
    if (isServiceError(allDraftsInfo)) {
        return res.status(500).json(errorResponse(allDraftsInfo.status === 500 ? SERVER_ERROR : allDraftsInfo.error));
    }
    return res.status(200).json(allDraftsInfo);
};

export const deleteDraft = async (req: Request, res: Response): Promise<Response> => {
    if (!req.user) {
        return res.status(403).json(errorResponse("Forbidden"));
    }
    const deleteResponse = await DraftService.deleteDraft(req.params.id, req.user.id);
    if (isServiceError(deleteResponse)) {
        return res.status(404).json(errorResponse(deleteResponse.status === 500 ? SERVER_ERROR : deleteResponse.error));
    }
    return res.status(200).json(deleteResponse);
};
