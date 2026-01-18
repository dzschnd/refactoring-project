import logger from "../logger.js";
import { AppError } from "../errors/index.js";
const errorHandler = (err, _req, res, _next) => {
    if (err instanceof AppError) {
        logger.warn({ code: err.code, statusCode: err.statusCode, details: err.details }, err.message);
        return res.status(err.statusCode).json({
            error: {
                code: err.code,
                message: err.message,
                details: err.details,
            },
        });
    }
    logger.error({ err }, "Unhandled error");
    return res.status(500).json({
        error: {
            code: "INTERNAL_ERROR",
            message: "Internal server error",
        },
    });
};
export default errorHandler;
