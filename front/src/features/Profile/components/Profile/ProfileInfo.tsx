import React, { FC, useState } from "react";
import pencil from "../../../../assetsOld/editPencil.png";
import cross from "../../../../assetsOld/buttonIcons/cross.png";
import check from "../../../../assetsOld/formIcons/checkmark.svg";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../api/redux/store";
import InputField from "../../../Auth/components/InputField";
import envelopeIcon from "../../../../assetsOld/formIcons/envelope.png";
import { useForm } from "react-hook-form";
import {
  changeEmail,
  changeName,
  requestEmailChange,
} from "../../../../api/service/UserService";
import FormErrorMessage from "../../../../components/FormErrorMessage";
import OtpInput from "./OtpInput";
import { changeNameSchema, requestChangeEmailSchema } from "../../../../shared/schemas/auth";
import type { StateError } from "../../../../types";

const ProfileInfo: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [isEmailInputOpen, setIsEmailInputOpen] = useState<boolean>(false);
  const [isNameInputOpen, setIsNameInputOpen] = useState<boolean>(false);
  const [isOtpInputOpen, setIsOtpInputOpen] = useState<boolean>(false);
  const [isOtpInputLoading, setIsOtpInputLoading] = useState<boolean>(false);
  const [nameError, setNameError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [isInvalidOtpError, setIsInvalidOtpError] = useState("");
  const [isSuccessfulEmailChange, setIsSuccessfulEmailChange] = useState(false);
  const [prevOtpLength, setPrevOtpLength] = useState(0);
  const { email, name } = useSelector((state: RootState) => state.user);

  const {
    register,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<{ email: string; name: string }>({
    mode: "onSubmit",
    defaultValues: {
      email: email ? email : "",
      name: name ? name : "",
    },
  });

  const handleRequestChangeEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    const newEmail = getValues("email");
    if (!email || newEmail === email) {
      return setIsEmailInputOpen(false);
    }
    if (newEmail.trim() === "") {
      setValue("email", email);
      setIsEmailInputOpen(false);
      return;
    }
    const emailValidation = requestChangeEmailSchema.safeParse({
      currentEmail: email,
      newEmail: newEmail.trim(),
    });
    if (!emailValidation.success) {
      setEmailError(emailValidation.error.issues[0]?.message ?? "Некорректный формат почты");
      return;
    }
    setIsOtpInputLoading(true);
    const response = await dispatch(
      requestEmailChange({ currentEmail: email, newEmail: newEmail.trim() }),
    );
    setIsOtpInputLoading(false);
    if (response.meta.requestStatus === "fulfilled") {
      setIsOtpInputOpen(true);
      setEmailError("");
    } else {
      const errorPayload = response.payload as StateError | undefined;
      setEmailError(errorPayload?.message ?? "Произошла ошибка");
      setIsEmailInputOpen(false);
      setValue("email", email);
    }
  };

  const handleChangeEmail = async (otp: string) => {
    setEmailError("");
    const newEmail = getValues("email");
    if (newEmail.trim() === "") {
      setValue("email", email);
      setIsOtpInputOpen(false);
      setIsEmailInputOpen(false);
      return;
    }
    const response = await dispatch(
      changeEmail({ otp: otp, newEmail: newEmail.trim() }),
    );
    if (response.meta.requestStatus !== "fulfilled") {
      const errorPayload = response.payload as StateError | undefined;
      if (
        errorPayload?.status === 400 &&
        !isInvalidOtpError &&
        prevOtpLength < 6
      ) {
        setIsInvalidOtpError("error");
      } else if (errorPayload?.status !== 400) {
        setEmailError(errorPayload?.message ?? "Произошла ошибка");
      }
      if (email) setValue("email", email);
    } else {
      setIsSuccessfulEmailChange(true);
    }
  };

  const handleChangeName = async (e: React.FormEvent) => {
    e.preventDefault();
    setNameError("");
    const newName = getValues("name");
    if (newName.trim() === "") {
      setValue("name", name);
      setIsNameInputOpen(false);
      return;
    }
    const nameValidation = changeNameSchema.safeParse({ newName: newName.trim() });
    if (!nameValidation.success) {
      setNameError(nameValidation.error.issues[0]?.message ?? "Пожалуйста, укажите имя");
      return;
    }
    const response = await dispatch(changeName({ newName: newName.trim() }));
    if (response.meta.requestStatus !== "fulfilled") {
      const errorPayload = response.payload as StateError | undefined;
      setNameError(errorPayload?.message ?? "Произошла ошибка");
      if (name) setValue("name", name);
    }
    setIsNameInputOpen(false);
  };

  const handleCancelOtpInput = () => {
    setIsOtpInputOpen(false);
    setIsEmailInputOpen(false);
    if (email) setValue("email", email);
  };

  return (
    <div className="max-w-[367px]">
      {isOtpInputOpen && (
        <OtpInput
          setIsError={setIsInvalidOtpError}
          isSuccess={isSuccessfulEmailChange}
          setPrevOtpLength={setPrevOtpLength}
          isError={isInvalidOtpError !== ""}
          onSubmit={handleChangeEmail}
          onCancel={handleCancelOtpInput}
        />
      )}
      <h1 className="font-primary text-900 font-semibold leading-[1.21] text-grey-500">
        Личный кабинет
      </h1>
      <div className="relative mt-10 flex flex-col gap-5">
        <div className="flex gap-5">
          <span className="font-primary text-400 font-light leading-[1.4] text-grey-300">
            Имя:
          </span>
          {isNameInputOpen ? (
            <form onSubmit={handleChangeName}>
              <div className="flex gap-2.5">
                <InputField
                  {...register("name")}
                  id={"name"}
                  type={"text"}
                  placeholder={"Пользователь"}
                  icon={envelopeIcon}
                />
                <button>
                  <img src={check} alt="Edit" className="max-h-6 max-w-6" />
                </button>
                <button type={"button"}>
                  <img
                    src={cross}
                    alt="Edit"
                    className="max-h-6 max-w-6"
                    onClick={() => {
                      setValue("name", name);
                      setIsNameInputOpen(false);
                    }}
                  />
                </button>
              </div>
            </form>
          ) : (
            <div className="flex gap-2.5">
              <span className="font font-grey-500 font-primary text-400 font-normal leading-[1.4]">
                {name}
              </span>
              <button
                onClick={() => {
                  setIsNameInputOpen(true);
                  setNameError("");
                }}
              >
                <img src={pencil} alt="Edit" className="max-h-6 max-w-6" />
              </button>
            </div>
          )}
        </div>
        <div className="flex gap-5">
          <span className="font-primary text-400 font-light leading-[1.4] text-grey-300">
            Email:
          </span>
          {isEmailInputOpen ? (
            <form onSubmit={handleRequestChangeEmail}>
              <div className="flex gap-2.5">
                <InputField
                  {...register("email", {
                    pattern: {
                      value:
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: "Некорректный формат почты",
                    },
                  })}
                  id={"email"}
                  type={"email"}
                  placeholder={"murmur@eventess.ru"}
                  icon={envelopeIcon}
                  disabled={isOtpInputLoading}
                />
                <button disabled={isOtpInputLoading}>
                  <img src={check} alt="Edit" className="max-h-6 max-w-6" />
                </button>
                <button
                  type={"button"}
                  disabled={isOtpInputLoading}
                  onClick={() => {
                    setValue("email", email);
                    setIsEmailInputOpen(false);
                  }}
                >
                  <img src={cross} alt="Edit" className="max-h-6 max-w-6" />
                </button>
              </div>
            </form>
          ) : (
            <div className="flex gap-2.5">
              <span className="font font-grey-500 font-primary text-400 font-normal leading-[1.4]">
                {email}
              </span>
              <button>
                <img
                  src={pencil}
                  alt="Edit"
                  className="max-h-6 max-w-6"
                  onClick={() => {
                    setIsEmailInputOpen(true);
                    setEmailError("");
                  }}
                />
              </button>
            </div>
          )}
        </div>
        {nameError && <FormErrorMessage message={nameError} />}
        {emailError && (
          <FormErrorMessage
            className={`${nameError ? "translate-y-[200%]" : ""}`}
            message={emailError}
          />
        )}
      </div>
    </div>
  );
};

export default ProfileInfo;
