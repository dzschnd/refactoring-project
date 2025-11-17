import { FC } from "react";
import { Link } from "react-router-dom";
import { Logo } from "../assets/svg/Logo";
import { WhatsappIcon } from "../assets/svg/WhatsappIcon";
import { TelegramIcon } from "../assets/svg/TelegramIcon";
import { telegramLink, whatsappLink } from "../constants";

const Footer: FC = () => {
  return (
    <div className={"bg-primary px-[30px] py-[40px]"}>
      <div
        className={
          "mb-[40px] flex flex-col items-center gap-[32px] sm:mb-[32px] sm:flex-row sm:items-start sm:justify-between"
        }
      >
        <Link to={"/"}>
          <Logo inverted width={132} desktopWidth={153.37} />
        </Link>

        <div
          className={
            "flex flex-col items-center gap-[24px] sm:items-start sm:gap-[33px]"
          }
        >
          <Link to={"/catalog"}>
            <span
              className={
                "text-400 font-semibold uppercase leading-[1.2] tracking-[-0.03em] text-white"
              }
            >
              Каталог
            </span>
          </Link>
          <Link to={"/blog"}>
            <span
              className={
                "text-400 font-semibold uppercase leading-[1.2] tracking-[-0.03em] text-white"
              }
            >
              Блог
            </span>
          </Link>
        </div>

        <div className={"flex flex-col gap-[24px]"}>
          <div className={"flex justify-center gap-[27px] sm:justify-end"}>
            <a href={whatsappLink}>
              <WhatsappIcon />
            </a>
            <a href={telegramLink}>
              <TelegramIcon />
            </a>
          </div>
          <span
            className={
              "text-400 font-semibold leading-[1.2] tracking-[-0.03em] text-white"
            }
          >
            murmur@eventess.wedding
          </span>
        </div>
      </div>
      <div className={"flex justify-center gap-2"}>
        <span
          className={
            "text-200 font-normal uppercase leading-[1.2] tracking-[-0.03em] text-white"
          }
        >
          ©
        </span>
        <span
          className={
            "text-200 font-normal uppercase leading-[1.2] tracking-[-0.03em] text-white"
          }
        >
          eventess. Все права защищены
        </span>
      </div>
    </div>
  );
};

export default Footer;
