import React, { Dispatch, FC, SetStateAction } from "react";
import { Link } from "react-router-dom";
import { AuthPage } from "../../../types";
import clsx from "clsx";

const AuthLayout: FC<{
  toLogin: boolean;
  setCurrentPage: Dispatch<SetStateAction<AuthPage>>;
  onRegisterPopup?: boolean
}> = ({ toLogin, setCurrentPage, onRegisterPopup }) => {
  return (
    <div
      className={clsx(
        "&_span:text-200 &_span:leading-[1.2] absolute left-0 flex w-full justify-center gap-2.5 sm:bottom-[30px] md:bottom-[60px]",
        onRegisterPopup ? "bottom-[94px]" : "bottom-[30px]",
      )}
    >
      <span>{toLogin ? "Уже есть аккаунт?" : "Нет аккаунта?"}</span>
      <button onClick={() => setCurrentPage(toLogin ? "LOGIN" : "REGISTER")}>
        <span className={"font-bold text-primary"}>
          {toLogin ? "Войти" : "Зарегистрироваться"}
        </span>
      </button>
    </div>
  );
};

export default AuthLayout;
