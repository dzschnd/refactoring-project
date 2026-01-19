import "axios";

declare module "axios" {
  export interface AxiosRequestConfig {
    suppressErrorToast?: boolean;
    suppressErrorToastOn404?: boolean;
    suppressErrorToastOn403?: boolean;
    suppressGlobalLoading?: boolean;
  }
}
