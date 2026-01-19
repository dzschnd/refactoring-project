import type { FC } from "react";
import { useAppSelector } from "../../api/redux/hooks";
import type { PreviewProps } from "../../types";
import { getTemplatePreview } from "../../utils/getTemplatePreview";

const InvitationPreview: FC<PreviewProps> = ({
  width,
  height,
  isMobile,
  block,
}) => {
  const {
    templateName,
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
  } = useAppSelector((state) => state.draft);

  const displayedFirstPartnerName = firstPartnerName ? firstPartnerName : "";
  const displayedSecondPartnerName = secondPartnerName ? secondPartnerName : "";
  const displayedDate = eventDate ? eventDate : "";
  const displayedCoupleImage =
    coupleImage &&
    "https://pub-6a9646833fc24b188cbc779464f80132.r2.dev" +
      coupleImage.split(".com")[1];
  const displayedPlaceImage =
    place &&
    place.placeImage &&
    "https://pub-6a9646833fc24b188cbc779464f80132.r2.dev" +
      place.placeImage.split(".com")[1];
  const displayedAddress = place && place.address ? place.address : "";
  const displayedLink =
    place && place.link ? place.link : "https://yandex.ru/maps";
  const displayedPlanItems = planItems ? planItems : [];
  const displayedQuestions = questions ? questions : [];
  const displayedAnswers = answers ? answers : [];

  if (!templateName) return <></>;

  return getTemplatePreview(templateName, {
    firstPartnerName: displayedFirstPartnerName,
    secondPartnerName: displayedSecondPartnerName,
    coupleImage: displayedCoupleImage,
    eventDate: displayedDate,
    place: {
      address: displayedAddress,
      placeImage: displayedPlaceImage,
      link: displayedLink,
    },
    colors: colors,
    planItems: displayedPlanItems,
    wishes: wishes,
    questions: displayedQuestions,
    answers: displayedAnswers,
    templateWidth: width,
    templateHeight: height,
    isMobile,
    isPreview: true,
    block: block ? block : "date",
  });
};

export default InvitationPreview;
