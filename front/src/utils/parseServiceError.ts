import { AxiosError } from "axios";

type ErrorDetails = Array<{ field?: string; message: string }>;
type ErrorResponse =
  | { error: string }
  | { error: { code: string; message: string; details?: ErrorDetails } };

export const parseServiceError = (error: unknown) => {
  const castedError = error as AxiosError<ErrorResponse>;

  if (castedError.response) {
    const errorData = castedError.response.data;
    if (typeof errorData.error === "string") {
      return { message: errorData.error || "Unknown error", status: castedError.response.status };
    }
    return {
      message: errorData.error.message || "Unknown error",
      status: castedError.response.status,
      details: errorData.error.details,
    };
  }
  return { message: castedError.message, status: null };
};
