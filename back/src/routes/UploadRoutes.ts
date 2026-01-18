import { Router } from 'express';
import { UploadController } from '../controller/index.js';
import { verifyAccessToken, verifyUser } from '../middleware/AuthMiddleware.js';
import { uploadMiddleware } from '../middleware/uploadMiddleware.js';
import asyncHandler from "../middleware/asyncHandler.js";

const router = Router();

router.post('/:id',
    verifyAccessToken, verifyUser,
    uploadMiddleware,
    asyncHandler(UploadController.uploadImage));

router.post('/reset/:id',
    verifyAccessToken, verifyUser,
    uploadMiddleware,
    asyncHandler(UploadController.resetImage));

export default router;
