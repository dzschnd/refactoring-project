import { FC, useState } from "react";
import { TemplateDresscodeProps } from "../../../../types";

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
          "font-nezhnost--primary font-normal leading-[1.2] text-grey-500"
        }
        style={{ fontSize: scale(32) }}
      >
        Dress code
      </h2>
      <p
        className={
          "text-center font-nezhnost--primary font-light leading-[1.6] tracking-[-0.02em] text-grey-500"
        }
        style={{ fontSize: scale(16), width: scale(286) }}
      >
        Будем признательны, если при
        <br />
        выборе нарядов вы придержитесь
        <br />
        цветовой палитры нашего торжества.
      </p>
      <div className={"flex"} style={{ gap: scale(20), maxWidth: scale(262) }}>
        {colors?.map((color, index) => (
          <div
            key={index}
            className={"flex items-center justify-center"}
            style={{
              height: scale(52),
              width: scale(52),
            }}
          >
            <div
              className={
                "absolute rounded-full shadow-[0px_2px_9.3px_0px_#40392D14] transition-all duration-500 ease-in-out"
              }
              onMouseOver={() => setHoveredColorIndex(index)}
              onMouseLeave={() => setHoveredColorIndex(-1)}
              style={{
                height: scale(index === hoveredColorIndex ? 52 : 46),
                width: scale(index === hoveredColorIndex ? 52 : 46),
                backgroundColor: color.colorCode,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
