import { NezhnostInvitation } from "../features/Templates/Nezhnost/NezhnostInvitation";
import { MinimalismInvitation } from "../features/Templates/Minimalism/MinimalismInvitation";

export const getTemplatePreview = (
  templateName: string,
  props: {
    firstPartnerName: string;
    secondPartnerName: string;
    coupleImage: string;
    eventDate: string;
    place: {
      address: string;
      placeImage: string;
      link: string;
    };
    colors: any;
    planItems: any[];
    wishes: any[];
    questions: any[];
    answers: any[];
    templateWidth: number;
    templateHeight: number;
    isMobile: boolean;
    isPreview: boolean;
    block: string;
  },
) => {
  switch (templateName) {
    case "nezhnost":
      return (
        <NezhnostInvitation
          firstPartnerName={props.firstPartnerName}
          secondPartnerName={props.secondPartnerName}
          coupleImage={props.coupleImage}
          eventDate={props.eventDate}
          place={{
            address: props.place.address,
            placeImage: props.place.placeImage,
            link: props.place.link,
          }}
          colors={props.colors}
          planItems={props.planItems}
          wishes={props.wishes}
          questions={props.questions}
          answers={props.answers}
          width={props.templateWidth}
          height={props.templateHeight}
          isMobile={props.isMobile}
          isPreview={props.isPreview}
          guestFormDisabled={true}
          block={props.block}
        />
      );
    case "minimalism":
      return (
        <MinimalismInvitation
          firstPartnerName={props.firstPartnerName}
          secondPartnerName={props.secondPartnerName}
          coupleImage={props.coupleImage}
          eventDate={props.eventDate}
          place={{
            address: props.place.address,
            placeImage: props.place.placeImage,
            link: props.place.link,
          }}
          colors={props.colors}
          planItems={props.planItems}
          wishes={props.wishes}
          questions={props.questions}
          answers={props.answers}
          width={props.templateWidth}
          height={props.templateHeight}
          isMobile={props.isMobile}
          isPreview={props.isPreview}
          guestFormDisabled={true}
          block={props.block}
        />
      );
    default:
      return <></>;
  }
};
