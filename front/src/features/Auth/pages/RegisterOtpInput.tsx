import { useEffect, useState } from "react";
import type { Dispatch, FC, SetStateAction } from "react";
import type { AuthPage, StateError } from "../../../types";
import type { AppDispatch, RootState } from "../../../api/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { requestOtp, verifyEmail } from "../../../api/service/UserService";
import LinkToLoginOrRegister from "../components/LinkToLoginOrRegister";
import OTPInputField from "../components/OTPInputField";
import {
  INVALID_OTP_TRY_REPEAT,
  OTP_EXPIRED,
  SERVER_ERROR,
} from "../../../api/messages";
import clsx from "clsx";
import { verifyEmailSchema } from "../../../shared/schemas/auth";

type OtpInputProps = {
  setCurrentPage: Dispatch<SetStateAction<AuthPage>>;
};

export const RegisterOtpInput: FC<OtpInputProps> = ({ setCurrentPage }) => {
  const dispatch: AppDispatch = useDispatch();
  const { email } = useSelector((state: RootState) => state.user);
  const [resetOtp, setResetOtp] = useState(false);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [prevOtpLength, setPrevOtpLength] = useState(0);

  const maxSecondsUntilCanSend = 30;
  const [secondsUntilCanSend, setSecondsUntilCanSend] = useState(
    maxSecondsUntilCanSend,
  );

  const handleRequestOtp = async () => {
    await dispatch(requestOtp({ email: email }));
    setError("");
    setResetOtp(true);
    setTimeout(() => setResetOtp(false), 0);
  };

  const onSubmit = async (otp: string) => {
    const otpValidation = verifyEmailSchema.shape.otp.safeParse(otp);
    if (!otpValidation.success) {
      setError(
        otpValidation.error.issues[0]?.message ?? INVALID_OTP_TRY_REPEAT,
      );
      return;
    }
    const response = await dispatch(verifyEmail({ email: email, otp: otp }));
    if (response.meta.requestStatus === "fulfilled") {
      setIsSuccess(true);
      setTimeout(() => setCurrentPage("PASSWORD_RESET"), 1000);
    } else if (!error && prevOtpLength < 6) {
      const errorPayload = response.payload as StateError | undefined;
      if (errorPayload?.status === 404) {
        setError(INVALID_OTP_TRY_REPEAT);
      } else if (errorPayload?.status === 400) {
        setError(OTP_EXPIRED);
      } else {
        setError(errorPayload?.message ?? SERVER_ERROR);
      }
    }
  };

  useEffect(() => {
    if (secondsUntilCanSend <= 0) return;

    const interval = setInterval(() => {
      setSecondsUntilCanSend((s) => s - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsUntilCanSend]);

  return (
    <div
      className={clsx(
        "h-[270px] sm:h-[340px] sm:w-[386px] md:flex md:h-min md:w-full md:flex-col md:justify-center md:pb-[118.5px]",
        error || "md:mb-[24.8px]",
      )}
    >
      <h1 className="mb-4 text-center font-primary-condensed text-800 font-bold leading-[1] text-primary sm:text-900">
        Проверьте почту
      </h1>
      <p className={"mb-6 text-center text-300 leading-[1.2]"}>
        Мы отправили вам код для верификации на почту{" "}
        <br className={"hidden sm:block"} />
        <span className={"font-bold"}>{email}</span>
      </p>

      <div className="mb-9 flex justify-center md:mb-[30px]">
        <OTPInputField
          isSuccess={isSuccess}
          onComplete={(otp) => onSubmit(otp)}
          reset={resetOtp}
          isError={error !== ""}
          setIsError={setError}
          setPrevOtpLength={setPrevOtpLength}
        />
      </div>
      <p
        className={clsx(
          "mb-2 text-center text-300 leading-[1.2]",
          !error && "hidden",
        )}
      >
        {INVALID_OTP_TRY_REPEAT}
      </p>

      <div className={"flex justify-center"}>
        {secondsUntilCanSend <= 0 ? (
          <button
            onClick={async () => {
              setSecondsUntilCanSend(maxSecondsUntilCanSend);
              await handleRequestOtp();
            }}
          >
            <p className="text-300 font-bold leading-[1.2] text-primary underline">
              Получить новый код
            </p>
          </button>
        ) : (
          <p className={"text-center text-300 leading-[1.2]"}>
            Получить новый можно через{" "}
            <span className={"font-bold text-primary"}>
              0:{secondsUntilCanSend < 10 && "0"}
              {secondsUntilCanSend}
            </span>
          </p>
        )}
      </div>
      <LinkToLoginOrRegister toLogin={true} setCurrentPage={() => {}} />
    </div>
  );
};
