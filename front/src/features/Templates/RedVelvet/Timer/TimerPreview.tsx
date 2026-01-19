import { useEffect, useState } from "react";
import type { FC } from "react";
import timerImage from "../../../../assetsOld/templates/redVelvet/timerImage.png";
import heart from "../../../../assetsOld/templates/redVelvet/heart.png";
import { getTimeUntilDate } from "../../../../utils/dateUtils";

interface TimerProps {
  eventDate: string | null;
  scale: (value: number) => string;
  isMobile: boolean;
}

const TimerPreview: FC<TimerProps> = ({ eventDate, scale, isMobile }) => {
  const [timeLeft, setTimeLeft] = useState(getTimeUntilDate(eventDate));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft(getTimeUntilDate(eventDate));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft, eventDate]);

  return (
    <div
      className="flex flex-col items-center font-playfair"
      style={{ paddingInline: scale(20) }}
    >
      <div
        className="relative"
        style={{
          marginBottom: scale(120), // Corresponds to mb-[120px]
        }}
      >
        <div
          className="absolute w-full text-center font-playfair font-normal text-white"
          style={{
            paddingTop: scale(60), // Corresponds to pt-[60px]
          }}
        >
          <h2
            style={{
              fontSize: scale(32), // Corresponds to text-900 (32px)
            }}
          >
            ДО СВАДЬБЫ
          </h2>
          <h3
            style={{
              fontSize: scale(24), // Corresponds to text-800 (24px)
            }}
          >
            <span>осталось</span>
            <br />
            <span
              style={{
                fontSize: scale(32), // Corresponds to text-900 (32px)
              }}
            >
              {timeLeft.days}
            </span>
            <span> дней</span>
            <br />
            <span
              style={{
                fontSize: scale(32), // Corresponds to text-900 (32px)
              }}
            >
              {timeLeft.hours}
            </span>
            <span> часов</span>
            <br />
            <span
              style={{
                fontSize: scale(32), // Corresponds to text-900 (32px)
              }}
            >
              {timeLeft.minutes}
            </span>
            <span> минут</span>
            <br />
            <span
              style={{
                fontSize: scale(32), // Corresponds to text-900 (32px)
              }}
            >
              {timeLeft.seconds}
            </span>
            <span> секунд</span>
          </h3>
        </div>
        <img
          src={timerImage}
          alt={""}
          style={{
            maxWidth: scale(isMobile ? 320 : 366), // Corresponds to max-w-[320px] for mobile and max-w-[366px] for larger screens
            width: "100%",
          }}
        />
      </div>
      <div
        className="font-light text-grey-500"
        style={{
          marginBottom: scale(20), // Corresponds to mb-5 (20px)
          fontSize: scale(32), // Corresponds to text-900 (32px)
        }}
      >
        <h2 className={isMobile ? "" : "hidden"}>Будем Вас Ждать!</h2>
        <h2 className={isMobile ? "hidden" : ""}>БУДЕМ ВАС ЖДАТЬ!</h2>
      </div>
      <img
        src={heart}
        alt={""}
        style={{
          width: scale(45), // Corresponds to w-[45px]
          height: scale(40), // Corresponds to h-[40px]
        }}
      />
    </div>
  );
};

export default TimerPreview;
