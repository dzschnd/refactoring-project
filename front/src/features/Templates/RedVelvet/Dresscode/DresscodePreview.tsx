import type { FC } from "react";
import wishesImage from "../../../../assetsOld/templates/redVelvet/dresscodeImage.png";

interface DresscodeProps {
  colors:
    | {
        colorCode: string;
        position: number;
      }[]
    | null;
  scale: (value: number) => string;
  isMobile: boolean;
}

const DresscodePreview: FC<DresscodeProps> = ({ colors, scale, isMobile }) => {
  if (!colors) return <></>;

  return (
    <div
      className="mx-auto flex w-full flex-col items-center"
      style={{
        gap: scale(30),
        maxWidth: scale(isMobile ? 320 : 426),
        paddingInline: scale(20),
      }}
    >
      <h2
        className="font-playfair font-light text-grey-500"
        style={{
          fontSize: scale(32),
        }}
      >
        DRESS CODE
      </h2>
      <h3
        className="text-center font-montserrat font-light text-grey-500"
        style={{
          fontSize: scale(16),
        }}
      >
        Будем признательны, если при выборе нарядов вы придержитесь цветовой
        палитры нашего торжества.
      </h3>
      <div
        className="flex"
        style={{
          gap: scale(8),
        }}
      >
        {colors.map((color, index) => (
          <div
            key={index}
            style={{
              height: scale(26),
              width: scale(58),
              backgroundColor: color.colorCode,
            }}
          />
        ))}
      </div>
      <img
        src={wishesImage}
        alt={""}
        className=""
        style={{
          width: "100%",
          maxWidth: scale(426),
          maxHeight: scale(200),
          marginTop: scale(90),
        }}
      />
    </div>
  );
};

export default DresscodePreview;
