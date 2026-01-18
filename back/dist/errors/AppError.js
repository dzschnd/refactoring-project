export class AppError extends Error {
    statusCode;
    code;
    details;
    constructor(message, statusCode, code, details) {
        super(message);
        this.statusCode = statusCode;
        this.code = code;
        this.details = details;
    }
}
export class ValidationError extends AppError {
    constructor(details) {
        super("Validation failed", 400, "VALIDATION_ERROR", details);
    }
}
export class BadRequestError extends AppError {
    constructor(message) {
        super(message, 400, "BAD_REQUEST");
    }
}
export class UnauthorizedError extends AppError {
    constructor(message) {
        super(message, 401, "UNAUTHORIZED");
    }
}
export class ForbiddenError extends AppError {
    constructor(message) {
        super(message, 403, "FORBIDDEN");
    }
}
export class NotFoundError extends AppError {
    constructor(message) {
        super(message, 404, "NOT_FOUND");
    }
}
export class ConflictError extends AppError {
    constructor(message) {
        super(message, 409, "CONFLICT");
    }
}
export class UnprocessableEntityError extends AppError {
    constructor(message) {
        super(message, 422, "UNPROCESSABLE_ENTITY");
    }
}
export class InternalServerError extends AppError {
    constructor(message) {
        super(message, 500, "INTERNAL_ERROR");
    }
}
