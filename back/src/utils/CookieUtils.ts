import type { Response } from "express";

export const setAuthCookies = (res: Response, refreshToken: string, accessToken: string): void => {
  const isSecure = process.env.COOKIE_SECURE === "true";
  const sameSite = isSecure ? "none" : "lax";
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: isSecure,
    sameSite: sameSite,
    path: "/auth/refresh",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: isSecure,
    sameSite: sameSite,
    path: "/",
    maxAge: 60 * 60 * 1000,
  });
};

export const clearAuthCookies = (res: Response): void => {
  const isSecure = process.env.COOKIE_SECURE === "true";
  const sameSite = isSecure ? "none" : "lax";
  res.cookie("refreshToken", "", {
    httpOnly: true,
    secure: isSecure,
    sameSite: sameSite,
    path: "/auth/refresh",
    maxAge: 0,
  });

  res.cookie("accessToken", "", {
    httpOnly: true,
    secure: isSecure,
    sameSite: sameSite,
    path: "/",
    maxAge: 0,
  });
};
