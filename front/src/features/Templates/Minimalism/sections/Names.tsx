import { FC, useRef } from "react";
import { TemplateNamesProps } from "../../../../types";
import { useScaleTextToFit } from "../../../../hooks/useScaleTextToFit";
import clsx from "clsx";
import { Branches } from "../../../../assets/svg/templates/minimalism/Branches";

export const Names: FC<TemplateNamesProps> = ({
  firstPartnerName,
  secondPartnerName,
  scale,
  isMobile,
}) => {
  const scaleToNumber = (value: number) => {
    return parseFloat(scale(value).replace("px", ""));
  };

  const namesTextRef = useRef<HTMLHeadingElement>(null);
  const firstPartnerNameTextRef = useRef<HTMLSpanElement>(null);
  const secondPartnerNameTextRef = useRef<HTMLSpanElement>(null);

  const namesFontSize = useScaleTextToFit({
    textRef: namesTextRef,
    maxWidth: isMobile ? scaleToNumber(439) : scaleToNumber(1106),
    scaleToNumber: scaleToNumber,
    texts: [firstPartnerName, secondPartnerName],
    baseFontSize: isMobile ? 64 : 96,
  });

  return (
    <div
      className="flex flex-col items-center justify-center"
      style={{
        marginTop: isMobile ? 0 : scale(157),
        marginBottom: scale(12),
        gap: scale(20),
      }}
    >
      <div className={"hidden sm:block"}>
        <Branches width={188} />
      </div>
      {/* TODO: default names overflowing */}
      <h1
        ref={namesTextRef}
        className={clsx(
          "flex justify-center text-center",
          "[&>span]:text-minimalism--primary [&>span]:font-minimalism--primary [&>span]:font-light [&>span]:leading-[1.2]",
        )}
        style={{
          fontSize: namesFontSize,
          gap: isMobile ? scale(0) : scale(12),
          maxWidth: isMobile ? scale(330) : scale(598),
          minHeight: isMobile ? scale(439) : 0,
          whiteSpace: "nowrap",
        }}
      >
        <span
          ref={firstPartnerNameTextRef}
          className={`origin-top-right self-start`}
          style={{
            transform: isMobile
              ? `translateX(${
                  firstPartnerNameTextRef.current?.scrollWidth
                    ? -firstPartnerNameTextRef.current?.scrollWidth +
                      scaleToNumber(101)
                    : 0
                }px) rotate(-90deg)`
              : "",
          }}
        >
          {firstPartnerName}
        </span>

        <span
          className={
            "origin-center translate-x-1/3 -rotate-90 self-center sm:translate-x-0 sm:rotate-0"
          }
        >
          &
        </span>

        <span
          ref={secondPartnerNameTextRef}
          className={"origin-bottom-left self-end"}
          style={{
            transform: isMobile
              ? `translateX(${
                  secondPartnerNameTextRef.current?.scrollWidth
                    ? secondPartnerNameTextRef.current?.scrollWidth -
                      scaleToNumber(101)
                    : 0
                }px) rotate(-90deg)`
              : "",
          }}
        >
          {secondPartnerName}
        </span>
      </h1>
    </div>
  );
};
