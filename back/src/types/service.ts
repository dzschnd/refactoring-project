export type ServiceError = { error: string; status?: number };

export type ServiceResponse<T> = T | ServiceError;

export const isServiceError = <T>(value: ServiceResponse<T>): value is ServiceError => {
  return typeof (value as ServiceError).error === "string";
};
