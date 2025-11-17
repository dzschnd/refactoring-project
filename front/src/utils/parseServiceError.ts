import { AxiosError } from "axios";

interface ErrorResponse {
  error: string;
}

export const parseServiceError = (
  error: unknown
) => {
  const castedError = error as AxiosError<ErrorResponse>;

  if (castedError.response) {
    const errorData = castedError.response.data;
    return {message: errorData.error || "Unknown error",  status: castedError.response.status};
  } else {
    return {message: castedError.message, status: null};
  }
};
