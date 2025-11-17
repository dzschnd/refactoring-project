import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getInvitation } from "../../api/service/InvitationService";
import { QuestionType } from "../../types";
import { NezhnostInvitation } from "./Nezhnost/NezhnostInvitation";
import useIsMobile from "../../hooks/useIsMobile";

interface InvitationData {
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
        type: QuestionType;
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

const Invitation: FC = () => {
  const { id } = useParams();
  const [invitationData, setInvitationData] = useState<InvitationData | null>(
    null,
  );

  useEffect(() => {
    const getCurrentInvitation = async () => {
      if (!id) return null;
      const data = await getInvitation(parseInt(id));
      setInvitationData(data);
      if (data.firstPartnerName && data.secondPartnerName)
        document.title = `${data.firstPartnerName} и ${data.secondPartnerName}`;
    };

    getCurrentInvitation().then();
  }, [id]);

  const displayedFirstPartnerName = invitationData?.firstPartnerName
    ? invitationData?.firstPartnerName
    : "";
  const displayedSecondPartnerName = invitationData?.secondPartnerName
    ? invitationData?.secondPartnerName
    : "";
  const displayedDate = invitationData?.eventDate
    ? invitationData?.eventDate
    : "";
  const displayedCoupleImage = invitationData?.coupleImage
    ? "https://pub-6a9646833fc24b188cbc779464f80132.r2.dev" +
      invitationData?.coupleImage.split(".com")[1]
    : undefined;
  const displayedPlaceImage =
    invitationData?.place && invitationData?.place.placeImage
      ? "https://pub-6a9646833fc24b188cbc779464f80132.r2.dev" +
        invitationData?.place.placeImage.split(".com")[1]
      : undefined;
  const displayedAddress =
    invitationData?.place && invitationData?.place.address
      ? invitationData?.place.address
      : "";
  const displayedLink =
    invitationData?.place && invitationData?.place.link
      ? invitationData?.place.link
      : "https://yandex.ru/maps";
  const displayedPlanItems = invitationData?.planItems
    ? invitationData?.planItems
    : [];
  const displayedQuestions = invitationData?.questions
    ? invitationData.questions
    : [];
  const displayedAnswers = invitationData?.answers
    ? invitationData?.answers
    : [];
  const displayedColors = invitationData?.colors ? invitationData.colors : [];
  const displayedWishes = invitationData?.wishes ? invitationData.wishes : [];

  const isMobile = useIsMobile();

  if (!id || !invitationData) return <></>;

  return (
    <div>
      <NezhnostInvitation
        block={"names"}
        width={window.innerWidth}
        height={window.innerHeight}
        isMobile={isMobile}
        firstPartnerName={displayedFirstPartnerName}
        secondPartnerName={displayedSecondPartnerName}
        coupleImage={displayedCoupleImage}
        eventDate={displayedDate}
        answers={displayedAnswers}
        questions={displayedQuestions}
        wishes={displayedWishes}
        colors={displayedColors}
        planItems={displayedPlanItems}
        place={{
          placeImage: displayedPlaceImage,
          address: displayedAddress,
          link: displayedLink,
        }}
        isPreview={false}
        guestFormDisabled={false}
      />
    </div>
  );
};

export default Invitation;
