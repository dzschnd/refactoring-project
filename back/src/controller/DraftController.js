import * as DraftService from '../service/DraftService.js';
import {errorResponse} from "../utils/errorUtils.js";

export const createDraft = async (req, res) => {
    const draftInfo = await DraftService.createDraft(req.user.id, req.body.templateName);
    if (draftInfo.error) {
        const errorStatus = draftInfo.error === 'Template not found'
            ? 404
            : 500
        return res.status(errorStatus).json(errorResponse(draftInfo.status === 500 ? SERVER_ERROR : draftInfo.error));
    }
    res.status(200).json(draftInfo);
};

export const updateDraft = async (req, res) => {
    const draftInfo = await DraftService.updateDraft(req.params.id, req.body, req.user.id);
    if (draftInfo.error) {
        const errorStatus = draftInfo.error === 'Draft not found' || draftInfo.error === 'Template not found' || draftInfo.error === 'Question for some of the answers not found'
            ? 404
            : 500;
        return res.status(errorStatus).json(errorResponse(draftInfo.status === 500 ? SERVER_ERROR : draftInfo.error));
    }
    res.status(200).json(draftInfo);
};

export const publishDraft = async (req, res) => {
    const { id: invitationId } = req.params;

    const invitationInfo = await DraftService.publishDraft(invitationId, req.user.id);
    if (invitationInfo.error) {
        const statusCode = invitationInfo.error === 'Draft not found'
            ? 404
            : 500;
        return res.status(statusCode).json(errorResponse(invitationInfo.status === 500 ? SERVER_ERROR : invitationInfo.error));
    }
    res.status(200).json(invitationInfo);
};

export const validateDraft = async (req, res) => {
    res.status(200).json({message: 'Draft is valid'});
};

export const getDraft = async (req, res) => {
    const draftInfo = await DraftService.getDraft(req.params.id, req.user.id);
    if (draftInfo.error) {
        const errorStatus = draftInfo.error === 'Draft not found'
            ? 404
            : 500;
        return res.status(errorStatus).json(errorResponse(draftInfo.status === 500 ? SERVER_ERROR : draftInfo.error));
    }
    res.status(200).json(draftInfo);
};

export const getAllDrafts = async (req, res) => {
    const allDraftsInfo = await DraftService.getAllDrafts(req.user.id);
    if (allDraftsInfo.error) {
        return res.status(500).json(errorResponse(allDraftsInfo.status === 500 ? SERVER_ERROR : allDraftsInfo.error));
    }
    res.status(200).json(allDraftsInfo);
};

export const deleteDraft = async (req, res) => {
    const deleteResponse = await DraftService.deleteDraft(req.params.id, req.user.id);
    if (deleteResponse.error) {
        return res.status(404).json(errorResponse(deleteResponse.status === 500 ? SERVER_ERROR : deleteResponse.error));
    }
    res.status(200).json(deleteResponse);
};
