import React, { FC, useState } from "react";
import InputLabel from "../../../Auth/components/InputLabel";
import InputField from "../../../Auth/components/InputField";
import lockIcon from "../../../../assetsOld/formIcons/lock.png";
import SubmitButton from "../../../Auth/components/SubmitButton";
import { SubmitHandler, useForm } from "react-hook-form";
import { AppDispatch } from "../../../../api/redux/store";
import { useDispatch } from "react-redux";
import { changePassword } from "../../../../api/service/UserService";
import FormErrorMessage from "../../../../components/FormErrorMessage";
import { WRONG_PASSWORD } from "../../../../api/messages";

interface FormInput {
  oldPassword: string;
  newPassword: string;
}

const ChangePassword: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState(null);

  const {
    register,
    getValues,
    setValue,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<FormInput>({
    mode: "onSubmit",
    reValidateMode: "onBlur",
    defaultValues: {
      oldPassword: "",
      newPassword: "",
    },
  });

  const handleChangePassword: SubmitHandler<FormInput> = async () => {
    const oldPassword = getValues("oldPassword");
    const newPassword = getValues("newPassword");
    const result = await dispatch(changePassword({ oldPassword, newPassword }));
    if (result.meta.requestStatus === "rejected") {
      setSuccessMessage(null);
      if (result.payload.status === 400) setError(WRONG_PASSWORD);
      else setError(result.payload.message);
    } else {
      setError("");
      setSuccessMessage(result.payload.message);
      setValue("oldPassword", "");
      setValue("newPassword", "");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  return (
    <div className="max-w-[367px]">
      <h2 className="font-primary text-800 font-normal leading-[1.2] text-grey-500">
        Сменить пароль
      </h2>
      <form
        className="mt-[30px] flex flex-col gap-5"
        onSubmit={handleSubmit(handleChangePassword)}
        onKeyDown={handleKeyDown}
      >
        <div className="relative md:mb-[30px]">
          <InputLabel id={"oldPassword"} label={"Введите старый пароль"} />
          <InputField
            {...register("oldPassword", {
              required: "Пожалуйста, введите текущий пароль",
            })}
            onChange={() => clearErrors("oldPassword")}
            id={"oldPassword"}
            type={"password"}
            placeholder={"******"}
            icon={lockIcon}
          />
          {errors.oldPassword && (
            <FormErrorMessage message={errors.oldPassword.message} />
          )}
        </div>
        <div className="relative md:mb-[30px]">
          <InputLabel id={"newPassword"} label={"Введите новый пароль"} />
          <InputField
            {...register("newPassword", {
              required: "Пожалуйста, введите новый пароль",
              minLength: {
                value: 8,
                message: "Длина пароль должна быть не менее 8 символов",
              },
            })}
            id={"newPassword"}
            type={"password"}
            placeholder={"******"}
            icon={lockIcon}
            onChange={() => clearErrors("newPassword")}
          />

          {error && <FormErrorMessage message={error} />}
          {errors.newPassword && (
            <FormErrorMessage message={errors.newPassword.message} />
          )}
          {successMessage && <FormErrorMessage message={successMessage} />}
        </div>
        <SubmitButton
          message={"Сохранить"}
          // className="mb-0 sm:w-[124px] md:w-full"
        />
      </form>
    </div>
  );
};

export default ChangePassword;
