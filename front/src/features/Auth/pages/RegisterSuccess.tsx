import type { Dispatch, FC, SetStateAction } from "react";
import type { AuthPage } from "../../../types";
import { Spark } from "../../../assets/svg/auth/Spark";

type RegisterSuccessProps = {
  setCurrentPage: Dispatch<SetStateAction<AuthPage>>;
};

export const RegisterSuccess: FC<RegisterSuccessProps> = ({
  setCurrentPage: _setCurrentPage,
}) => {
  return (
    <div
      className={
        "flex min-h-[104px] flex-col items-center gap-6 sm:h-[196px] sm:max-w-[406px] md:w-full"
      }
    >
      <div>
        <Spark />
      </div>
      <h1 className="text-center font-primary-condensed text-800 font-bold leading-[1] text-primary sm:text-900">
        Вы успешно зарегистрированы!
      </h1>
    </div>
  );
};
