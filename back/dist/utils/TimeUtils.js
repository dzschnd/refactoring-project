export const getCurrentTime = () => {
    const now = new Date();
    const localOffset = now.getTimezoneOffset() * 60000;
    const localDate = new Date(now.getTime() - localOffset);
    return localDate;
};
export const getExpirationTimeHours = (offsetHours) => {
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + offsetHours);
    const localOffset = expiresAt.getTimezoneOffset();
    const adjustedExpiresAt = new Date(expiresAt.getTime() - localOffset * 60 * 1000);
    return adjustedExpiresAt;
};
export const getExpirationTimeMinutes = (offsetMinutes) => {
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + offsetMinutes);
    const localOffset = expiresAt.getTimezoneOffset();
    const adjustedExpiresAt = new Date(expiresAt.getTime() - localOffset * 60 * 1000);
    return adjustedExpiresAt;
};
