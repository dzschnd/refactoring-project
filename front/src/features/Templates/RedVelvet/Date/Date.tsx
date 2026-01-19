import type { FC } from "react";
import dateImage from "../../../../assetsOld/templates/redVelvet/dateImage.png";

interface DateProps {
  eventDate: string;
}
const Date: FC<DateProps> = ({ eventDate }) => {
  return (
    <div className="flex w-full flex-col gap-[100px]">
      <div className="flex flex-col items-center gap-5 bg-red-700 px-4 py-12 text-center text-white">
        <h2 className="font-playfair text-900 font-normal">Друзья и родные!</h2>
        <p className="max-w-[320px] font-montserrat text-400 font-normal">
          Cкоро в нашей жизни состоится важное событие — мы официально станем
          семьей!
        </p>
      </div>
      <div className="flex items-center justify-center gap-5 px-5 md:gap-[30px]">
        <div className="flex max-w-[150px] flex-col gap-3 text-center font-montserrat text-300 font-normal text-red-700 md:max-w-[168px] md:text-400">
          <p className={"leading-[1.2]"}>
            Мы будем очень рады видеть вас на нашем торжестве!
          </p>
          <div className="h-[1px] bg-red-700" />
          <p className={"leading-[1.2]"}>
            <span className="font-playfair text-600 font-normal leading-[1.4]">
              {eventDate}
            </span>
            <br />
            день нашей свадьбы
          </p>
        </div>
        <img
          src={dateImage}
          alt={""}
          className="w-full max-w-[150px] md:max-w-[228px]"
        />
      </div>
    </div>
  );
};

export default Date;
