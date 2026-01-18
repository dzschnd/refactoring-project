import { resetDraftImage, uploadImageToDraft } from "../service/DraftService.js";
import { SERVER_ERROR } from "../messages/messages.js";
import { isServiceError } from "../types/service.js";
import { BadRequestError, ForbiddenError, InternalServerError } from "../errors/index.js";
export const uploadImage = async (req, res) => {
    const { file } = req;
    const { type } = req.body;
    if (!file) {
        throw new BadRequestError("No file uploaded");
    }
    if (!req.user) {
        throw new ForbiddenError("Forbidden");
    }
    const result = await uploadImageToDraft(req.params.id, file, type, req.user.id);
    if (isServiceError(result)) {
        throw new InternalServerError(SERVER_ERROR);
    }
    return res.status(200).json(result);
};
export const resetImage = async (req, res) => {
    const { type } = req.body;
    if (!req.user) {
        throw new ForbiddenError("Forbidden");
    }
    const result = await resetDraftImage(req.params.id, type, req.user.id);
    if (isServiceError(result)) {
        throw new InternalServerError(SERVER_ERROR);
    }
    return res.status(200).json(result);
};
