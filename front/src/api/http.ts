import axios from "axios";
import type { AxiosError, AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import type { AppDispatch } from "./redux/store";
import { requestStarted, requestFinished, setError } from "./redux/slices/uiSlice";
import { parseServiceError } from "./errors";

export const baseURL = `${process.env.REACT_APP_SERVER_DOMAIN}`;

export const api = axios.create({
  baseURL,
});

export const apiAuth = axios.create({
  baseURL,
  withCredentials: true,
});

let apiDispatch: AppDispatch | null = null;

export const setApiDispatch = (dispatch: AppDispatch) => {
  apiDispatch = dispatch;
};

const start = () => {
  if (apiDispatch) apiDispatch(requestStarted());
};

const finish = () => {
  if (apiDispatch) apiDispatch(requestFinished());
};

const shouldIgnoreError = (error: unknown) => {
  const axiosError = error as AxiosError | undefined;
  return axiosError?.code === "ERR_CANCELED";
};

type RequestConfigWithToast = AxiosRequestConfig & { suppressErrorToast?: boolean };
type InternalConfigWithToast = InternalAxiosRequestConfig & { suppressErrorToast?: boolean };

const attachInterceptors = (instance: typeof api) => {
  instance.interceptors.request.use(
    (config: InternalConfigWithToast) => {
      start();
      return config;
    },
    (error) => {
      finish();
      return Promise.reject(
        error instanceof Error ? error : new Error("Request failed"),
      );
    },
  );

  instance.interceptors.response.use(
    (response) => {
      finish();
      return response;
    },
    (error) => {
      finish();
      const config = error?.config as RequestConfigWithToast | undefined;
      if (!config?.suppressErrorToast && !shouldIgnoreError(error) && apiDispatch) {
        apiDispatch(setError(parseServiceError(error)));
      }
      return Promise.reject(
        error instanceof Error ? error : new Error("Request failed"),
      );
    },
  );
};

attachInterceptors(api);

apiAuth.interceptors.request.use(
  (config: InternalConfigWithToast) => {
    start();
    return config;
  },
  (error) => {
    finish();
    return Promise.reject(
      error instanceof Error ? error : new Error("Request failed"),
    );
  },
);

apiAuth.interceptors.response.use(
  (response) => {
    finish();
    return response;
  },
  async (error: AxiosError) => {
    finish();
    const originalRequest = error.config as
      | (RequestConfigWithToast & { _retry?: boolean })
      | undefined;
    const status = error.response?.status ?? null;

    if (status === 403 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await api.post(`/auth/refresh`, {}, { withCredentials: true });
        return apiAuth(originalRequest);
      } catch (refreshError) {
        if (
          !originalRequest?.suppressErrorToast &&
          !shouldIgnoreError(refreshError) &&
          apiDispatch
        ) {
          apiDispatch(setError(parseServiceError(refreshError)));
        }
        return Promise.reject(
          refreshError instanceof Error
            ? refreshError
            : new Error("Failed to refresh session"),
        );
      }
    }

    if (
      !originalRequest?.suppressErrorToast &&
      !shouldIgnoreError(error) &&
      apiDispatch
    ) {
      apiDispatch(setError(parseServiceError(error)));
    }
    return Promise.reject(
      error instanceof Error ? error : new Error("Request failed"),
    );
  },
);
