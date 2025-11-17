import React, { Dispatch, FC, SetStateAction } from "react";
import { AuthPage } from "../../../types";

type PasswordResetSuccessProps = {
  setCurrentPage: Dispatch<SetStateAction<AuthPage>>;
};

export const PasswordResetSuccess: FC<PasswordResetSuccessProps> = ({
  setCurrentPage,
}) => {
  return (
    <div>
      <h1 className="max-h-[84px] font-primary-condensed text-800 font-bold leading-[1] text-primary sm:h-full sm:w-[386px] sm:text-900 md:w-full md:text-center">
        Пароль успешно изменен!
      </h1>
    </div>
  );
};
