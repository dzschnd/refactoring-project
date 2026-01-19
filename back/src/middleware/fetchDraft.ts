import type { Request, Response, NextFunction } from "express";
import { getInvitationDetails } from "../utils/InvitationUtils.js";
import logger from "../logger.js";
import { InternalServerError, NotFoundError } from "../errors/index.js";

const fetchDraft = async (req: Request, res: Response, next: NextFunction) => {
  const { id: draft_id } = req.params;
  try {
    const body = await getInvitationDetails(draft_id, false);
    if (!body || !req.user || body.authorId !== req.user.id)
      return next(new NotFoundError("Draft not found"));
    req.body = body;
    next();
  } catch (error) {
    logger.error({ err: error }, "Failed to fetch draft info");
    return next(new InternalServerError("Failed to fetch draft info"));
  }
};

export default fetchDraft;
