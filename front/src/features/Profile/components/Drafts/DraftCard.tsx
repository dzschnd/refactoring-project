import React, { FC } from "react";
import deleteIcon from "../../../../assetsOld/buttonIcons/deleteIcon.png";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../../../api/redux/store";
import { useDispatch } from "react-redux";
import { getDraft } from "../../../../api/service/DraftService";
import redVelvetDefaultImage from "../../../../assetsOld/templates/redVelvet/namesImage.png";

interface DraftCardProps {
  id: number;
  templateName: string;
  firstPartnerName: string | null;
  secondPartnerName: string | null;
  coupleImage: string | null;
  handleDelete: () => void;
}

const DraftCard: FC<DraftCardProps> = ({
  id,
  templateName,
  coupleImage,
  firstPartnerName,
  secondPartnerName,
  handleDelete,
}) => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const handleEdit = async () => {
    const response = await dispatch(getDraft({ id: id }));
    if (response.meta.requestStatus === "fulfilled")
      navigate("/constructor/names");
  };

  const backgroundImageUrl = coupleImage
    ? "https://pub-6a9646833fc24b188cbc779464f80132.r2.dev" +
      coupleImage.split(".com")[1]
    : templateName === "red_velvet"
      ? redVelvetDefaultImage
      : redVelvetDefaultImage;

  return (
    <div className="relative flex h-[428px] w-[267px] flex-col gap-[20px] rounded-[20px] bg-grey-50 bg-cover bg-no-repeat pb-[20px] pt-[43px] sm:h-[381px] sm:w-[222px] md:h-[606px] md:w-[273px] md:bg-[transparent] md:pt-0">
      <div
        className="relative mx-[27px] h-[428px] rounded-[20px] bg-cover bg-center bg-no-repeat sm:mx-[23.5px] md:mx-[23px]"
        style={{
          backgroundImage: `url(${backgroundImageUrl})`,
        }}
      ></div>
      <span className="text-center font-primary text-400 font-light">
        {firstPartnerName && secondPartnerName
          ? `${firstPartnerName} и ${secondPartnerName}`
          : ""}
      </span>
      <div className="flex justify-center gap-[18px] px-[27px] sm:gap-[7px] sm:px-[12px] md:gap-6 md:px-[23px]">
        <button
          onClick={handleEdit}
          className="rounded-[42px] bg-grey-300 px-4 py-3 font-primary text-400 font-normal leading-[1.5] text-white md:max-w-[223px]"
        >
          Редактировать
        </button>
        <button onClick={handleDelete}>
          <img src={deleteIcon} alt="Delete" className="h-11 min-w-11" />
        </button>
      </div>
    </div>
  );
};

export default DraftCard;
