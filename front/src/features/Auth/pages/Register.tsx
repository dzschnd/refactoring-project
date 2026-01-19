import { useEffect, useState } from "react";
import type { Dispatch, FC, SetStateAction } from "react";
import type { AuthPage, StateError } from "../../../types";
import { useAppDispatch } from "../../../api/redux/hooks";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { registerUser } from "../../../api/service/UserService";
import { EMAIL_TAKEN, SERVER_ERROR } from "../../../api/messages";
import Input from "../../../components/Input";
import { EmailIcon } from "../../../assets/svg/EmailIcon";
import { Password } from "../../../assets/svg/auth/Password";
import LinkToLoginOrRegister from "../components/LinkToLoginOrRegister";
import { Link } from "react-router-dom";
import { Tooltip } from "../../../components/Tooltip";
import useIsMobile from "../../../hooks/useIsMobile";
import SubmitButton from "../components/SubmitButton";
import Loader from "../../../components/Loader";
import { registerSchema } from "../../../shared/schemas/auth";

type RegisterProps = {
  setCurrentPage: Dispatch<SetStateAction<AuthPage>>;
  inputValues: { email: string; password: string };
  setInputValues: Dispatch<SetStateAction<{ email: string; password: string }>>;
  setIsWidePopup: Dispatch<SetStateAction<boolean>>;
};

type FormInput = z.infer<typeof registerSchema>;

export const Register: FC<RegisterProps> = ({
  setCurrentPage,
  setInputValues,
  inputValues,
  setIsWidePopup,
}) => {
  const dispatch = useAppDispatch();
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined,
  );
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInput>({
    mode: "onTouched",
    shouldFocusError: true,
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: inputValues.email,
      password: "",
    },
  });

  const {
    ref: emailRef,
    onChange: emailOnChange,
    onBlur: emailOnBlur,
    name: emailName,
  } = register("email");

  const {
    ref: passwordRef,
    onChange: passwordOnChange,
    onBlur: passwordOnBlur,
    name: passwordName,
  } = register("password");

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    setLoading(true);
    setIsWidePopup(true);
    const response = await dispatch(
      registerUser({
        email: data.email,
        password: data.password,
      }),
    );
    setLoading(false);
    setIsWidePopup(false);
    if (response.meta.requestStatus === "fulfilled") {
      setCurrentPage("REGISTER_OTP_INPUT");
      return;
    }
    const error = response.payload as StateError | undefined;
    setErrorMessage(error?.status === 400 ? EMAIL_TAKEN : SERVER_ERROR);
  };

  const isMobile = useIsMobile();

  useEffect(() => {
    reset(inputValues);
  }, [inputValues, reset]);

  return (
    <div>
      {loading ? (
        <div
          className={
            "h-[270px] sm:h-[194px] sm:w-[406px] md:mb-[163.5px] md:h-min md:w-full"
          }
        >
          <h1 className="mb-4 text-center font-primary-condensed text-800 font-bold leading-[1] text-primary sm:text-900">
            Отправляем вам код
          </h1>
          <p className={"mb-[86px] text-center text-300 leading-[1.2] sm:mb-4"}>
            Обычно это занимает пару секунд
          </p>
          <div className={"flex justify-center"}>
            <Loader />
          </div>
          <div className={"md:block"}>
            <LinkToLoginOrRegister
              toLogin={true}
              setCurrentPage={setCurrentPage}
            />
          </div>
          <LinkToLoginOrRegister
            toLogin={true}
            setCurrentPage={setCurrentPage}
          />
        </div>
      ) : (
        <div
          className={"h-[433px] sm:h-[457px] sm:w-[386px] md:h-full md:w-full"}
        >
          <h1 className="mb-4 font-primary-condensed text-800 font-bold leading-[1] text-primary sm:text-900">
            Зарегистрироваться
          </h1>
          <p className={"mb-4 text-300 leading-[1.2]"}>
            Введите свой адрес электронной почты — и мы пришлём вам код
          </p>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="relative mb-8">
              <Input
                id="email"
                name={emailName}
                type="email"
                label={"Почта"}
                placeholder="name@example.com"
                onChange={(e) => {
                  setErrorMessage(undefined);
                  setInputValues((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }));
                  void emailOnChange(e);
                }}
                onBlur={emailOnBlur}
                ref={emailRef}
                error={errors?.email?.message || errorMessage}
                iconElement={<EmailIcon />}
              />
            </div>
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
            <SubmitButton message={"Получить код"} />
            <div
              className={
                "absolute bottom-[30px] left-0 right-0 mt-8 flex justify-center sm:static"
              }
            >
              <p className={"text-center text-200"}>
                Регистрируясь, вы принимаете условия
                <br />
                <Link
                  to={"/privacy-policy"}
                  target={"_blank"}
                  className={"font-semibold text-primary"}
                >
                  Политики конфиденциальности
                </Link>
              </p>
            </div>
          </form>
          <LinkToLoginOrRegister
            toLogin={true}
            onRegisterPopup={true}
            setCurrentPage={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
};
