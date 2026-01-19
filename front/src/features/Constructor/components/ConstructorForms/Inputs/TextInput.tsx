import { forwardRef, useId } from "react";
import type { ChangeEvent, FC } from "react";

interface InputProps {
  placeholder: string;
  icon?: string;
  label: string;
  className?: string;
  disabled?: boolean;
  value?: string | null;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
}
const TextInput: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder, icon, label, className, value, onChange, onBlur }, ref) => {
    const id = useId();

    return (
      <div
        className={`flex h-[66px] items-center gap-3 rounded-[44px] border-[1px] border-grey-100 px-4 py-3 ${className}`}
      >
        {icon && <img src={icon} alt="" />}
        <div className="flex w-full flex-col gap-1">
          <label
            htmlFor={id}
            className="font-primary text-200 font-normal text-grey-400"
          >
            {label}
          </label>
          <input
            autoComplete={"off"}
            id={id}
            type={"text"}
            className="font-primary text-400 font-normal text-grey-500 placeholder:text-grey-200 focus:outline-none disabled:bg-white"
            placeholder={placeholder}
            value={value ?? ""}
            onChange={onChange}
            onBlur={onBlur}
            ref={ref}
          />
        </div>
      </div>
    );
  },
);

export default TextInput;
