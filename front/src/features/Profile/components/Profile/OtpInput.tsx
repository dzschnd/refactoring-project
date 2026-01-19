import type { FC } from "react";
import success from "../../../../assetsOld/success.png";
import OTPInputField from "../../../Auth/components/OTPInputField";
import FormErrorMessage from "../../../../components/FormErrorMessage";
import { INVALID_OTP } from "../../../../api/messages";

interface OtpInputProps {
  isError: boolean;
  setIsError: (value: string) => void;
  setPrevOtpLength: (value: number) => void;
  onSubmit: (value: string) => void;
  onCancel: () => void;
  isSuccess: boolean;
}

const OtpInput: FC<OtpInputProps> = ({
  isError,
  setIsError,
  setPrevOtpLength,
  onCancel,
  onSubmit,
  isSuccess,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative h-[332px] w-[336px] rounded-[20px] bg-white px-[40px] py-[60px]">
        <span className="text-800 leading-[1.2] text-grey-500">
          Введите новый e-mail
        </span>
        <p className="mt-[20px] text-300 font-light leading-[24px] text-grey-500">
          Введите код верификации
        </p>
        <div className="mt-[30px] flex flex-col items-center gap-[30px]">
          {isSuccess ? (
            <img className="h-[30px] w-[30px]" alt="Success" src={success} />
          ) : (
            <div className="relative">
              <OTPInputField
                isSuccess={false}
                onComplete={(otp) => onSubmit(otp)}
                reset={false}
                isError={isError}
                setIsError={setIsError}
                setPrevOtpLength={setPrevOtpLength}
              />
              {isError && <FormErrorMessage message={INVALID_OTP} />}
            </div>
          )}
          <button
            className="h-[34px] rounded-[30px] bg-grey-100 px-[18px] text-white"
            onClick={onCancel}
          >
            {isSuccess ? "Ок" : "Отмена"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtpInput;
