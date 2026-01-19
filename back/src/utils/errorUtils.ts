export const errorResponse = (message: string): { error: string; status?: number } => ({
  error: message,
});
