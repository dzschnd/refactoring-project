import type { Request, Response } from "express";
import {resetDraftImage, uploadImageToDraft} from "../service/DraftService.js";
import {errorResponse} from "../utils/errorUtils.js";
import { SERVER_ERROR } from "../messages/messages.js";
import { isServiceError } from "../types/service.js";

export const uploadImage = async (req: Request, res: Response): Promise<Response> => {
    const { file } = req;
    const { type } = req.body as { type: string };

    if (!file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    if (!req.user) {
        return res.status(403).json(errorResponse("Forbidden"));
    }

    const result = await uploadImageToDraft(req.params.id, file, type, req.user.id);

    if (isServiceError(result)) {
        const errorStatus = 500;
        return res.status(errorStatus).json(errorResponse(result.status === 500 ? SERVER_ERROR : result.error));
    }

    return res.status(200).json(result);
};

export const resetImage = async (req: Request, res: Response): Promise<Response> => {
    const { type } = req.body as { type: string };

    if (!req.user) {
        return res.status(403).json(errorResponse("Forbidden"));
    }

    const result = await resetDraftImage(req.params.id, type, req.user.id);

    if (isServiceError(result)) {
        const errorStatus = 500;
        return res.status(errorStatus).json(errorResponse(result.status === 500 ? SERVER_ERROR : result.error));
    }

    return res.status(200).json(result);
};
