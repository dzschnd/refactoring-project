export const getCurrentTime = () => {
    const now = new Date();
    const localOffset = now.getTimezoneOffset() * 60000;
    const localDate = new Date(now.getTime() - localOffset);
    return localDate.toISOString();
};
export const getExpirationTimeHours = (offsetHours) => {
    let expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + offsetHours);
    const localOffset = expiresAt.getTimezoneOffset();
    const adjustedExpiresAt = new Date(expiresAt.getTime() - localOffset * 60 * 1000);
    return adjustedExpiresAt.toISOString();
};
export const getExpirationTimeMinutes = (offsetMinutes) => {
    let expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + offsetMinutes);
    const localOffset = expiresAt.getTimezoneOffset();
    const adjustedExpiresAt = new Date(expiresAt.getTime() - localOffset * 60 * 1000);
    return adjustedExpiresAt.toISOString();
};
