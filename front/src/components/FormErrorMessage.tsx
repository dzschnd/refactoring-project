import React, { FC } from "react";

const FormErrorMessage: FC<{
  message: string | undefined;
  className?: string;
}> = ({ message, className }) => {
  return (
    <span
      className={`absolute bottom-0 mt-[5px] translate-y-full text-200 text-red-700 ${className}`}
    >
      {message ? message : ""}
    </span>
  );
};

export default FormErrorMessage;
