import { Dispatch, FC, SetStateAction, useRef } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import { WhatsappIcon } from "../assets/svg/WhatsappIcon";
import { TelegramIcon } from "../assets/svg/TelegramIcon";
import { useCloseOnClickOutside } from "../hooks/useCloseOnClickOutside";
import useCreateDefaultDraft from "../utils/useCreateDefaultDraft";

type MobileMenuProps = {
  isAuth: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
  setIsAuthOpen: Dispatch<SetStateAction<boolean>>;
};

export const MobileMenu: FC<MobileMenuProps> = ({
  isAuth,
  setIsMenuOpen,
  setIsAuthOpen,
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  useCloseOnClickOutside({
    popupRef: overlayRef,
    setIsPopupOpenAction: setIsMenuOpen,
  });

  const createDefaultDraft = useCreateDefaultDraft();

  return (
    <div
      className={
        "fixed inset-0 z-50 mt-[56px] bg-black--opaque backdrop-blur-[4px]"
      }
    >
      <div
        ref={overlayRef}
        className={
          "flex h-full w-[259px] flex-col justify-between bg-white px-4 py-10 sm:w-[245px]"
        }
      >
        <div>
          <div
            className={
              "flex flex-col items-start gap-5 [&>*]:text-300 [&>*]:font-semibold [&>*]:uppercase [&>*]:text-primary"
            }
          >
            <Link to={"/"}>Главная</Link>
            <Link to={"/catalog"}>Каталог</Link>
            <Link to={"/blog"}>Блог</Link>
          </div>

          {isAuth && (
            <div
              className={
                "mt-8 " +
                "flex flex-col items-start gap-5 [&>*]:text-300 [&>*]:font-semibold [&>*]:uppercase [&>*]:text-primary"
              }
            >
              <Link to={"/profile"}>
                <span
                  className={"text-300 font-semibold uppercase text-primary"}
                >
                  Профиль
                </span>
              </Link>
              <Link to={"/profile/drafts"}>
                <span
                  className={"text-300 font-semibold uppercase text-primary"}
                >
                  Мои черновики
                </span>
              </Link>
              <Link to={"/profile/invitations"}>
                <span
                  className={"text-300 font-semibold uppercase text-primary"}
                >
                  Мои приглашения
                </span>
              </Link>
              <Link to={"/profile/guest-answers"}>
                <span
                  className={"text-300 font-semibold uppercase text-primary"}
                >
                  Ответы гостей
                </span>
              </Link>
            </div>
          )}
        </div>

        <div className={"flex flex-col gap-[36px]"}>
          {isAuth ? (
            <Link to={"/login"}>
              <Button
                borderRadius={42}
                message={"СОЗДАТЬ ПРИГЛАШЕНИЕ"}
                inverted
                className={"h-[36px] w-full text-200 font-semibold sm:text-300"}
              />
            </Link>
          ) : (
            <div className={"flex flex-col gap-3"}>
              <Button
                borderRadius={42}
                onClick={createDefaultDraft}
                message={"СОЗДАТЬ"}
                inverted
                className={"h-[29px] w-full text-200 font-semibold sm:text-300"}
              />
              <Button
                borderRadius={42}
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsAuthOpen(true);
                }}
                message={"ВОЙТИ"}
                className={"h-[29px] w-full text-200 font-semibold sm:text-300"}
              />
            </div>
          )}

          <div className={"flex flex-col gap-6"}>
            <div className={"flex gap-[27px]"}>
              <a href={"#"}>
                <WhatsappIcon inverted />
              </a>
              <a href={"#"}>
                <TelegramIcon inverted />
              </a>
            </div>
            <span className={"text-200 font-bold leading-[1.2] text-primary"}>
              murmur@eventess.wedding
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
