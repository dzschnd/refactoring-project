import { useState } from "react";
import type { Dispatch, FC, SetStateAction } from "react";
import type { AuthPage, StateError } from "../../../types";
import { useAppDispatch, useAppSelector } from "../../../api/redux/hooks";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { resetPassword } from "../../../api/service/UserService";
import { SERVER_ERROR } from "../../../api/messages";
import Input from "../../../components/Input";
import SubmitButton from "../components/SubmitButton";
import { Password } from "../../../assets/svg/auth/Password";
import { Tooltip } from "../../../components/Tooltip";
import useIsMobile from "../../../hooks/useIsMobile";
import { resetPasswordSchema } from "../../../shared/schemas/auth";

type PasswordResetProps = {
  setCurrentPage: Dispatch<SetStateAction<AuthPage>>;
};

const passwordOnlySchema = resetPasswordSchema.pick({ password: true });
type FormInput = z.infer<typeof passwordOnlySchema>;

export const PasswordReset: FC<PasswordResetProps> = ({ setCurrentPage }) => {
  const dispatch = useAppDispatch();
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined,
  );
  const { email } = useAppSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({
    mode: "onTouched",
    shouldFocusError: true,
    resolver: zodResolver(passwordOnlySchema),
    defaultValues: {
      password: "",
    },
  });

  const {
    ref: passwordRef,
    onChange: passwordOnChange,
    onBlur: passwordOnBlur,
    name: passwordName,
  } = register("password");

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    if (!email) {
      setErrorMessage(SERVER_ERROR);
      return;
    }
    const response = await dispatch(
      resetPassword({ email: email, password: data.password }),
    );
    if (response.meta.requestStatus === "fulfilled")
      setCurrentPage("PASSWORD_RESET_SUCCESS");
    else {
      const error = response.payload as StateError | undefined;
      setErrorMessage(error?.message ?? SERVER_ERROR);
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
            error={errors?.password?.message ?? errorMessage}
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
