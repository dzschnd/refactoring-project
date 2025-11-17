import { FC } from "react";

interface PlaceProps {
  address: string;
  link: string;
  placeImage: string;
  scale: (value: number) => string;
  isMobile: boolean;
}

const PlacePreview: FC<PlaceProps> = ({
  address,
  link,
  placeImage,
  scale,
  isMobile,
}) => {
  return (
    <div
      className="mx-auto flex w-full flex-col items-center font-playfair"
      style={{
        maxWidth: scale(isMobile ? 360 : 466),
        gap: isMobile ? scale(20) : scale(30),
        paddingInline: scale(20),
      }}
    >
      <h2
        className="font-light text-grey-500"
        style={{
          fontSize: scale(32),
          marginBottom: isMobile ? scale(10) : 0,
        }}
      >
        МЕСТО ПРОВЕДЕНИЯ
      </h2>
      <img
        src={placeImage}
        alt="Place"
        className={"w-full object-cover"}
        style={{
          width: scale(426),
          height: isMobile ? scale(360) : scale(500),
        }}
      />
      <div
        className="flex flex-col text-center font-montserrat text-grey-500"
        style={{
          gap: scale(16),
          fontSize: scale(16),
        }}
      >
        <span
          className="font-light"
          style={{
            fontSize: scale(16),
          }}
        >
          Торжество состоится по адресу:
        </span>
        <p
          className="font-normal"
          style={{
            fontSize: scale(18),
          }}
        >
          {address}
        </p>
      </div>
      <a href={link} target="_blank" rel="noreferrer" className="w-full">
        <button
          className="w-full border border-red-700 text-center font-montserrat font-normal text-red-700"
          style={{
            fontSize: scale(16),
            paddingTop: scale(16),
            paddingBottom: scale(16),
          }}
        >
          Как добраться
        </button>
      </a>
    </div>
  );
};

export default PlacePreview;
