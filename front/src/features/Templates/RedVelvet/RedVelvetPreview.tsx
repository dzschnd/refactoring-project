import React, { useEffect, useRef, useState } from "react";
import type { FC } from "react";
import type { QuestionTypeValue } from "../../../types";
import NamesPreview from "./Names/NamesPreview";
import DatePreview from "./Date/DatePreview";
import PlacePreview from "./Place/PlacePreview";
import DresscodePreview from "./Dresscode/DresscodePreview";
import WishesPreview from "./Wishes/WishesPreview";
import ProgramPreview from "./Program/ProgramPreview";
import GuestFormPreview from "./GuestForm/GuestFormPreview";
import TimerPreview from "./Timer/TimerPreview";
import SignaturePreview from "../Signature/SignaturePreview";

interface PreviewProps {
  firstPartnerName: string;
  secondPartnerName: string;
  coupleImage: string;
  eventDate: string;
  place: {
    address: string;
    placeImage: string;
    link: string;
  };
  colors:
    | {
        colorCode: string;
        position: number;
      }[]
    | null;
  planItems: {
    eventTime: string;
    description: string;
    position: number;
  }[];
  wishes:
    | {
        wish: string;
        position: number;
      }[]
    | null;
  questions: {
    question: string;
    type: QuestionTypeValue;
    position: number;
  }[];
  answers: {
    answer: string;
    questionPosition: number;
    position: number;
  }[];
  eventDateRaw: string;
  width: number;
  height: number;
  isMobile: boolean;
  block: string;
}

const RedVelvetPreview: FC<PreviewProps> = ({
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
  eventDateRaw,
  width,
  height,
  isMobile,
  block,
}) => {
  const baseWidth = isMobile ? 360 : 1280;
  const scaleFactor = width / baseWidth;

  const scale = (value: number) => `${value * scaleFactor}px`;

  const [namesHeight, setNamesHeight] = useState<number>(0);
  const [dateHeight, setDateHeight] = useState<number>(0);
  const [placeHeight, setPlaceHeight] = useState<number>(0);
  const [programHeight, setProgramHeight] = useState<number>(0);
  const [dresscodeHeight, setDresscodeHeight] = useState<number>(0);
  const [wishesHeight, setWishesHeight] = useState<number>(0);
  const [guestFormHeight, setGuestFormHeight] = useState<number>(0);

  const namesRef = useRef<HTMLDivElement>(null);
  const dateRef = useRef<HTMLDivElement>(null);
  const placeRef = useRef<HTMLDivElement>(null);
  const programRef = useRef<HTMLDivElement>(null);
  const dresscodeRef = useRef<HTMLDivElement>(null);
  const wishesRef = useRef<HTMLDivElement>(null);
  const guestFormRef = useRef<HTMLDivElement>(null);

  const parentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const calculateHeight = () => {
      if (namesRef.current) {
        setNamesHeight(namesRef.current.clientHeight);
      }
      if (dateRef.current) {
        setDateHeight(dateRef.current.clientHeight);
      }
      if (placeRef.current) {
        setPlaceHeight(placeRef.current.clientHeight);
      }
      if (programRef.current) {
        setProgramHeight(programRef.current.clientHeight);
      }
      if (dresscodeRef.current) {
        setDresscodeHeight(dresscodeRef.current.clientHeight);
      }
      if (wishesRef.current) {
        setWishesHeight(wishesRef.current.clientHeight);
      }
      if (guestFormRef.current) {
        setGuestFormHeight(guestFormRef.current.clientHeight);
      }
    };
    calculateHeight();
    window.addEventListener("resize", calculateHeight);
    return () => {
      window.removeEventListener("resize", calculateHeight);
    };
  });

  useEffect(() => {
    const blockRefs: { [key: string]: React.RefObject<HTMLDivElement> } = {
      names: namesRef,
      date: dateRef,
      place: placeRef,
      program: programRef,
      dresscode: dresscodeRef,
      wishes: wishesRef,
      "guest-form": guestFormRef,
    };
    const ref = blockRefs[block];
    const gap = 120 * scaleFactor;
    const paddingTop = isMobile ? 60 * scaleFactor : 90 * scaleFactor;
    if (ref && ref.current && parentRef.current) {
      const scrollHeight =
        block === "names"
          ? 0
          : block === "date"
            ? paddingTop + namesHeight + gap
            : block === "place"
              ? paddingTop + namesHeight + dateHeight + 2 * gap
              : block === "program"
                ? paddingTop + namesHeight + dateHeight + placeHeight + 3 * gap
                : block === "dresscode"
                  ? paddingTop +
                    namesHeight +
                    dateHeight +
                    placeHeight +
                    programHeight +
                    4 * gap
                  : block === "wishes"
                    ? paddingTop +
                      namesHeight +
                      dateHeight +
                      placeHeight +
                      programHeight +
                      dresscodeHeight +
                      5 * gap
                    : block === "guest-form"
                      ? paddingTop +
                        namesHeight +
                        dateHeight +
                        placeHeight +
                        programHeight +
                        dresscodeHeight +
                        wishesHeight +
                        6 * gap
                      : 0;
      parentRef.current.scrollTo({ top: scrollHeight, behavior: "smooth" });
    }
  }, [
    namesHeight,
    block,
    height,
    dateHeight,
    placeHeight,
    programHeight,
    dresscodeHeight,
    wishesHeight,
    guestFormHeight,
    scaleFactor,
    isMobile,
  ]);

  return (
    <div
      ref={parentRef}
      className="scrollbar-hide flex h-full w-full flex-col items-center overflow-y-auto overflow-x-hidden bg-beige"
      style={{
        borderRadius: scale(30),
        gap: scale(120),
        paddingBottom: isMobile ? scale(84) : scale(21),
        paddingTop: isMobile ? scale(60) : scale(90),
      }}
    >
      <div ref={namesRef} className={"w-full"}>
        <NamesPreview
          firstPartnerName={firstPartnerName}
          secondPartnerName={secondPartnerName}
          coupleImage={coupleImage}
          eventDate={eventDate}
          scale={scale}
          isMobile={isMobile}
        />
      </div>

      <div ref={dateRef} className={"w-full"}>
        <DatePreview eventDate={eventDate} scale={scale} />
      </div>

      <div ref={placeRef} className={"w-full"}>
        <PlacePreview
          address={place.address}
          link={place.link}
          placeImage={place.placeImage}
          scale={scale}
          isMobile={isMobile}
        />
      </div>

      <div ref={programRef} className={"w-full"}>
        <ProgramPreview
          planItems={planItems}
          scale={scale}
          isMobile={isMobile}
        />
      </div>

      <div ref={dresscodeRef} className={"w-full"}>
        <DresscodePreview colors={colors} scale={scale} isMobile={isMobile} />
      </div>

      <div ref={wishesRef} className={"w-full"}>
        <WishesPreview wishes={wishes} scale={scale} isMobile={isMobile} />
      </div>

      <div ref={guestFormRef} className={"w-full"}>
        <GuestFormPreview
          questions={questions}
          answers={answers}
          scale={scale}
          isMobile={isMobile}
        />
      </div>

      <TimerPreview
        eventDate={eventDateRaw}
        scale={scale}
        isMobile={isMobile}
      />

      <SignaturePreview scale={scale} isMobile={isMobile} />
    </div>
  );
};

export default RedVelvetPreview;
