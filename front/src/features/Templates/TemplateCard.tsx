import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../api/redux/hooks";
import { createDraft } from "../../api/service/DraftService";
import Button from "../../components/Button";
import type { StateError } from "../../types";

interface TemplateCardProps {
  name: string;
  displayedName: string;
  link: string;
  price: number;
  previewImage: string;
}

const TemplateCard: FC<TemplateCardProps> = ({
  name,
  displayedName,
  link,
  price,
  previewImage,
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleChooseTemplate = async () => {
    const response = await dispatch(createDraft({ templateName: name }));
    const error = response.payload as StateError | undefined;
    if (error?.status === 403) {
      navigate("/login");
    }
    if (response.meta.requestStatus === "fulfilled")
      navigate("/constructor/names");
  };

  return (
    <div className="flex flex-col items-center px-3 sm:px-[14px] md:px-[22.5px]">
      <img
        alt={`${name}Preview`}
        src={previewImage}
        className={
          "mb-3 min-h-[254px] w-[158px] sm:min-h-[350px] sm:w-[171.03px] md:min-h-[400px] md:w-[195px]"
        }
      />
      <div
        className={
          "mb-3 flex w-full flex-col items-center gap-2 sm:flex-row sm:justify-between"
        }
      >
        <span className="text-300 font-normal leading-[1.4] text-grey-500 sm:text-400">
          {displayedName}
        </span>
        <span className="text-300 font-bold leading-[1.4] text-grey-500 sm:text-400">
          {price?.toLocaleString("ru")}₽
        </span>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row [&>*]:h-[30px] [&>*]:w-[134px] [&>*]:px-0 [&>*]:text-200 [&>*]:sm:h-[36px] [&>*]:sm:w-[97px] [&>*]:sm:font-normal [&>*]:md:w-[118.5px] [&>*]:md:text-300">
        <Button
          borderRadius={42}
          message={"Демоверсия"}
          onClick={() => window.open(link, "_blank")}
        />
        <Button
          borderRadius={42}
          message={"В конструктор"}
          inverted
          onClick={() => {
            void handleChooseTemplate();
          }}
        />
      </div>
    </div>
  );
};

export default TemplateCard;
