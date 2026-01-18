import type { Request, Response, NextFunction } from "express";
import {getInvitationDetails} from "../utils/InvitationUtils.js";

const fetchDraft = async (req: Request, res: Response, next: NextFunction) => {
    const { id: draft_id } = req.params;
    try {
        const body = await getInvitationDetails(draft_id, false);
        if (!body || !req.user || body.authorId !== req.user.id)
            return res.status(404).json({ error: 'Draft not found' });
        req.body = body;
        console.log(body);
        next();
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Failed to fetch draft info' });
    }
};

export default fetchDraft;
