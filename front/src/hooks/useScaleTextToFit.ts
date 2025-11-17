import { RefObject, useEffect, useState } from "react";

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
  }, [textRef, baseFontSize, maxWidth, scaleToNumber, ...texts]);

  return fontSize;
}
