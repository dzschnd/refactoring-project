import type { FC } from "react";

interface InputLabelProps {
  id: string;
  label: string;
}

const InputLabel: FC<InputLabelProps> = ({ id, label }) => {
  return (
    <label
      htmlFor={id}
      className="mb-[5px] font-primary text-200 font-normal leading-[1.2] text-grey-500"
    >
      {label}
    </label>
  );
};

export default InputLabel;
