import { useRef } from "react";
import type { FC } from "react";
import { Names } from "./sections/Names";
import { Place } from "./sections/Place";
import { Date as EventDate } from "./sections/Date";
import { Program } from "./sections/Program";
import { Dresscode } from "./sections/Dresscode";
import { Wishes } from "./sections/Wishes";
import { GuestForm } from "./sections/GuestForm";
import { Timer } from "./sections/Timer";
import { Signature } from "./sections/Signature";
import { MadeBy } from "../MadeBy";
import { MD_SCREEN_WIDTH, MIN_SCREEN_WIDTH } from "../../../constants";
import background from "../../../assets/images/templates/minimalism/background.avif";
import { defaultTemplateImages } from "../defaultTemplateImages";
import clsx from "clsx";
import type { TemplateProps } from "../../../types";
import { usePreviewScrollPosition } from "../../../hooks/usePreviewScrollPosition";

export const MinimalismInvitation: FC<TemplateProps> = ({
  firstPartnerName,
  secondPartnerName,
  coupleImage,
  eventDate,
  place,
  colors,
  wishes,
  questions,
  answers,
  planItems,
  width,
  height,
  isMobile,
  isPreview,
  guestFormDisabled,
  block,
  id,
}) => {
  const scaleFactor = isPreview
    ? width / (isMobile ? MIN_SCREEN_WIDTH : MD_SCREEN_WIDTH)
    : 1;
  const scale = (value: number) => `${value * scaleFactor}px`;

  const parentRef = useRef<HTMLDivElement>(null);
  const namesRef = useRef<HTMLDivElement>(null);
  const dateRef = useRef<HTMLDivElement>(null);
  const placeRef = useRef<HTMLDivElement>(null);
  const programRef = useRef<HTMLDivElement>(null);
  const dresscodeRef = useRef<HTMLDivElement>(null);
  const wishesRef = useRef<HTMLDivElement>(null);
  const guestFormRef = useRef<HTMLDivElement>(null);

  usePreviewScrollPosition({
    gap: isMobile ? 120 * scaleFactor : 140 * scaleFactor,
    paddingTop: isMobile ? 40 * scaleFactor : 0,
    currentBlock: block,
    colors: colors,
    wishes: wishes,
    wishesRef: wishesRef,
    programRef: programRef,
    parentRef: parentRef,
    placeRef: placeRef,
    guestFormRef: guestFormRef,
    dresscodeRef: dresscodeRef,
    dateRef: dateRef,
    namesRef: namesRef,
  });

  return (
    <div
      ref={parentRef}
      className={clsx(
        isPreview
          ? "h-full w-full border border-amber-600"
          : "inset-0 bg-opacity-30 bg-cover bg-fixed bg-center bg-repeat",
        "absolute overflow-x-hidden",
      )}
      style={{
        borderRadius: scale(isPreview ? 40 : 0),
        backgroundImage: `url(${background})`,
        maxWidth: `${width}px`,
        maxHeight: `${height}px`,
      }}
    >
      <div
        className={clsx(
          "flex h-full w-full flex-col items-center overflow-x-hidden",
          isPreview && "scrollbar-hide",
        )}
        style={{
          gap: isMobile ? scale(120) : scale(140),
          paddingInline: scale(15),
          paddingTop: isMobile ? scale(34) : scale(40),
        }}
      >
        <div ref={namesRef}>
          <Names
            firstPartnerName={firstPartnerName}
            secondPartnerName={secondPartnerName}
            eventDate={eventDate}
            isMobile={isMobile}
            scale={scale}
          />
        </div>
        <div ref={dateRef}>
          <EventDate
            eventDate={eventDate}
            isMobile={isMobile}
            coupleImage={
              coupleImage
                ? coupleImage
                : defaultTemplateImages.minimalismCoupleImage
            }
            scale={scale}
          />
        </div>
        <div ref={placeRef}>
          <Place
            placeImage={
              place.placeImage
                ? place.placeImage
                : defaultTemplateImages.minimalismPlaceImage
            }
            address={place.address}
            link={place.link}
            isMobile={isMobile}
            scale={scale}
          />
        </div>
        <div ref={programRef}>
          <Program planItems={planItems} isMobile={isMobile} scale={scale} />
        </div>
        {colors && (
          <div ref={dresscodeRef}>
            <Dresscode colors={colors} isMobile={isMobile} scale={scale} />
          </div>
        )}
        {wishes && (
          <div ref={wishesRef} className={"w-full"}>
            <Wishes wishes={wishes} isMobile={isMobile} scale={scale} />
          </div>
        )}
        <div ref={guestFormRef}>
          <GuestForm
            questions={questions}
            answers={answers}
            eventDate={eventDate}
            guestFormDisabled={guestFormDisabled}
            isMobile={isMobile}
            scale={scale}
            id={id ? id : -1}
          />
        </div>
        <Timer eventDate={eventDate} isMobile={isMobile} scale={scale} />
        <Signature isMobile={isMobile} scale={scale} />
        <MadeBy scale={scale} isMobile={isMobile} />
      </div>
    </div>
  );
};
