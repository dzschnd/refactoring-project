import { Router } from 'express';
import { DraftController } from '../controller/index.js';
import { verifyAccessToken, verifyUser } from '../middleware/AuthMiddleware.js';
import fetchDraft from '../middleware/fetchDraft.js';
import {publishValidation, updateValidation} from '../validation/DraftValidation.js';
import handleValidationErrors from '../middleware/handleValidationErrors.js';
import asyncHandler from "../middleware/asyncHandler.js";

const router = Router();

router.put('/:id/publish',
    verifyAccessToken, verifyUser,
    fetchDraft,
    publishValidation, handleValidationErrors,
    asyncHandler(DraftController.publishDraft));
router.put('/:id/validate',
    verifyAccessToken, verifyUser,
    fetchDraft,
    publishValidation, handleValidationErrors,
    asyncHandler(DraftController.validateDraft));
router.post('/',
    verifyAccessToken, verifyUser,
    updateValidation, handleValidationErrors,
    asyncHandler(DraftController.createDraft));
router.patch('/:id',
    verifyAccessToken, verifyUser,
    updateValidation, handleValidationErrors,
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
