import { z } from "zod";
const emailSchema = z.string().email("Некорректный формат почты");
const passwordSchema = z.string().min(8, "Длина пароля должна быть не менее восьми символов");
const otpSchema = z.string().regex(/^\d{6}$/, "Одноразовый код введен неверно");
export const registerSchema = z.object({
    email: emailSchema,
    password: passwordSchema,
});
export const requestOtpSchema = z.object({
    email: emailSchema,
});
export const loginSchema = z.object({
    email: emailSchema,
    password: z.string().min(1, "Пожалуйста, введите пароль"),
});
export const verifyEmailSchema = z.object({
    email: emailSchema,
    otp: otpSchema,
});
export const requestChangeEmailSchema = z.object({
    currentEmail: emailSchema,
    newEmail: emailSchema,
});
export const requestResetPasswordSchema = z.object({
    email: emailSchema,
});
export const resetPasswordSchema = z.object({
    email: emailSchema,
    password: passwordSchema,
});
export const changePasswordSchema = z.object({
    oldPassword: z.string().min(1, "Old password must not be empty"),
    newPassword: passwordSchema,
});
export const changeEmailSchema = z.object({
    otp: otpSchema,
    newEmail: emailSchema,
});
export const changeNameSchema = z.object({
    newName: z
        .string()
        .min(1, "Пожалуйста, укажите имя")
        .max(50, "Длина имени не может превышать 50 символов"),
});
export const authSchemas = {
    register: registerSchema,
    requestOtp: requestOtpSchema,
    login: loginSchema,
    verifyEmail: verifyEmailSchema,
    requestChangeEmail: requestChangeEmailSchema,
    requestResetPassword: requestResetPasswordSchema,
    resetPassword: resetPasswordSchema,
    changePassword: changePasswordSchema,
    changeEmail: changeEmailSchema,
    changeName: changeNameSchema,
};
