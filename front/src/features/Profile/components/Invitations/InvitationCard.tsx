import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { getInvitation } from "../../../../api/service/InvitationService";
import redVelvetDefaultImage from "../../../../assetsOld/templates/redVelvet/namesImage.png";

interface InvitationCardProps {
  id: number;
  templateName: string;
  coupleImage: string | null;
  firstPartnerName: string;
  secondPartnerName: string;
}

const InvitationCard: FC<InvitationCardProps> = ({
  id,
  coupleImage,
  templateName,
  firstPartnerName,
  secondPartnerName,
}) => {
  const navigate = useNavigate();

  const backgroundImageUrl = coupleImage
    ? "https://pub-6a9646833fc24b188cbc779464f80132.r2.dev" +
      coupleImage.split(".com")[1]
    : templateName === "red_velvet"
      ? redVelvetDefaultImage
      : redVelvetDefaultImage;

  return (
    <div className="relative flex h-[428px] w-[267px] flex-col gap-[20px] rounded-[20px] bg-grey-50 bg-cover bg-no-repeat pb-[20px] pt-[43px] sm:h-[425.4px] sm:w-[222px] md:h-[606px] md:w-[273px] md:bg-[transparent] md:pt-0">
      <div
        className="relative mx-[27px] h-full rounded-[20px] bg-cover bg-center bg-no-repeat sm:mx-[23.5px] md:mx-[23px]"
        style={{
          backgroundImage: `url(${backgroundImageUrl})`,
        }}
      ></div>
      <span className="text-center font-primary text-400 font-light leading-[1.4]">
        {firstPartnerName} и {secondPartnerName}
      </span>
      <div className="flex flex-col items-center justify-center gap-[18px] px-[27px] sm:gap-3 sm:px-[12px] md:px-[23px]">
        <button
          onClick={() => navigate(`/profile/guest-answers`, { state: { id } })}
          className="h-[41px] w-full rounded-[42px] bg-grey-300 font-primary text-400 font-normal leading-[1.5] text-white"
        >
          Ответы гостей
        </button>
        <button
          onClick={() => window.open(`/invitations/${id}`, "_blank")}
          className="h-[41px] w-full rounded-[42px] border-[1px] border-grey-300 font-primary text-400 font-normal leading-[1.5] text-grey-300 sm:w-[227px] sm:max-w-[107px] md:max-w-full"
        >
          Открыть
        </button>
      </div>
    </div>
  );
};

export default InvitationCard;
