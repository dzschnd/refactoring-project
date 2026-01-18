import { validationResult } from "express-validator";
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => String(error.msg));
        return res.status(400).json({ error: errorMessages });
    }
    next();
};
export default handleValidationErrors;
