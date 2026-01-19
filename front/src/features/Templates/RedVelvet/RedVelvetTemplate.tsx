import type { FC } from "react";
import Names from "./Names/Names";
import EventDate from "./Date/Date";
import Place from "./Place/Place";
import Program from "./Program/Program";
import Dresscode from "./Dresscode/Dresscode";
import Wishes from "./Wishes/Wishes";
import GuestForm from "./GuestForm/GuestForm";
import Signature from "../Signature/Signature";
import Timer from "./Timer/Timer";
import type { QuestionType } from "../../../types";
import { ISO2TextRu } from "../../../utils/dateUtils";
import defaultCoupleImage from "../../../assetsOld/templates/redVelvet/namesImage.png";
import defaultPlaceImage from "../../../assetsOld/templates/redVelvet/placeImage.png";

const RedVelvetTemplate: FC = () => {
  const displayedFirstPartnerName = "НЕВЕСТА";
  const displayedSecondPartnerName = "ЖЕНИХ";

  const currentDate = new Date();
  const nextYearDate = new Date(currentDate);
  nextYearDate.setFullYear(currentDate.getFullYear() + 1);
  const displayedDate = ISO2TextRu(nextYearDate.toISOString().split("T")[0]);
  const displayedCoupleImage = defaultCoupleImage;
  const displayedPlaceImage = defaultPlaceImage;
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
    { colorCode: "#FFFFFF", position: 0 },
    { colorCode: "#CC231A", position: 1 },
    { colorCode: "#821415", position: 2 },
    { colorCode: "#1C1C1C", position: 3 },
  ];

  return (
    <div className="flex flex-col items-center gap-[120px] bg-beige pb-[84px] pt-[60px] md:pb-[21px] md:pt-[90px]">
      <Names
        firstPartnerName={displayedFirstPartnerName}
        secondPartnerName={displayedSecondPartnerName}
        coupleImage={displayedCoupleImage}
        eventDate={displayedDate}
      />
      <EventDate eventDate={displayedDate} />
      <Place
        placeImage={displayedPlaceImage}
        address={displayedAddress}
        link={displayedLink}
      />
      <Program planItems={displayedPlanItems} />
      <Dresscode colors={displayedColors} />
      <Wishes wishes={displayedWishes} />
      <GuestForm
        questions={displayedQuestions}
        answers={displayedAnswers}
        guestFormDisabled={true}
        id={-1}
      />
      <Timer eventDate={new Date(2026, 7, 21).toISOString().split("T")[0]} />
      <Signature />
    </div>
  );
};

export default RedVelvetTemplate;
