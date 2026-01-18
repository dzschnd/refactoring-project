import React, { FC, useState } from "react";
import InputLabel from "../../../Auth/components/InputLabel";
import InputField from "../../../Auth/components/InputField";
import lockIcon from "../../../../assetsOld/formIcons/lock.png";
import SubmitButton from "../../../Auth/components/SubmitButton";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AppDispatch } from "../../../../api/redux/store";
import { useDispatch } from "react-redux";
import { changePassword } from "../../../../api/service/UserService";
import FormErrorMessage from "../../../../components/FormErrorMessage";
import { WRONG_PASSWORD } from "../../../../api/messages";
import { changePasswordSchema } from "../../../../shared/schemas/auth";
import type { StateError } from "../../../../types";

type FormInput = z.infer<typeof changePasswordSchema>;

const ChangePassword: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

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
    resolver: zodResolver(changePasswordSchema),
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
      const error = result.payload as StateError | undefined;
      if (error?.status === 400) setError(WRONG_PASSWORD);
      else setError(error?.message ?? "Произошла ошибка");
    } else {
      setError("");
      const success = result.payload as { message?: string } | undefined;
      setSuccessMessage(success?.message ?? "Пароль обновлен");
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
            {...register("oldPassword")}
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
            {...register("newPassword")}
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
