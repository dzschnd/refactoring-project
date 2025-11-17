import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { AuthPage } from "../../../types";
import { AppDispatch } from "../../../api/redux/store";
import { useDispatch } from "react-redux";
import { SubmitHandler, useForm } from "react-hook-form";
import { loginUser } from "../../../api/service/UserService";
import { setEmail } from "../../../api/redux/slices/userSlice";
import { INVALID_CREDENTIALS, SERVER_ERROR } from "../../../api/messages";
import { EmailIcon } from "../../../assets/svg/EmailIcon";
import Input from "../../../components/Input";
import { Password } from "../../../assets/svg/auth/Password";
import LinkToLoginOrRegister from "../components/LinkToLoginOrRegister";
import SubmitButton from "../components/SubmitButton";

type LoginProps = {
  setCurrentPage: Dispatch<SetStateAction<AuthPage>>;
  setIsAuthOpen: Dispatch<SetStateAction<boolean>>;
  inputValues: { email: string; password: string };
  setInputValues: Dispatch<SetStateAction<{ email: string; password: string }>>;
};

interface FormInput {
  email: string;
  password: string;
}

export const Login: FC<LoginProps> = ({
  setCurrentPage,
  setIsAuthOpen,
  inputValues,
  setInputValues,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined,
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInput>({
    mode: "onTouched",
    shouldFocusError: true,
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
  } = register("email", {
    required: "Пожалуйста, введите свою почту",
    pattern: {
      value:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: "Некорректный формат почты",
    },
  });

  const {
    ref: passwordRef,
    onChange: passwordOnChange,
    onBlur: passwordOnBlur,
    name: passwordName,
  } = register("password", {
    required: "Пожалуйста, введите пароль",
  });

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    const response = await dispatch(
      loginUser({ email: data.email, password: data.password }),
    );
    if (response.meta.requestStatus === "fulfilled") setIsAuthOpen(false);
    else if (response.payload.status === 403) {
      dispatch(setEmail(data.email));
      setCurrentPage("PASSWORD_RESET_OTP_INPUT");
    } else if (response.payload.status === 400) {
      setErrorMessage(INVALID_CREDENTIALS);
    } else {
      setErrorMessage(SERVER_ERROR);
    }
  };

  useEffect(() => {
    reset(inputValues);
  }, []);

  return (
    <div
      className={
        "flex h-[352px] flex-col sm:h-[422px] sm:min-w-[386px] sm:justify-start md:h-full md:w-full md:justify-center"
      }
    >
      <h1 className="mb-4 font-primary-condensed text-800 font-bold leading-[1] text-primary sm:text-900">
        Войти в аккаунт
      </h1>
      <p className={"mb-4 text-300 leading-[1.2] text-primary"}>
        {errorMessage}
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
              setInputValues((prev) => ({ ...prev, email: e.target.value }));
            }}
            onBlur={emailOnBlur}
            ref={emailRef}
            error={errors?.email?.message}
            iconElement={<EmailIcon />}
          />
        </div>
        <div className="relative mb-[11.5px] flex flex-col gap-[5px]">
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
          />

          <div className={"flex justify-end"}>
            <button
              type={"button"}
              onClick={() => setCurrentPage("FORGOT_PASSWORD")}
            >
              <span className={"text-200"}>Забыли пароль?</span>
            </button>
          </div>
        </div>
        <SubmitButton message={"Войти"} />
      </form>
      <LinkToLoginOrRegister toLogin={false} setCurrentPage={setCurrentPage} />
    </div>
  );
};
