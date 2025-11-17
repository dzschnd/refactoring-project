import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { getInvitation } from "../../../../api/service/InvitationService";
import redVelvetDefaultImage from "../../../../assetsOld/templates/redVelvet/namesImage.png";

const InvitationCardSkeleton: FC = () => {
  return (
    <div className="flex flex-col items-center gap-[20px]">
      <div className="relative h-[300px] w-[267px] rounded-2xl bg-grey-300 bg-cover bg-no-repeat px-[27px]"></div>
      <span className="bg-text-400 text-center font-primary font-light leading-[1.4]">
        Невеста и Жених
      </span>
      <div className="flex flex-col items-center gap-[15px]">
        <button className="h-[41px] w-[227px] rounded-[42px] bg-grey-300 font-primary text-400 font-normal leading-[1.5] text-white">
          Ответы гостей
        </button>
        <button className="h-[41px] w-[227px] rounded-[42px] border-[1px] border-grey-300 font-primary text-400 font-normal leading-[1.5] text-grey-300">
          Открыть
        </button>
      </div>
    </div>
  );
};

export default InvitationCardSkeleton;
