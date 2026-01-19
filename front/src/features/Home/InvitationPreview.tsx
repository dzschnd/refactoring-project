import { useState } from "react";
import type { FC } from "react";
import names from "../../assets/images/home/invitationPreview/names.avif";
import place from "../../assets/images/home/invitationPreview/place.avif";
import program from "../../assets/images/home/invitationPreview/program.avif";
import dresscode from "../../assets/images/home/invitationPreview/dresscode.avif";
import wishes from "../../assets/images/home/invitationPreview/wishes.avif";
import guestForm from "../../assets/images/home/invitationPreview/guestForm.avif";
import timer from "../../assets/images/home/invitationPreview/timer.avif";
import clsx from "clsx";
import { TabButton } from "./components/TabButton";
import RoundButton from "./components/RoundButton";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./components/Carousel";
import useIsMobile from "../../hooks/useIsMobile";
import useCreateDefaultDraft from "../../utils/useCreateDefaultDraft";

const Features: FC = () => {
  const [currentBlock, setCurrentBlock] = useState<number>(0);
  const blocks = [
    { image: names, name: "Главная" },
    { image: place, name: "Место" },
    { image: program, name: "Программа" },
    { image: dresscode, name: "Дресскод" },
    { image: wishes, name: "Пожелания" },
    { image: guestForm, name: "Анкета гостя" },
    { image: timer, name: "Таймер" },
  ];

  const createDefaultDraft = useCreateDefaultDraft();
  const isMobile = useIsMobile();

  return (
    <section
      className={
        "max-w-[329px] sm:flex sm:max-w-full sm:flex-row-reverse sm:items-center sm:gap-[70px] md:gap-5"
      }
    >
      <div className={"sm:max-w-[440px] md:max-w-[580px]"}>
        <h2
          className={
            "mb-4 text-center font-primary-condensed text-600 font-bold uppercase leading-[1.2] tracking-[-0.03em] text-primary sm:mb-6 sm:text-start sm:text-900 md:text-950"
          }
        >
          Что внутри приглашения?
        </h2>
        <p
          className={
            "text-center text-300 font-normal leading-[1.4] text-primary sm:mb-8 sm:text-start md:text-400"
          }
        >
          Каждый шаблон уже содержит всю важную информацию о вашей свадьбе,
          необходимую гостям. Некоторые блоки можно вовсе удалить, если они вам
          не нужны.
        </p>

        <Carousel
          className={"sm:hidden"}
          onSwipeSelectAdd={(index) => isMobile && setCurrentBlock(index)}
        >
          <div className={"flex flex-col gap-3"}>
            <div
              className={
                "relative mt-[24px] flex w-full justify-center rounded-20 bg-primary-50 sm:bg-transparent sm:p-0"
              }
            >
              <CarouselContent>
                {blocks.map((block) => (
                  <CarouselItem>
                    <img
                      key={block.name}
                      className={clsx(
                        "mx-auto my-[30px] min-h-[308px] w-full max-w-[185px] sm:max-w-[220px] md:min-h-[565px] md:max-w-[277px]",
                      )}
                      alt={block.name}
                      src={block.image}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </div>
          </div>
          <span
            className={
              "block text-center text-300 font-normal leading-[24px] text-primary sm:hidden"
            }
          >
            {blocks[currentBlock].name}
          </span>
          <div className={"flex justify-center gap-[6px] sm:hidden"}>
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>

        <div
          className={
            "hidden flex-wrap justify-center gap-4 sm:flex md:gap-x-[30px]"
          }
        >
          {blocks.map((block, index) => (
            <TabButton
              className={clsx(
                index <= 3
                  ? "min-w-[98px] md:min-w-[118.5px]"
                  : "min-w-[118.5px]",
              )}
              isSelected={index === currentBlock}
              message={block.name}
              onClick={() => setCurrentBlock(index)}
            />
          ))}
        </div>
      </div>
      <div className={"hidden flex-col gap-3 sm:flex"}>
        <div
          className={
            "relative mt-[24px] flex w-full justify-center rounded-20 sm:mb-[69px] md:mb-[55px]"
          }
        >
          {blocks.map((block) => (
            <img
              key={block.name}
              className={clsx(
                "min-h-[308px] w-full max-w-[220px] md:min-h-[565px] md:max-w-[277px]",
                block.name !== blocks[currentBlock].name && "hidden",
              )}
              alt={block.name}
              src={block.image}
            />
          ))}
          <RoundButton
            onClick={createDefaultDraft}
            className={
              "absolute bottom-0 right-0 h-[165px] w-[165px] translate-x-1/2 translate-y-1/2 md:left-[150px] md:top-[456px] md:translate-x-0 md:translate-y-0"
            }
            message={"Создать приглашение"}
          />
        </div>
      </div>
    </section>
  );
};

export default Features;
