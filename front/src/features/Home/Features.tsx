import { FC } from "react";
import "../../index.css";
import FeatureElement from "./components/FeatureElement";
import { LovingHandIcon } from "../../assets/svg/LovingHandIcon";
import { ClockHeartIcon } from "../../assets/svg/ClockHeartIcon";
import { MoneyLightBulbIcon } from "../../assets/svg/MoneyLightBulbIcon";

const Features: FC = () => {
  const features = [
    {
      heading: "Обратная связь",
      description:
        "Легко отслеживайте список гостей, полученные ответы и специальные запросы в telegram, оставаясь в курсе всех организационных моментов",
      icon: <LovingHandIcon />,
    },
    {
      heading: "Экономия времени",
      description:
        "Забудьте о долгих походах в типографию. Создайте ваше приглашение за пару минут благодаря удобному интерфейсу",
      icon: <ClockHeartIcon />,
    },
    {
      heading: "Экономия средств",
      description:
        "Создание электронных приглашений обойдется значительно дешевле, чем печать и доставка бумажных открыток",
      icon: <MoneyLightBulbIcon />,
    },
    {
      heading: "Персонализация",
      description:
        "Расскажите вашу собственную историю любви через дизайн приглашения, подобранный именно под вашу свадьбу",
      icon: <LovingHandIcon />,
    },
  ];

  return (
    <section className={"max-w-[328px] sm:max-w-[730px] md:max-w-full"}>
      <h2
        className={
          "mb-4 text-center font-primary-condensed text-600 font-bold uppercase leading-[1.2] tracking-[-0.03em] text-primary sm:text-900 md:text-950"
        }
      >
        Создавайте электронные приглашения,
        <br className={"hidden sm:block"} /> отражающие вашу историю и стиль
      </h2>
      <p
        className={
          "mb-8 text-center text-300 font-normal leading-[1.4] text-primary sm:mb-[59px] md:text-400"
        }
      >
        Оставьте время для действительно важных вещей,
        <br className={"hidden sm:block"} /> создав приглашение всего за пару
        минут
      </p>
      <div
        className={
          "relative flex flex-col justify-center gap-6 sm:mb-[38px] sm:mt-[19px] sm:grid sm:grid-cols-2 sm:gap-x-[84px] sm:gap-y-[60px] md:mb-[52px] md:grid-cols-4 md:gap-x-[48.67px]"
        }
      >
        {features.map((item, index) => (
          <div key={index}>
            <FeatureElement
              icon={item.icon}
              index={index}
              heading={item.heading}
              description={item.description}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
