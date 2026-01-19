import type { FC } from "react";
import dateImage from "../../../../assetsOld/templates/redVelvet/dateImage.png";

interface DateProps {
  eventDate: string;
  scale: (value: number) => string;
}

const DatePreview: FC<DateProps> = ({ eventDate, scale }) => {
  return (
    <div
      className="mx-auto flex w-full flex-col items-center font-playfair"
      style={{
        gap: scale(100),
        paddingBottom: scale(60),
      }}
    >
      <div
        className="flex flex-col items-center bg-red-700 text-center text-white"
        style={{
          gap: scale(20), // 5 * scaleFactor
          padding: `${scale(48)} ${scale(16)}`, // 12px padding (py) and 4px padding (px) scaled
        }}
      >
        <h2
          className="font-playfair font-normal"
          style={{
            fontSize: scale(32), // 2rem = 32px scaled
          }}
        >
          Друзья и родные!
        </h2>
        <p
          className="font-montserrat font-normal"
          style={{
            maxWidth: scale(320), // scaled max-width
            fontSize: scale(16), // base = 16px, so no scaling needed here
          }}
        >
          Скоро в нашей жизни состоится важное событие — мы официально станем
          семьей!
        </p>
      </div>
      <div
        className="flex items-center justify-center"
        style={{
          gap: scale(20), // 5px gap scaled
          paddingInline: scale(20),
        }}
      >
        <div
          className="flex flex-col text-center font-montserrat font-normal text-red-700"
          style={{
            maxWidth: scale(150), // scaled max-width
            gap: scale(12), // 3px gap scaled
            fontSize: scale(14), // sm size scaled (originally 14px)
          }}
        >
          <p className={"leading-[1.2]"}>
            Мы будем очень рады видеть вас на нашем торжестве!
          </p>
          <div
            style={{
              height: scale(1), // 1px height scaled
              backgroundColor: "red",
            }}
          />
          <p className={"leading-[1.2]"}>
            <span
              className="font-playfair font-normal leading-[1.4]"
              style={{
                fontSize: scale(20), // 1.25rem = 20px scaled
              }}
            >
              {eventDate}
            </span>
            <br />
            день нашей свадьбы
          </p>
        </div>
        <img
          src={dateImage}
          alt={""}
          style={{
            maxWidth: scale(150), // scaled max-width for image
          }}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default DatePreview;
