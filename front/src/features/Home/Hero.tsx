import type { FC } from "react";
import RoundButton from "./components/RoundButton";
import heroImage from "../../assets/images/home/heroImageDefault.avif";
import { Link } from "react-router-dom";

const Hero: FC = () => {
  return (
    <section className={"relative"}>
      <h1
        className={
          "mb-[24px] text-center font-playfair-display text-1000 leading-[0.59] tracking-[-0.05em] text-primary md:text-1500"
        }
      >
        save <i className={"font-playfair-display text-primary"}>the</i> date
      </h1>
      <h2
        className={
          "font--primary mb-[30px] text-center text-200 font-normal uppercase leading-[1.4] text-primary md:text-600 md:tracking-[-0.04em]"
        }
      >
        ОНЛАЙН ПРИГЛАШЕНИЯ НА ВАШУ СВАДЬБУ
      </h2>
      <div
        className={
          "relative mx-auto mb-[14px] min-h-[358px] w-[328px] sm:mb-0 sm:min-h-[400px] sm:w-[332px] md:min-h-[475px] md:w-[394px]"
        }
      >
        <img
          alt={""}
          src={heroImage}
          className={
            "absolute min-h-full min-w-full rounded-t-[300px] object-cover"
          }
        />
        <Link to={"/catalog"}>
          <RoundButton
            className={
              "absolute bottom-0 right-0 translate-y-1/2 sm:bottom-[50%] sm:translate-x-1/2 sm:translate-y-1/2"
            }
            message={"Каталог"}
          />
        </Link>
      </div>
      <div>
        <p
          className={
            "mb-2 max-w-[192px] text-200 font-normal leading-[1.4] text-primary sm:absolute sm:left-[-199px] sm:top-[215px] sm:max-w-[140px] md:left-[-369px] md:top-[298px] md:max-w-[290px] md:text-400"
          }
        >
          Легко создавайте персонализированные свадебные приглашения, которые
          очаруют ваших гостей
        </p>
        <p
          className={
            "float-right max-w-[233px] text-right text-200 font-normal leading-[1.4] text-primary sm:absolute sm:bottom-0 sm:right-[-196px] sm:max-w-[142px] md:bottom-[40px] md:right-[-360.5px] md:max-w-[290px] md:text-400"
          }
        >
          Всего пара кликов — и ваше дизайнерское свадебное приглашение оживёт
          <br className={"hidden sm:block"} />в цифровом формате
        </p>
      </div>
    </section>
  );
};

export default Hero;
