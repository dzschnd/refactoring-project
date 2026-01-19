import type { FC } from "react";
import Button from "../../../components/Button";

interface SubmitButtonProps {
  message: string;
}

const SubmitButton: FC<SubmitButtonProps> = ({ message }) => {
  return (
    <Button
      type="submit"
      borderRadius={30}
      message={message}
      className={`h-9 w-full uppercase`}
      inverted
    />
  );
};

export default SubmitButton;
