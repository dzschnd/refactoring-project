import logger from "../logger.js";
const requestLogger = (req, res, next) => {
    const start = Date.now();
    const { method, originalUrl } = req;
    res.on("finish", () => {
        const durationMs = Date.now() - start;
        logger.info({
            method,
            path: originalUrl,
            statusCode: res.statusCode,
            durationMs,
            ip: req.ip,
        }, "request");
    });
    next();
};
export default requestLogger;
