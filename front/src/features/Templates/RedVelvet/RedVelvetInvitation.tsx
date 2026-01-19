import type { FC } from "react";
import Names from "./Names/Names";
import Date from "./Date/Date";
import Place from "./Place/Place";
import Program from "./Program/Program";
import Dresscode from "./Dresscode/Dresscode";
import Wishes from "./Wishes/Wishes";
import GuestForm from "./GuestForm/GuestForm";
import Signature from "../Signature/Signature";
import Timer from "./Timer/Timer";
import type { QuestionTypeValue } from "../../../types";
import { ISO2TextRu } from "../../../utils/dateUtils";
import defaultCoupleImage from "../../../assetsOld/templates/redVelvet/namesImage.png";
import defaultPlaceImage from "../../../assetsOld/templates/redVelvet/placeImage.png";

interface TemplateProps {
  guestFormDisabled: boolean;
  id: number;
  firstPartnerName: string | null;
  secondPartnerName: string | null;
  coupleImage: string | null;
  eventDate: string | null;
  place: {
    address: string | null;
    placeImage: string | null;
    link: string | null;
  } | null;
  colors:
    | {
        colorCode: string;
        position: number;
      }[]
    | null;
  planItems:
    | {
        eventTime: string;
        description: string;
        position: number;
      }[]
    | null;
  wishes:
    | {
        wish: string;
        position: number;
      }[]
    | null;
  questions:
    | {
        question: string;
        type: QuestionTypeValue;
        position: number;
      }[]
    | null;
  answers:
    | {
        answer: string;
        questionPosition: number;
        position: number;
      }[]
    | null;
}

const RedVelvetInvitation: FC<TemplateProps> = ({
  id,
  guestFormDisabled,
  firstPartnerName,
  secondPartnerName,
  coupleImage,
  eventDate,
  place,
  colors,
  planItems,
  wishes,
  questions,
  answers,
}) => {
  const displayedFirstPartnerName = firstPartnerName
    ? firstPartnerName.toUpperCase()
    : "";
  const displayedSecondPartnerName = secondPartnerName
    ? secondPartnerName.toUpperCase()
    : "";
  const displayedDate = eventDate ? ISO2TextRu(eventDate) : "";
  const displayedCoupleImage = coupleImage
    ? "https://pub-6a9646833fc24b188cbc779464f80132.r2.dev" +
      coupleImage.split(".com")[1]
    : defaultCoupleImage;
  const displayedPlaceImage =
    place && place.placeImage
      ? "https://pub-6a9646833fc24b188cbc779464f80132.r2.dev" +
        place.placeImage.split(".com")[1]
      : defaultPlaceImage;
  const displayedAddress = place && place.address ? place.address : "";
  const displayedLink =
    place && place.link ? place.link : "https://yandex.ru/maps";
  const displayedPlanItems = planItems ? planItems : [];
  const displayedQuestions = questions ? questions : [];
  const displayedAnswers = answers ? answers : [];

  return (
    <div className="flex flex-col items-center gap-[120px] bg-beige pb-[84px] pt-[60px] md:pb-[21px] md:pt-[90px]">
      <Names
        firstPartnerName={displayedFirstPartnerName}
        secondPartnerName={displayedSecondPartnerName}
        coupleImage={displayedCoupleImage}
        eventDate={displayedDate}
      />
      <Date eventDate={displayedDate} />
      <Place
        placeImage={displayedPlaceImage}
        address={displayedAddress}
        link={displayedLink}
      />
      <Program planItems={displayedPlanItems} />
      {colors && <Dresscode colors={colors} />}
      {wishes && <Wishes wishes={wishes} />}
      <GuestForm
        questions={displayedQuestions}
        answers={displayedAnswers}
        guestFormDisabled={guestFormDisabled}
        id={id}
      />
      <Timer eventDate={eventDate} />
      <Signature />
    </div>
  );
};

export default RedVelvetInvitation;
