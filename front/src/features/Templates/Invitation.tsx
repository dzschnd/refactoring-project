import { useEffect, useState } from "react";
import type { FC } from "react";
import { useParams } from "react-router-dom";
import { getInvitation } from "../../api/service/InvitationService";
import type { InvitationDetailsResponse } from "../../shared/types";
import type { StateError } from "../../types";
import { NezhnostInvitation } from "./Nezhnost/NezhnostInvitation";
import useIsMobile from "../../hooks/useIsMobile";

const Invitation: FC = () => {
  const { id } = useParams();
  const [invitationData, setInvitationData] =
    useState<InvitationDetailsResponse | null>(null);

  useEffect(() => {
    const getCurrentInvitation = async () => {
      if (!id) return null;
      const data = await getInvitation(parseInt(id));
      const error = data as StateError | undefined;
      if (error?.status) {
        setInvitationData(null);
        return;
      }
      const invitation = data as InvitationDetailsResponse;
      setInvitationData(invitation);
      if (invitation.firstPartnerName && invitation.secondPartnerName)
        document.title = `${invitation.firstPartnerName} и ${invitation.secondPartnerName}`;
    };

    void getCurrentInvitation();
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
