import { resetDraftImage, uploadImageToDraft } from "../service/DraftService.js";
import { errorResponse } from "../utils/errorUtils.js";
import { SERVER_ERROR } from "../messages/messages.js";
export const uploadImage = async (req, res) => {
    const { file } = req;
    const { type } = req.body;
    if (!file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    if (!req.user) {
        return res.status(403).json(errorResponse("Forbidden"));
    }
    const result = await uploadImageToDraft(req.params.id, file, type, req.user.id);
    if ("error" in result) {
        const errorStatus = 500;
        return res.status(errorStatus).json(errorResponse(result.status === 500 ? SERVER_ERROR : result.error));
    }
    return res.status(200).json(result);
};
export const resetImage = async (req, res) => {
    const { type } = req.body;
    if (!req.user) {
        return res.status(403).json(errorResponse("Forbidden"));
    }
    const result = await resetDraftImage(req.params.id, type, req.user.id);
    if ("error" in result) {
        const errorStatus = 500;
        return res.status(errorStatus).json(errorResponse(result.status === 500 ? SERVER_ERROR : result.error));
    }
    return res.status(200).json(result);
};
