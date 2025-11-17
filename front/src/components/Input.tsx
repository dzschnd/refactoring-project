import React, { forwardRef, InputHTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { HidePassword } from "../assets/svg/auth/HidePassword";
import { ShowPassword } from "../assets/svg/auth/ShowPassword";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  name: string;
  label: string;
  iconElement: ReactNode;
  error?: string;
  tooltip?: ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      type,
      name,
      placeholder,
      value,
      onChange,
      onBlur,
      disabled,
      error,
      iconElement,
      label,
      tooltip
    },
    ref,
  ) => {
    const [isPasswordVisible, setPasswordVisible] = React.useState(false);
    const togglePasswordVisibility = () => {
      setPasswordVisible(!isPasswordVisible);
    };

    return (
      <div className={"relative"}>
        <div className={"mb-[5px] flex items-center gap-[2px]"}>
          <label
            htmlFor={id}
            className="font-primary text-200 font-semibold leading-[1] text-grey-500"
          >
            {label}
          </label>
          {tooltip}
        </div>
        <div className="relative">
          <div
            className={twMerge(
              "pointer-events-none absolute left-4 top-2.5 fill-grey-300 text-grey-300",
            )}
          >
            {iconElement}
          </div>
          <input
            id={id}
            name={name}
            type={type === "password" && isPasswordVisible ? "text" : type}
            className={twMerge(
              "h-11 w-full rounded-30 border border-grey-100 pl-[56px] font-primary text-400 font-light leading-[1.4] placeholder:text-grey-200 focus:border-blue-400 focus:outline-none",
              type === "password" ? "pr-[56px]" : "pr-4",
              disabled && "bg-grey-50",
              error && "border-red-error focus:border-red-error",
            )}
            placeholder={placeholder}
            ref={ref}
            value={value}
            disabled={disabled}
            onChange={onChange}
            onBlur={onBlur}
          />
          {type === "password" && (
            <button
              disabled={disabled}
              type="button"
              className="absolute right-4 top-2.5"
              onClick={togglePasswordVisibility}
            >
              {isPasswordVisible ? <HidePassword /> : <ShowPassword />}
            </button>
          )}
        </div>
        {error && (
          <span
            className={`absolute bottom-0 translate-y-full text-200 font-semibold text-primary`}
          >
            {error}
          </span>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
export default Input;
