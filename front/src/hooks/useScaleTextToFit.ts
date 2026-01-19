import { useEffect, useState } from "react";
import type { RefObject } from "react";

interface useScaleTextToFitProps {
  scaleToNumber: (value: number) => number;
  textRef: RefObject<HTMLDivElement>;
  maxWidth: number;
  texts: string[];
  baseFontSize: number;
}

export function useScaleTextToFit({
  scaleToNumber,
  textRef,
  maxWidth,
  texts,
  baseFontSize,
}: useScaleTextToFitProps) {
  const [fontSize, setFontSize] = useState(scaleToNumber(baseFontSize));

  const textsKey = texts.join("|");

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    let currentFontSize = scaleToNumber(baseFontSize);
    el.style.fontSize = `${currentFontSize}px`;

    while (el.scrollWidth > maxWidth && currentFontSize > scaleToNumber(12)) {
      currentFontSize -= 1;
      el.style.fontSize = `${currentFontSize}px`;
    }

    setFontSize(currentFontSize);
  }, [textRef, baseFontSize, maxWidth, scaleToNumber, textsKey]);

  return fontSize;
}
