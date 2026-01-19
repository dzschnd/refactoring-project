import type { FC } from "react";

interface NamesProps {
  firstPartnerName: string;
  secondPartnerName: string;
  coupleImage: string;
  eventDate: string;
  scale: (value: number) => string;
  isMobile: boolean;
}

const NamesPreview: FC<NamesProps> = ({
  firstPartnerName,
  secondPartnerName,
  coupleImage,
  eventDate,
  scale,
  isMobile,
}) => {
  return (
    <div
      className="mx-auto flex w-full flex-col items-center font-playfair"
      style={{
        maxWidth: scale(isMobile ? 360 : 466),
        gap: scale(isMobile ? 30 : 40),
        paddingInline: scale(20),
      }}
    >
      <h1
        className="font-light text-grey-500"
        style={{
          fontSize: scale(36),
        }}
      >
        <span>{secondPartnerName}</span> <span>И</span>{" "}
        <span>{firstPartnerName}</span>
      </h1>
      <img
        src={coupleImage}
        alt="Couple"
        className="w-full object-cover"
        style={{
          width: scale(426),
          height: isMobile ? scale(480) : scale(600),
        }}
      />
      <div className="relative flex w-full justify-between">
        <div
          className="absolute left-0 h-full w-1/3 border-red-700"
          style={{
            borderTopWidth: scale(1),
            borderLeftWidth: scale(1),
            borderBottomWidth: scale(1),
            borderRight: "none",
          }}
        />
        <span
          className="w-full text-center font-normal italic text-red-700"
          style={{
            fontSize: scale(32),
            height: scale(52),
          }}
        >
          {eventDate}
        </span>
        <div
          className="absolute right-0 h-full w-1/3 border-b border-r border-t border-red-700"
          style={{
            borderTopWidth: scale(1),
            borderRightWidth: scale(1),
            borderBottomWidth: scale(1),
            borderLeft: "none",
          }}
        />
      </div>
    </div>
  );
};

export default NamesPreview;
