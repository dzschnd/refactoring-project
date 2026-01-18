import type { Request, Response, NextFunction } from "express";
import logger from "../logger.js";

const requestLogger = (req: Request, res: Response, next: NextFunction): void => {
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
