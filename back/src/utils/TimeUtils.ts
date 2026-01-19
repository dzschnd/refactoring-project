export const getCurrentTime = (): Date => {
  const now = new Date();
  const localOffset = now.getTimezoneOffset() * 60000;
  const localDate = new Date(now.getTime() - localOffset);
  return localDate;
};
export const getExpirationTimeHours = (offsetHours: number): Date => {
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + offsetHours);
  const localOffset = expiresAt.getTimezoneOffset();
  const adjustedExpiresAt = new Date(expiresAt.getTime() - localOffset * 60 * 1000);
  return adjustedExpiresAt;
};
export const getExpirationTimeMinutes = (offsetMinutes: number): Date => {
  const expiresAt = new Date();
  expiresAt.setMinutes(expiresAt.getMinutes() + offsetMinutes);
  const localOffset = expiresAt.getTimezoneOffset();
  const adjustedExpiresAt = new Date(expiresAt.getTime() - localOffset * 60 * 1000);
  return adjustedExpiresAt;
};
