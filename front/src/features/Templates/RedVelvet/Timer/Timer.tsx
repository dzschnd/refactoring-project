import { useEffect, useState } from "react";
import type { FC } from "react";
import timerImage from "../../../../assetsOld/templates/redVelvet/timerImage.png";
import heart from "../../../../assetsOld/templates/redVelvet/heart.png";
import { getTimeUntilDate } from "../../../../utils/dateUtils";

interface TimerProps {
  eventDate: string | null;
}

const Timer: FC<TimerProps> = ({ eventDate }) => {
  const [timeLeft, setTimeLeft] = useState(getTimeUntilDate(eventDate));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft(getTimeUntilDate(eventDate));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft, eventDate]);

  return (
    <div className="flex flex-col items-center px-5 font-playfair">
      <div className="relative mb-[120px]">
        <div className="absolute w-full text-center font-playfair font-normal text-white">
          <h2 className="pt-[60px] text-900">ДО СВАДЬБЫ</h2>
          <h3 className="text-800">
            <span>осталось</span>
            <br />
            <span className="text-900">{timeLeft.days}</span>
            <span> дней</span>
            <br />
            <span className="text-900">{timeLeft.hours}</span>
            <span> часов</span>
            <br />
            <span className="text-900">{timeLeft.minutes}</span>
            <span> минут</span>
            <br />
            <span className="text-900">{timeLeft.seconds}</span>
            <span> секунд</span>
          </h3>
        </div>
        <img
          src={timerImage}
          alt={""}
          className="w-full max-w-[320px] md:max-w-[366px]"
        />
      </div>
      <div className="mb-5 text-900 font-light text-grey-500">
        <h2 className="md:hidden">Будем Вас Ждать!</h2>
        <h2 className="hidden md:block">БУДЕМ ВАС ЖДАТЬ!</h2>
      </div>
      <img src={heart} alt={""} className="h-[40px] w-[45px]" />
    </div>
  );
};

export default Timer;
