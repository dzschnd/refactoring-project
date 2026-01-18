import { Router } from 'express';
import { PublishedInvitationController } from '../controller/index.js';
import { verifyAccessToken, verifyUser } from '../middleware/AuthMiddleware.js';
import asyncHandler from "../middleware/asyncHandler.js";
import { validateBody } from "../middleware/validate.js";
import { invitationSchemas } from "../shared/schemas/invitation.js";

const router = Router();

router.post('/guest-answers/:id',
    validateBody(invitationSchemas.submitGuestAnswers),
    asyncHandler(PublishedInvitationController.submitGuestAnswers));
router.get('/guest-answers',
    verifyAccessToken, verifyUser,
    asyncHandler(PublishedInvitationController.getAllGuestAnswers));
router.get('/:id',
    asyncHandler(PublishedInvitationController.getInvitation));
router.get('/',
    verifyAccessToken, verifyUser,
    asyncHandler(PublishedInvitationController.getAllInvitations));

export default router;
