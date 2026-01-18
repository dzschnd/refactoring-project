import { validationResult } from "express-validator";
import { ValidationError } from "../errors/index.js";
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const details = errors.array().map((error) => ({
            field: "path" in error ? String(error.path) : "unknown",
            message: String(error.msg),
        }));
        return next(new ValidationError(details));
    }
    next();
};
export default handleValidationErrors;
