import { useRef } from "react";
import type { FC } from "react";
import type { TemplateNamesProps } from "../../../../types";
import { useScaleTextToFit } from "../../../../hooks/useScaleTextToFit";
import clsx from "clsx";

export const Names: FC<TemplateNamesProps> = ({
  firstPartnerName,
  secondPartnerName,
  scale,
  isMobile,
  coupleImage,
}) => {
  const scaleToNumber = (value: number) => {
    return parseFloat(scale(value).replace("px", ""));
  };

  const namesTextRef = useRef<HTMLHeadingElement>(null);

  const namesFontSize = useScaleTextToFit({
    textRef: namesTextRef,
    maxWidth: isMobile ? scaleToNumber(330) : scaleToNumber(598),
    scaleToNumber: scaleToNumber,
    texts: [firstPartnerName, secondPartnerName],
    baseFontSize: 32,
  });

  return (
    <div>
      <div
        className="flex flex-col items-center"
        style={{ marginBottom: scale(20), gap: scale(12) }}
      >
        <h2
          className="font-nezhnost--primary font-normal uppercase leading-[1.2] text-[#7C8D9D]"
          style={{ fontSize: scale(20) }}
        >
          wedding day
        </h2>
        <h1
          ref={namesTextRef}
          className={clsx(
            "flex flex-wrap justify-center overflow-x-hidden text-center [&>*]:font-nezhnost--primary [&>*]:font-normal [&>*]:leading-[1.2] [&>*]:text-grey-500",
          )}
          style={{
            fontSize: namesFontSize,
            gap: scale(12),
            maxWidth: isMobile ? scale(330) : scale(598),
            whiteSpace: "nowrap",
          }}
        >
          <span>{firstPartnerName}</span>
          <span>&</span>
          <span>{secondPartnerName}</span>
        </h1>
      </div>
      <div
        className="overflow-hidden rounded-20"
        style={{
          width: isMobile ? scale(330) : scale(598),
          height: isMobile ? scale(508) : scale(600),
        }}
      >
        <img
          className="h-full w-full object-cover transition-all duration-[600ms] ease-in-out hover:scale-105"
          alt=""
          src={coupleImage}
        />
      </div>
    </div>
  );
};
