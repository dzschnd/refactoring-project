import type { Request, Response } from "express";
import { resetDraftImage, uploadImageToDraft } from "../service/DraftService.js";
import { isServiceError } from "../types/service.js";
import { BadRequestError, ForbiddenError } from "../errors/index.js";

export const uploadImage = async (req: Request, res: Response): Promise<Response> => {
  const { file } = req;
  const { type } = req.body as { type: string };

  if (!file) {
    throw new BadRequestError("No file uploaded");
  }

  if (!req.user) {
    throw new ForbiddenError("Forbidden");
  }

  const result = await uploadImageToDraft(req.params.id, file, type, req.user.id);

  if (isServiceError(result)) {
    throw new BadRequestError(result.error);
  }

  return res.status(200).json(result);
};

export const resetImage = async (req: Request, res: Response): Promise<Response> => {
  const { type } = req.body as { type: string };

  if (!req.user) {
    throw new ForbiddenError("Forbidden");
  }

  const result = await resetDraftImage(req.params.id, type, req.user.id);

  if (isServiceError(result)) {
    throw new BadRequestError(result.error);
  }

  return res.status(200).json(result);
};
