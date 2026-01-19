import { useState } from "react";
import type { FC } from "react";
import type { TemplateDresscodeProps } from "../../../../types";

export const Dresscode: FC<TemplateDresscodeProps> = ({
  colors,
  scale,
  isMobile,
}) => {
  const [hoveredColorIndex, setHoveredColorIndex] = useState<number>(-1);

  return (
    <div className={"flex flex-col items-center"} style={{ gap: scale(20) }}>
      <h2
        className={
          "font-minimalism--primary font-light leading-[1.2] text-minimalism--primary"
        }
        style={{ fontSize: scale(32) }}
      >
        Dress code
      </h2>
      <p
        className={
          "text-center font-minimalism--tertiary font-light leading-[1.6] tracking-[-0.02em] text-minimalism--primary"
        }
        style={{ fontSize: scale(16), width: scale(286) }}
      >
        Будем признательны, если при выборе нарядов вы придержитесь цветовой
        палитры нашего торжества.
      </p>

      <div className={"flex"} style={{ gap: scale(20) }}>
        {colors?.map((color, index) => (
          <div
            key={index}
            className={"flex items-center justify-center"}
            style={{
              height: scale(isMobile ? 60 : 42),
              width: scale(isMobile ? 60 : 61),
            }}
          >
            <div
              className={"shadow-dresscode-item transition-all ease-in-out"}
              onMouseOver={() => setHoveredColorIndex(index)}
              onMouseLeave={() => setHoveredColorIndex(-1)}
              style={{
                height: scale(
                  isMobile ? 60 : index === hoveredColorIndex ? 42 : 38,
                ),
                width: scale(
                  isMobile ? 60 : index === hoveredColorIndex ? 61 : 57,
                ),
                backgroundColor: color.colorCode,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
