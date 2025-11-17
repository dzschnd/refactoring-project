import React, { FC } from "react";
import deleteIcon from "../../../../assetsOld/buttonIcons/deleteIcon.png";

const DraftCardSkeleton: FC = () => {
  return (
    <div className="flex flex-col items-center gap-[20px]">
      <div className="relative h-[300px] w-[267px] rounded-2xl bg-grey-300 bg-cover bg-no-repeat px-[27px]"></div>
      <span className="text-center font-primary text-400 font-light">
        Невеста и Жених
      </span>
      <div className="flex gap-[18px]">
        <button className="h-[41px] max-w-[165px] rounded-[42px] bg-grey-300 px-[22.5px] font-primary text-400 font-normal leading-[1.5] text-white md:w-[223px]">
          Редактировать
        </button>
        <button>
          <img src={deleteIcon} alt="Delete" className="h-11 min-w-11" />
        </button>
      </div>
    </div>
  );
};

export default DraftCardSkeleton;
