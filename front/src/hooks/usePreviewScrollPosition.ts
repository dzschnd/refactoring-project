import React, { RefObject, useEffect, useLayoutEffect, useState } from "react";

interface usePreviewScrollPositionProps {
  currentBlock: string;
  gap: number;
  paddingTop: number;
  parentRef: RefObject<HTMLDivElement>;
  namesRef: RefObject<HTMLDivElement>;
  dateRef: RefObject<HTMLDivElement>;
  placeRef: RefObject<HTMLDivElement>;
  programRef: RefObject<HTMLDivElement>;
  dresscodeRef: RefObject<HTMLDivElement>;
  wishesRef: RefObject<HTMLDivElement>;
  guestFormRef: RefObject<HTMLDivElement>;
  colors:
    | {
        colorCode: string;
        position: number;
      }[]
    | null;
  wishes:
    | {
        wish: string;
        position: number;
      }[]
    | null;
}

export function usePreviewScrollPosition({
  namesRef,
  wishes,
  colors,
  dateRef,
  dresscodeRef,
  wishesRef,
  guestFormRef,
  parentRef,
  placeRef,
  programRef,
  gap,
  currentBlock,
  paddingTop,
}: usePreviewScrollPositionProps) {
  const [namesHeight, setNamesHeight] = useState<number>(0);
  const [dateHeight, setDateHeight] = useState<number>(0);
  const [placeHeight, setPlaceHeight] = useState<number>(0);
  const [programHeight, setProgramHeight] = useState<number>(0);
  const [dresscodeHeight, setDresscodeHeight] = useState<number>(0);
  const [wishesHeight, setWishesHeight] = useState<number>(0);
  const [guestFormHeight, setGuestFormHeight] = useState<number>(0);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

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

  useLayoutEffect(() => {
    const blockRefs: { [key: string]: React.RefObject<HTMLDivElement> } = {
      names: namesRef,
      date: dateRef,
      place: placeRef,
      program: programRef,
      dresscode: dresscodeRef,
      wishes: wishesRef,
      "guest-form": guestFormRef,
    };
    const ref = blockRefs[currentBlock];
    if (ref && ref.current && parentRef.current) {
      const getGapIndex = () => {
        let index = 0;
        if (currentBlock === "names") return index;
        index++;
        if (currentBlock === "date") return index;
        index++;
        if (currentBlock === "place") return index;
        index++;
        if (currentBlock === "program") return index;
        if (colors) index++;
        if (currentBlock === "dresscode") return index;
        if (wishes) index++;
        if (currentBlock === "wishes") return index;
        index++;
        return index;
      };

      const getBlockHeight = () => {
        let height = 0;
        if (currentBlock === "names") return height;
        height += namesHeight;
        if (currentBlock === "date") return height;
        height += dateHeight;
        if (currentBlock === "place") return height;
        height += placeHeight;
        if (currentBlock === "program") return height;
        height += programHeight;
        if (currentBlock === "dresscode") return height;
        height += dresscodeHeight;
        if (currentBlock === "wishes") return height;
        height += wishesHeight;
        return height;
      };

      const scrollHeight =
        paddingTop + getBlockHeight() + getGapIndex() * gap - 12;

      parentRef.current.scrollTo({ top: scrollHeight, behavior: "auto" });
      setIsScrolled(true);
    }
  }, [
    namesHeight,
    currentBlock,
    dateHeight,
    placeHeight,
    programHeight,
    dresscodeHeight,
    wishesHeight,
    gap,
    paddingTop,
    colors,
    wishes,
    namesRef,
    dateRef,
    placeRef,
    programRef,
    dresscodeRef,
    wishesRef,
    guestFormRef,
    parentRef,
    isScrolled,
  ]);

  return isScrolled;
}
