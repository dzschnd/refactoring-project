import { validationResult } from "express-validator";
import type { Request, Response, NextFunction } from "express";

const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => String(error.msg));
        return res.status(400).json({ error: errorMessages });
    }
    next();
};

export default handleValidationErrors;
