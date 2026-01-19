import axios from "axios";
import type {
  AxiosError,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";
import type { AppDispatch } from "./redux/store";
import {
  requestStarted,
  requestFinished,
  setError,
} from "./redux/slices/uiSlice";
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

type RequestConfigWithToast = AxiosRequestConfig & {
  suppressErrorToast?: boolean;
  suppressErrorToastOn404?: boolean;
  suppressErrorToastOn403?: boolean;
  suppressGlobalLoading?: boolean;
  __skipGlobalLoading?: boolean;
};
type InternalConfigWithToast = InternalAxiosRequestConfig & {
  suppressErrorToast?: boolean;
  suppressErrorToastOn404?: boolean;
  suppressErrorToastOn403?: boolean;
  suppressGlobalLoading?: boolean;
  __skipGlobalLoading?: boolean;
};

const shouldShowToast = (
  error: unknown,
  config?: RequestConfigWithToast,
): boolean => {
  if (config?.suppressErrorToast) return false;
  if (config?.suppressErrorToastOn403) {
    const status = (error as AxiosError | undefined)?.response?.status;
    if (status === 403) return false;
  }
  if (config?.suppressErrorToastOn404) {
    const status = (error as AxiosError | undefined)?.response?.status;
    if (status === 404) return false;
  }
  return true;
};

const attachInterceptors = (instance: typeof api) => {
  instance.interceptors.request.use(
    (config: InternalConfigWithToast) => {
      if (config.suppressGlobalLoading) {
        config.__skipGlobalLoading = true;
      } else {
        start();
      }
      return config;
    },
    (error) => {
      const config = axios.isAxiosError(error)
        ? (error.config as RequestConfigWithToast | undefined)
        : undefined;
      if (!config?.__skipGlobalLoading) {
        finish();
      }
      return Promise.reject(
        error instanceof Error ? error : new Error("Request failed"),
      );
    },
  );

  instance.interceptors.response.use(
    (response) => {
      const config = response?.config as RequestConfigWithToast | undefined;
      if (!config?.__skipGlobalLoading) {
        finish();
      }
      return response;
    },
    (error) => {
      const config = axios.isAxiosError(error)
        ? (error.config as RequestConfigWithToast | undefined)
        : undefined;
      if (!config?.__skipGlobalLoading) {
        finish();
      }
      if (
        shouldShowToast(error, config) &&
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
};

attachInterceptors(api);

apiAuth.interceptors.request.use(
  (config: InternalConfigWithToast) => {
    if (config.suppressGlobalLoading) {
      config.__skipGlobalLoading = true;
    } else {
      start();
    }
    return config;
  },
  (error) => {
    const config = axios.isAxiosError(error)
      ? (error.config as RequestConfigWithToast | undefined)
      : undefined;
    if (!config?.__skipGlobalLoading) {
      finish();
    }
    return Promise.reject(
      error instanceof Error ? error : new Error("Request failed"),
    );
  },
);

apiAuth.interceptors.response.use(
  (response) => {
    const config = response?.config as RequestConfigWithToast | undefined;
    if (!config?.__skipGlobalLoading) {
      finish();
    }
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as
      | (RequestConfigWithToast & { _retry?: boolean })
      | undefined;
    if (!originalRequest?.__skipGlobalLoading) {
      finish();
    }
    const status = error.response?.status ?? null;

    if (status === 403 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await api.post(
          `/auth/refresh`,
          {},
          {
            withCredentials: true,
            suppressErrorToast: true,
            suppressErrorToastOn403: true,
          },
        );
        return apiAuth(originalRequest);
      } catch (refreshError) {
        if (
          shouldShowToast(refreshError, originalRequest) &&
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
      shouldShowToast(error, originalRequest) &&
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
