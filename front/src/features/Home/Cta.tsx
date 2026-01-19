import type { FC } from "react";
import RoundButton from "./components/RoundButton";
import ctaImage from "../../assets/images/home/ctaImage.avif";
import { telegramLink } from "../../constants";

const Cta: FC = () => {
  return (
    <section
      className={
        "relative w-full max-w-[328px] sm:max-w-[730px] md:h-[244px] md:max-w-[650px] md:translate-x-[57px]"
      }
    >
      <h2
        className={
          "font-primary-condensed text-1100 font-bold leading-[1.2] tracking-[-0.05em] text-primary sm:flex md:block md:max-w-[381px] md:text-1200"
        }
      >
        <p className={"font-primary-condensed"}>СВЯЖИТЕСЬ&nbsp;</p>
        <p
          className={"text-right font-primary-condensed md:-translate-y-[13px]"}
        >
          С НАМИ
        </p>
      </h2>
      <div className={"flex sm:mt-[13px] sm:gap-4"}>
        <img
          alt={""}
          src={ctaImage}
          className={
            "-left-[114px] hidden h-[60px] min-w-[169px] rounded-[6px] object-cover sm:block md:absolute md:top-[73px] md:min-w-[290px]"
          }
        />
        <p
          className={
            "absolute top-[78px] max-w-[158px] text-300 font-normal leading-[1.2] text-primary sm:static sm:max-w-[359px] sm:leading-[1.4] md:absolute md:left-[289px] md:top-[13px] md:max-w-[361px] md:leading-[1.2]"
          }
        >
          Хотите заказать индивидуальный дизайн приглашения? Остались вопросы?
          Напишите нам в&nbsp;telegram и мы с радостью решим ваши проблемы!
        </p>
      </div>
      <a href={telegramLink}>
        <RoundButton
          className={
            "float-right mt-[5px] min-h-[165px] min-w-[165px] sm:absolute sm:right-0 sm:top-0 md:left-[395px] md:top-[73px]"
          }
          message={`СВЯЗАТЬСЯ В\xa0TELEGRAM`}
        />
      </a>
    </section>
  );
};

export default Cta;
