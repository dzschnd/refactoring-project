import type { FC } from "react";

const ErrorMessage: FC<{
  message: string | undefined;
  className?: string;
}> = ({ message, className }) => {
  return (
    <p className={`text-error mb-9 text-center text-400 ${className}`}>
      {message ? message : ""}
    </p>
  );
};

export default ErrorMessage;
