import type { FC } from "react";

import type { QuestionType } from "../../../types";

import useIsMobile from "../../../hooks/useIsMobile";
import { NezhnostInvitation } from "./NezhnostInvitation";
import useCurrentDimensions from "../../../hooks/useCurrentDimensions";

export const NezhnostTemplate: FC = () => {
  const displayedFirstPartnerName = "Кирилл";
  const displayedSecondPartnerName = "Татьяна";

  const currentDate = new Date();
  const nextYearDate = new Date(currentDate);
  nextYearDate.setFullYear(currentDate.getFullYear() + 1);

  const displayedDate = nextYearDate.toISOString().split("T")[0];
  const displayedAddress =
    "г. Санкт-Петербург, Исаакиевская площадь, 7, Ресторан «EVENTESS»";
  const displayedLink = "https://yandex.ru/maps";
  const displayedPlanItems = [
    { eventTime: "15:30", description: "Сбор гостей", position: 0 },
    { eventTime: "16:00", description: "Свадебная церемония", position: 1 },
    { eventTime: "18:00", description: "Начало банкета", position: 2 },
    { eventTime: "23:00", description: "Завершение праздника", position: 3 },
  ];
  const displayedWishes = [
    {
      wish: "Главное для нас — чтобы вы были рядом в этот важный для нас день, а радость доставит любой подарок в праздничном конверте.",
      position: 0,
    },
    {
      wish: "Будем признательны за альтернативу букетам в виде бутылочки вина или другого приятного напитка и записки о событии, к которому нам приурочить ее открытие.",
      position: 1,
    },
    {
      wish: "Если вы будете выкладывать в соц.сети фотографии сделанные в день торжества, пожалуйста, используйте наш свадебный хештег.",
      position: 2,
    },
  ];
  const displayedQuestions = [
    {
      question: "Предпочтения по напиткам",
      type: QuestionType.CHECKBOX,
      position: 0,
    },
  ];
  const displayedAnswers = [
    { answer: "Шампанское", questionPosition: 0, position: 0 },
    { answer: "Шампанское", questionPosition: 0, position: 1 },
    { answer: "Шампанское", questionPosition: 0, position: 2 },
    { answer: "Шампанское", questionPosition: 0, position: 3 },
  ];
  const displayedColors = [
    { colorCode: "#EBCECA", position: 0 },
    { colorCode: "#D2A69D", position: 1 },
    { colorCode: "#A2AEBA", position: 2 },
    { colorCode: "#7C8D9D", position: 3 },
  ];

  const [screenWidth, screenHeight] = useCurrentDimensions();

  return (
    <NezhnostInvitation
      firstPartnerName={displayedFirstPartnerName}
      secondPartnerName={displayedSecondPartnerName}
      eventDate={displayedDate}
      place={{
        address: displayedAddress,
        link: displayedLink,
      }}
      colors={displayedColors}
      planItems={displayedPlanItems}
      wishes={displayedWishes}
      questions={displayedQuestions}
      answers={displayedAnswers}
      width={screenWidth}
      height={screenHeight}
      isMobile={useIsMobile()}
      isPreview={false}
      guestFormDisabled={true}
      block={"names"}
    />
  );
};
