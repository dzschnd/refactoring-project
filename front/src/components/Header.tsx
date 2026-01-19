import { useEffect, useState } from "react";
import type { FC } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../api/redux/store";
import Button from "./Button";
import { Logo } from "../assets/svg/Logo";
import { BurgerMenuIcon } from "../assets/svg/BurgerMenuIcon";
import { ProfileIcon } from "../assets/svg/ProfileIcon";
import { MobileMenu } from "./MobileMenu";
import clsx from "clsx";
import { CloseMenuIcon } from "../assets/svg/CloseMenuIcon";
import useCreateDefaultDraft from "../utils/useCreateDefaultDraft";
import AuthLayout from "../features/Auth/layouts/AuthLayout";
import type { AuthPage } from "../types";

const Header: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [currentAuthPage, setCurrentAuthPage] = useState<AuthPage>("LOGIN");

  const [loginInputValues, setLoginInputValues] = useState({
    email: "",
    password: "",
  });
  const [registerInputValues, setRegisterInputValues] = useState({
    email: "",
    password: "",
  });
  const [forgotPasswordInputValues, setForgotPasswordInputValues] = useState({
    email: "",
  });

  const { verified } = useSelector((state: RootState) => state.user);

  const createDefaultDraft = useCreateDefaultDraft();

  useEffect(() => {
    if (isMenuOpen || isAuthOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen, isAuthOpen]);

  return (
    <>
      {isMenuOpen && (
        <MobileMenu
          isAuth={verified}
          setIsMenuOpen={setIsMenuOpen}
          setIsAuthOpen={setIsAuthOpen}
        />
      )}
      {/*TODO: focus automatically (for tabbing)*/}
      {isAuthOpen && (
        <AuthLayout
          setIsAuthOpen={setIsAuthOpen}
          currentPage={currentAuthPage}
          setCurrentPage={setCurrentAuthPage}
          loginInputValues={loginInputValues}
          setLoginInputValues={setLoginInputValues}
          registerInputValues={registerInputValues}
          setRegisterInputValues={setRegisterInputValues}
          forgotPasswordInputValues={forgotPasswordInputValues}
          setForgotPasswordInputValues={setForgotPasswordInputValues}
        />
      )}
      <div
        className={clsx(
          "shadow-custom-2 fixed z-40 flex h-full max-h-[56px] w-full items-center justify-between px-4 md:max-h-[60px]",
          isMenuOpen ? "bg-white" : "backdrop-blur-[15px]",
        )}
      >
        <div className={"hidden gap-3 md:flex"}>
          <Link to={"/"}>
            <Button
              borderRadius={42}
              message={"ГЛАВНАЯ"}
              className={"h-[36px] px-[24px] text-300"}
            />
          </Link>
          <Link to={"/catalog"}>
            <Button
              borderRadius={42}
              message={"КАТАЛОГ"}
              className={"h-[36px] px-[24px] text-300"}
            />
          </Link>
          <Link to={"/blog"}>
            <Button
              borderRadius={42}
              message={"БЛОГ"}
              className={"h-[36px] px-[24px] text-300"}
            />
          </Link>
        </div>
        <div className={"flex items-center gap-4"}>
          <button
            className={clsx("md:hidden")}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <CloseMenuIcon /> : <BurgerMenuIcon />}
          </button>
          <Link to={"/"}>
            <Logo desktopWidth={108} width={76} />
          </Link>
        </div>
        <div className={"flex items-center gap-3"}>
          <Button
            borderRadius={42}
            onClick={createDefaultDraft}
            message={"СОЗДАТЬ ПРИГЛАШЕНИЕ"}
            inverted
            className={"hidden h-[36px] px-[24px] text-300 sm:block"}
          />
          <Button
            borderRadius={42}
            onClick={createDefaultDraft}
            message={"СОЗДАТЬ"}
            inverted
            className={"h-[36px] px-4 text-200 sm:hidden"}
          />

          {verified ? (
            <Link to={"/profile"} className={"hidden sm:block"}>
              <ProfileIcon />
            </Link>
          ) : (
            <Button
              borderRadius={42}
              onClick={() => setIsAuthOpen(true)}
              message={"ВОЙТИ"}
              className={"hidden h-[36px] px-4 text-300 sm:block"}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
