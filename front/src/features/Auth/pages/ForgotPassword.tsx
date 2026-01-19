import { useEffect, useState } from "react";
import type { Dispatch, FC, SetStateAction } from "react";
import type { AuthPage, StateError } from "../../../types";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { requestPasswordReset } from "../../../api/service/UserService";
import { SERVER_ERROR, USER_NOT_FOUND } from "../../../api/messages";
import Input from "../../../components/Input";
import { EmailIcon } from "../../../assets/svg/EmailIcon";
import SubmitButton from "../components/SubmitButton";
import LinkToLoginOrRegister from "../components/LinkToLoginOrRegister";
import { ArrowBack } from "../../../assets/svg/common/ArrowBack";
import Loader from "../../../components/Loader";
import { requestResetPasswordSchema } from "../../../shared/schemas/auth";
import { useAppDispatch } from "../../../api/redux/hooks";

type ForgotPasswordProps = {
  setCurrentPage: Dispatch<SetStateAction<AuthPage>>;
  inputValues: { email: string };
  setInputValues: Dispatch<SetStateAction<{ email: string }>>;
};

type FormInput = z.infer<typeof requestResetPasswordSchema>;

export const ForgotPassword: FC<ForgotPasswordProps> = ({
  setCurrentPage,
  setInputValues,
  inputValues,
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
    resolver: zodResolver(requestResetPasswordSchema),
    defaultValues: {
      email: inputValues.email,
    },
  });

  const {
    ref: emailRef,
    onChange: emailOnChange,
    onBlur: emailOnBlur,
    name: emailName,
  } = register("email");

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    setLoading(true);
    const response = await dispatch(
      requestPasswordReset({ email: data.email }),
    );
    setLoading(false);
    if (response.meta.requestStatus === "fulfilled") {
      setCurrentPage("PASSWORD_RESET_OTP_INPUT");
      return;
    }
    const error = response.payload as StateError | undefined;
    if (error?.status === 404) {
      setErrorMessage(USER_NOT_FOUND);
      return;
    }
    setErrorMessage(error?.message ?? SERVER_ERROR);
  };

  useEffect(() => {
    reset(inputValues);
  }, [inputValues, reset]);

  return (
    <div className={"flex h-full flex-col justify-center"}>
      {loading ? (
        <div
          className={
            "h-[270px] sm:h-[194px] sm:w-[406px] md:mb-[163.5px] md:h-min md:w-full"
          }
        >
          <h1 className="mb-4 text-center font-primary-condensed text-800 font-bold leading-[1] text-primary sm:text-900">
            Отправляем вам код
          </h1>
          <p className={"mb-4 text-center text-300 leading-[1.2]"}>
            Обычно это занимает пару секунд
          </p>
          <div className={"flex justify-center"}>
            <Loader />
          </div>
          <div className={"md:block"}>
            <LinkToLoginOrRegister
              toLogin={false}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
      ) : (
        <div
          className={
            "h-[289px] sm:h-[296px] sm:w-[386px] md:flex md:h-full md:w-full md:flex-col md:justify-center"
          }
        >
          <div className={"mb-4 flex items-center gap-1"}>
            <button onClick={() => setCurrentPage("LOGIN")}>
              <ArrowBack />
            </button>
            <h1 className="font-primary-condensed text-800 font-bold leading-[1] text-primary sm:text-900">
              Восстановление пароля
            </h1>
          </div>
          <p className={"mb-4 text-300 leading-[1.2]"}>
            Введите e-mail, указанный при регистрации — мы отправим вам код для
            восстановления пароля
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
                  void emailOnChange(e);
                  setInputValues((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }));
                }}
                onBlur={emailOnBlur}
                ref={emailRef}
                error={errors?.email?.message || (errorMessage ?? "")}
                iconElement={<EmailIcon />}
              />
            </div>
            <SubmitButton message={"Получить код"} />
          </form>
          <LinkToLoginOrRegister
            toLogin={false}
            setCurrentPage={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
};
