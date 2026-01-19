import React, { forwardRef } from "react";
import type { FC, ReactNode } from "react";
import eyeIcon from "../../../assetsOld/formIcons/eye.png";
import eyeClosedIcon from "../../../assetsOld/formIcons/eye-closed.png";
import FormErrorMessage from "../../../components/FormErrorMessage";
import { twMerge } from "tailwind-merge";

interface InputFieldProps {
  id: string;
  type: string;
  placeholder: string;
  icon?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent) => void;
  disabled?: boolean;
  error?: string;
  iconElement?: ReactNode;
}

const InputField: FC<InputFieldProps> = forwardRef<
  HTMLInputElement,
  InputFieldProps
>(
  (
    {
      id,
      type,
      placeholder,
      icon,
      value,
      onChange,
      onBlur,
      disabled,
      error,
      iconElement,
      ...props
    },
    ref,
  ) => {
    const [isPasswordVisible, setPasswordVisible] = React.useState(false);
    const togglePasswordVisibility = () => {
      setPasswordVisible(!isPasswordVisible);
    };

    return (
      <>
        <div className="relative">
          {icon && (
            <img
              src={icon}
              alt=""
              className={twMerge(
                "pointer-events-none absolute left-4 top-4 md:top-2.5",
              )}
            />
          )}
          {iconElement && (
            <div
              className={twMerge(
                "pointer-events-none absolute left-4 top-4 fill-grey-300 text-grey-300 md:top-2.5",
                error && "fill-red-error text-red-error",
              )}
            >
              {iconElement}
            </div>
          )}
          <input
            id={id}
            type={type === "password" && isPasswordVisible ? "text" : type}
            className={twMerge(
              "h-14 w-full rounded-[8px] border border-grey-100 px-4 pl-[56px] font-primary text-400 font-light leading-[1.4] placeholder:text-grey-200 focus:outline-none md:h-11",
              error && "border-red-error",
            )}
            placeholder={placeholder}
            ref={ref}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            {...props}
            disabled={disabled}
          />
          {type === "password" && (
            <button
              type="button"
              className="absolute right-4 top-4 md:top-2.5"
              onClick={togglePasswordVisibility}
            >
              <img
                src={isPasswordVisible ? eyeIcon : eyeClosedIcon}
                alt={isPasswordVisible ? "Hide password" : "Show password"}
              />
            </button>
          )}
        </div>
        {error && <FormErrorMessage message={error} />}
      </>
    );
  },
);

export default InputField;
