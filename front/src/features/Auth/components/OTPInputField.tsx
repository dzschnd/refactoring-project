import { FC, useEffect, useState } from "react";
import { OTPInput, REGEXP_ONLY_DIGITS, SlotProps } from "input-otp";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

interface ErrorableSlotProps extends SlotProps {
  isError: boolean;
  isSuccess: boolean;
}
function Slot(props: ErrorableSlotProps) {
  return (
    <div
      className={clsx(
        "relative flex h-[40px] w-[30px] items-center justify-center rounded-10 font-primary-condensed text-900 font-semibold leading-6 transition-all duration-300",
        props.isError
          ? "bg-red-100 text-primary"
          : props.isSuccess
            ? "bg-green-100"
            : "bg-grey-75",
      )}
    >
      {props.char}
      {props.hasFakeCaret && <FakeCaret />}
    </div>
  );
}

function FakeCaret() {
  return (
    <div className="pointer-events-none absolute inset-0 flex animate-caret-blink items-center justify-center">
      <div className="h-[22px] w-px bg-black" />
    </div>
  );
}

interface OTPInputProps {
  onComplete: (newValue: string) => void;
  reset: boolean;
  isError: boolean;
  isSuccess: boolean;
  setIsError: (value: string) => void;
  setPrevOtpLength: (number: number) => void;
}

const OTPInputField: FC<OTPInputProps> = ({
  onComplete,
  reset,
  isError,
  isSuccess,
  setIsError,
  setPrevOtpLength,
}) => {
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (reset) {
      setKey((prevKey) => prevKey + 1);
    }
  }, [reset]);

  return (
    <OTPInput
      pattern={REGEXP_ONLY_DIGITS}
      key={key}
      maxLength={6}
      onChange={(newValue) => {
        if (newValue.length === 6) {
          onComplete(newValue);
        }
        setPrevOtpLength(newValue.length);
        setIsError("");
      }}
      onComplete={onComplete}
      containerClassName="group flex items-center"
      render={({ slots }) => (
        <>
          <div className="flex gap-2.5">
            {slots.map((slot, idx) => (
              <Slot
                isSuccess={isSuccess}
                isError={isError}
                key={idx}
                {...slot}
              />
            ))}
          </div>
        </>
      )}
    />
  );
};

export default OTPInputField;
