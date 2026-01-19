import { ValidationError } from "../errors/index.js";
const toDetails = (error) => {
    return error.issues.map((issue) => ({
        field: issue.path.length ? issue.path.join(".") : "body",
        message: issue.message,
    }));
};
export const validateBody = (schema) => {
    return async (req, _res, next) => {
        const result = await schema.safeParseAsync(req.body);
        if (!result.success) {
            return next(new ValidationError(toDetails(result.error)));
        }
        const parsed = result.data;
        req.body = parsed;
        next();
    };
};
