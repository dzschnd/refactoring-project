import { Router } from 'express';
import { DraftController } from '../controller/index.js';
import { verifyAccessToken, verifyUser } from '../middleware/AuthMiddleware.js';
import fetchDraft from '../middleware/fetchDraft.js';
import asyncHandler from "../middleware/asyncHandler.js";
import { validateBody } from "../middleware/validate.js";
import { draftSchemas } from "../shared/schemas/draft.js";
import { validateDraftPublish, validateDraftUpdate } from "../validation/draftValidation.js";

const router = Router();

router.put('/:id/publish',
    verifyAccessToken, verifyUser,
    fetchDraft,
    validateDraftPublish,
    asyncHandler(DraftController.publishDraft));
router.put('/:id/validate',
    verifyAccessToken, verifyUser,
    fetchDraft,
    validateDraftPublish,
    asyncHandler(DraftController.validateDraft));
router.post('/',
    verifyAccessToken, verifyUser,
    validateBody(draftSchemas.create),
    asyncHandler(DraftController.createDraft));
router.patch('/:id',
    verifyAccessToken, verifyUser,
    validateDraftUpdate,
    asyncHandler(DraftController.updateDraft));
router.get('/:id',
    verifyAccessToken, verifyUser,
    asyncHandler(DraftController.getDraft));
router.get('/',
    verifyAccessToken, verifyUser,
    asyncHandler(DraftController.getAllDrafts));
router.delete('/:id',
    verifyAccessToken, verifyUser,
    asyncHandler(DraftController.deleteDraft));

export default router;
