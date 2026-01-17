import {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useRef,
  useState,
} from "react";
import clsx from "clsx";
import { MobileClose } from "../../../assets/svg/auth/MobileClose";
import { Close } from "../../../assets/svg/auth/Close";
import { useCloseOnClickOutside } from "../../../hooks/useCloseOnClickOutside";
import { AuthPage } from "../../../types";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { RegisterOtpInput } from "../pages/RegisterOtpInput";
import { PasswordReset } from "../pages/PasswordReset";
import { PasswordResetSuccess } from "../pages/PasswordResetSuccess";
import { RegisterSuccess } from "../pages/RegisterSuccess";
import { ForgotPassword } from "../pages/ForgotPassword";
import { PasswordResetOtpInput } from "../pages/PasswordResetOtpInput";

type AuthLayoutProps = {
  setIsAuthOpen: Dispatch<SetStateAction<boolean>>;
  currentPage: AuthPage;
  setCurrentPage: Dispatch<SetStateAction<AuthPage>>;
  loginInputValues: { email: string; password: string };
  setLoginInputValues: Dispatch<
    SetStateAction<{ email: string; password: string }>
  >;
  registerInputValues: { email: string; password: string };
  setRegisterInputValues: Dispatch<
    SetStateAction<{ email: string; password: string }>
  >;
  forgotPasswordInputValues: { email: string };
  setForgotPasswordInputValues: Dispatch<SetStateAction<{ email: string }>>;
};

export const AuthLayout: FC<AuthLayoutProps> = ({
  setIsAuthOpen,
  currentPage,
  setCurrentPage,
  loginInputValues,
  setLoginInputValues,
  registerInputValues,
  setRegisterInputValues,
  forgotPasswordInputValues,
  setForgotPasswordInputValues,
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [isWidePopup, setIsWidePopup] = useState<boolean>(false);

  const renderPage = (): ReactNode => {
    switch (currentPage) {
      case "LOGIN":
        return (
          <Login
            setCurrentPage={setCurrentPage}
            setIsAuthOpen={setIsAuthOpen}
            inputValues={loginInputValues}
            setInputValues={setLoginInputValues}
          />
        );
      case "REGISTER":
        return (
          <Register
            setCurrentPage={setCurrentPage}
            inputValues={registerInputValues}
            setInputValues={setRegisterInputValues}
            setIsWidePopup={setIsWidePopup}
          />
        );
      case "REGISTER_OTP_INPUT":
        return <RegisterOtpInput setCurrentPage={setCurrentPage} />;
      case "REGISTER_SUCCESS":
        return <RegisterSuccess setCurrentPage={setCurrentPage} />;
      case "PASSWORD_RESET_OTP_INPUT":
        return <PasswordResetOtpInput setCurrentPage={setCurrentPage} />;
      case "PASSWORD_RESET":
        return <PasswordReset setCurrentPage={setCurrentPage} />;
      case "PASSWORD_RESET_SUCCESS":
        return <PasswordResetSuccess setCurrentPage={setCurrentPage} />;
      case "FORGOT_PASSWORD":
        return (
          <ForgotPassword
            setCurrentPage={setCurrentPage}
            setInputValues={setForgotPasswordInputValues}
            inputValues={forgotPasswordInputValues}
            setIsWidePopup={setIsWidePopup}
          />
        );
      default:
        return null;
    }
  };

  useCloseOnClickOutside({
    popupRef: overlayRef,
    setIsPopupOpenAction: setIsAuthOpen,
  });

  return (
    <div
      className={
        "absolute z-50 flex h-full w-full items-end bg-black--opaque backdrop-blur-[4px] sm:items-center sm:justify-center md:justify-end"
      }
    >
      <div
        ref={overlayRef}
        className={clsx(
          "w-full sm:w-auto md:w-[630px]",
          "[&>div]:w-full [&>div]:sm:pt-[46px] [&>div]:md:pt-0",
          "sm:h-min md:h-full",
          "px-[16px] py-[30px] sm:px-[30px] md:px-[122px]",
          "md:flex md:items-center md:justify-center",
          "rounded-t-20 sm:rounded-b-20 md:rounded-none",
          "absolute bg-white",
        )}
      >
        <button
          aria-label={"Close popup"}
          className={"absolute right-4 top-[-34px] sm:hidden"}
          onClick={() => {
            setIsAuthOpen(false);
            console.log(loginInputValues);
          }}
        >
          <MobileClose />
        </button>
        <button
          aria-label={"Close popup"}
          className={"absolute right-[30px] top-[30px] hidden sm:block"}
          onClick={() => {
            setIsAuthOpen(false);
            console.log(loginInputValues);
          }}
        >
          <Close />
        </button>

        {renderPage()}
      </div>
    </div>
  );
};

export default AuthLayout;
