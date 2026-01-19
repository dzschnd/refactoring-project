import type { AxiosError } from "axios";

export type ErrorDetails = Array<{ field?: string; message: string }>;

export type ServiceError = {
  message: string;
  status?: number | null;
  details?: ErrorDetails;
};

type ErrorResponse =
  | { error: string }
  | { error: { code: string; message: string; details?: ErrorDetails } };

export const parseServiceError = (error: unknown): ServiceError => {
  const castedError = error as AxiosError<ErrorResponse>;

  if (castedError.response) {
    const errorData = castedError.response.data as unknown;
    if (errorData && typeof errorData === "object" && "error" in errorData) {
      const typedErrorData = errorData as ErrorResponse;
      if (typeof typedErrorData.error === "string") {
        return {
          message: typedErrorData.error || "Unknown error",
          status: castedError.response.status,
        };
      }
      return {
        message: typedErrorData.error.message || "Unknown error",
        status: castedError.response.status,
        details: typedErrorData.error.details,
      };
    }
    return {
      message: "Request failed",
      status: castedError.response.status,
    };
  }

  return { message: castedError.message ?? "Unknown error", status: null };
};
