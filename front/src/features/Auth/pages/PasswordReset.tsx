import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { AuthPage } from "../../../types";
import { AppDispatch, RootState } from "../../../api/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  requestPasswordReset,
  resetPassword,
} from "../../../api/service/UserService";
import { USER_NOT_FOUND } from "../../../api/messages";
import Loader from "../../../components/Loader";
import { ArrowBack } from "../../../assets/svg/common/ArrowBack";
import Input from "../../../components/Input";
import { EmailIcon } from "../../../assets/svg/EmailIcon";
import SubmitButton from "../components/SubmitButton";
import { Password } from "../../../assets/svg/auth/Password";
import { Tooltip } from "../../../components/Tooltip";
import useIsMobile from "../../../hooks/useIsMobile";

type PasswordResetProps = {
  setCurrentPage: Dispatch<SetStateAction<AuthPage>>;
};

interface FormInput {
  password: string;
}

export const PasswordReset: FC<PasswordResetProps> = ({ setCurrentPage }) => {
  const dispatch: AppDispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined,
  );
  const [loading, setLoading] = useState<boolean>(false);
  const { email } = useSelector((state: RootState) => state.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({
    mode: "onTouched",
    shouldFocusError: true,
    defaultValues: {
      password: "",
    },
  });

  const {
    ref: passwordRef,
    onChange: passwordOnChange,
    onBlur: passwordOnBlur,
    name: passwordName,
  } = register("password", {
    required: "Пожалуйста, введите пароль",
    minLength: {
      value: 8,
      message: "Длина пароля должна быть не менее восьми символов",
    },
  });

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    const response = await dispatch(
      resetPassword({ email: email, password: data.password }),
    );
    console.log(response);
    if (response.meta.requestStatus === "fulfilled")
      setCurrentPage("PASSWORD_RESET_SUCCESS");
    else {
      setErrorMessage(response.payload.message);
    }
  };

  const isMobile = useIsMobile();

  return (
    <div
      className={
        "sm:h-[258px] sm:min-w-[386px] md:flex md:h-full md:w-full md:min-w-0 md:flex-col md:justify-center"
      }
    >
      <h1 className="mb-4 font-primary-condensed text-800 font-bold leading-[1] text-primary sm:text-900">
        Введите новый пароль
      </h1>
      <p className={"mb-4 text-300 leading-[1.2]"}>
        Придумайте новый надежный пароль
      </p>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="relative mb-8">
          <Input
            id={"password"}
            name={passwordName}
            label={"Пароль"}
            type={"password"}
            ref={passwordRef}
            placeholder={"******"}
            iconElement={<Password />}
            onChange={(e) => {
              setErrorMessage(undefined);
              void passwordOnChange(e);
            }}
            onBlur={passwordOnBlur}
            error={errors?.password?.message}
            tooltip={
              <Tooltip
                edgePosition={isMobile ? "left" : "center"}
                contents={
                  <p className={"text-200"}>
                    <span className={"font-semibold"}>
                      Советы для надёжного пароля:
                    </span>
                    <ol className={"ml-4 list-decimal"}>
                      <li>Сделайте его длинным — от 8 символов*</li>
                      <li>Смешайте буквы, цифры и символы</li>
                      <li>Не используйте личную информацию</li>
                      <li>Не повторяйте пароли для разных сайтов</li>
                      <li>Сохраняйте в менеджере паролей</li>
                    </ol>
                  </p>
                }
              />
            }
          />
        </div>
        <SubmitButton message={"Отправить"} />
      </form>
    </div>
  );
};
