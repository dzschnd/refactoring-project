import type { FC } from "react";

interface WishesProps {
  wishes:
    | {
        wish: string;
        position: number;
      }[]
    | null;
  scale: (value: number) => string;
  isMobile: boolean;
}

const WishesPreview: FC<WishesProps> = ({ wishes, scale, isMobile }) => {
  if (!wishes) return <></>;
  return (
    <div
      className="mx-auto flex w-full flex-col items-center font-playfair"
      style={{
        maxWidth: scale(isMobile ? 320 : 426),
        paddingInline: scale(20),
      }}
    >
      <div
        className="flex max-h-[100%] flex-col items-center"
        style={{
          gap: scale(30),
          maxWidth: scale(isMobile ? 320 : 426),
        }}
      >
        <h2
          className="font-playfair font-light text-grey-500"
          style={{
            fontSize: scale(32),
          }}
        >
          ПОЖЕЛАНИЯ
        </h2>
        <div
          className="flex max-h-[100%] flex-col items-center"
          style={{
            gap: scale(20),
          }}
        >
          {[...wishes]
            .sort((a, b) => a.position - b.position)
            .map((wish, index) => (
              <div
                key={index}
                className="flex max-h-[100%] flex-col items-center"
                style={{
                  gap: scale(20),
                  marginBottom: index === wishes.length - 1 ? scale(20) : 0,
                }}
              >
                <p
                  className="text-center font-montserrat font-light text-grey-500"
                  style={{
                    fontSize: scale(16),
                    lineHeight: scale(22),
                  }}
                >
                  {wish.wish}
                </p>
                {index !== wishes.length - 1 && (
                  <div
                    className="border-red-700"
                    style={{
                      width: scale(150),
                      borderWidth: scale(0.5),
                    }}
                  />
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default WishesPreview;
