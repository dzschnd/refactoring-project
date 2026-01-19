import type { FC } from "react";

interface ProgramProps {
  planItems: {
    eventTime: string;
    description: string;
    position: number;
  }[];
  scale: (value: number) => string;
  isMobile: boolean;
}

const ProgramPreview: FC<ProgramProps> = ({ planItems, scale, isMobile }) => {
  return (
    <div
      className="flex w-full flex-col items-center font-playfair"
      style={{
        gap: scale(30),
        maxWidth: scale(isMobile ? 320 : 426),
        paddingInline: scale(20),
      }}
    >
      <h2
        className="font-light text-grey-500"
        style={{
          fontSize: scale(32),
        }}
      >
        ПРОГРАММА
      </h2>
      <div
        className="flex w-full flex-col"
        style={{
          minWidth: scale(342),
          gap: scale(10),
        }}
      >
        {[...planItems]
          .sort((a, b) => a.position - b.position)
          .map((planItem, index) => (
            <div
              key={index}
              className="flex font-montserrat"
              style={{
                gap: scale(20),
                marginBottom: index === planItems.length - 1 ? scale(20) : 0,
              }}
            >
              <span
                className="flex w-full items-center justify-end bg-red-700 font-normal text-white"
                style={{
                  maxWidth: scale(170),
                  fontSize: scale(20),
                  paddingRight: scale(16),
                  paddingTop: scale(16),
                  paddingBottom: scale(16),
                }}
              >
                {planItem.eventTime}
              </span>
              <p
                className="flex w-1/2 break-after-all items-center whitespace-normal font-light text-grey-500"
                style={{
                  fontSize: scale(16),
                  paddingLeft: scale(10),
                }}
              >
                {planItem.description}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProgramPreview;
