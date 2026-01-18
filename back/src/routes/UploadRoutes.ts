import { Router } from 'express';
import { UploadController } from '../controller/index.js';
import { verifyAccessToken, verifyUser } from '../middleware/AuthMiddleware.js';
import { uploadMiddleware } from '../middleware/uploadMiddleware.js';

const router = Router();

router.post('/:id',
    verifyAccessToken, verifyUser,
    uploadMiddleware,
    UploadController.uploadImage);

router.post('/reset/:id',
    verifyAccessToken, verifyUser,
    uploadMiddleware,
    UploadController.resetImage);

export default router;
