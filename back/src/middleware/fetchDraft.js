import {getInvitationDetails} from "../utils/InvitationUtils.js";
import {connectClient, releaseClient} from "../queries/CommonQueries.js";

export default async (req, res, next) => {
    const { id: draft_id } = req.params;
    let client;
    try {
        client = await connectClient();
        const body = await getInvitationDetails(draft_id, false, client);
        if (!body || body.authorId !== req.user.id)
            return res.status(404).json({ error: 'Draft not found' });
        req.body = body;
        console.log(body);
        next();
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Failed to fetch draft info' });
    } finally {
        if (client) releaseClient(client);
    }
}