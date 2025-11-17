import { FC } from "react";
import { PageLayout } from "../../layouts/PageLayout";
import { WineGlasses } from "../../assets/svg/WineGlasses";

type BlogProps = {};

export const Blog: FC<BlogProps> = (props) => {
  return (
    <PageLayout className={"pb-[160px] pt-[120px]"}>
      <div
        className={
          "flex w-full max-w-[330px] flex-col items-center gap-[60px] sm:max-w-[486px]"
        }
      >
        <div className={"max-w-[167px] sm:max-w-[218px] md:max-w-[251px]"}>
          <WineGlasses className="h-auto w-full" />
        </div>
        <div className={"flex flex-col gap-3"}>
          <h1
            className={
              "text-center font-primary-condensed text-600 font-bold uppercase leading-[1.2] tracking-[-0.03em] text-primary sm:text-900 md:text-950"
            }
          >
            Ой! Здесь пока немного пусто...
          </h1>
          <p
            className={
              "text-center text-300 leading-[1.4] text-primary md:text-400"
            }
          >
            Мы уже готовим для вас полезные статьи, вдохновение для приглашений
            и советы по организации мероприятий. Загляните чуть позже — будет
            интересно!
          </p>
        </div>
      </div>
    </PageLayout>
  );
};
