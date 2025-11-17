import { FC, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import goToIcon from "../../../../assetsOld/buttonIcons/arrowRight.png";
import DraftCard from "./DraftCard";
import { AppDispatch, RootState } from "../../../../api/redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteDraft,
  getAllDrafts,
} from "../../../../api/service/DraftService";
import { CardInfo } from "../../../../types";
import { getAllInvitations } from "../../../../api/service/InvitationService";

const MyDraftsPreview: FC = () => {
  const [allDrafts, setAllDrafts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDrafts().then();
  }, []);

  const fetchDrafts = async () => {
    const result = await getAllDrafts();
    setAllDrafts(result);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("УВЕРЕН?")) await deleteDraft(id);
    fetchDrafts().then();
  };

  return (
    <div className="sm:hidden">
      <button>
        <Link to="./drafts">
          <div className="flex items-center gap-[5px]">
            <h2 className="font-primary text-800 font-normal leading-[1.2] text-grey-500">
              Мои черновики
            </h2>
            <img src={goToIcon} alt="Go To My Drafts" className="h-6 w-6" />
          </div>
        </Link>
      </button>
      {allDrafts && allDrafts.length > 0 ? (
        <div className="scrollbar-hide mt-10 flex max-w-[326px] gap-10 overflow-x-scroll">
          {allDrafts.map((draft: CardInfo) => (
            <DraftCard
              key={draft.id}
              id={draft.id}
              coupleImage={draft.coupleImage}
              templateName={draft.templateName}
              firstPartnerName={
                draft.firstPartnerName ? draft.firstPartnerName : "Невеста"
              }
              secondPartnerName={
                draft.secondPartnerName ? draft.secondPartnerName : "Жених"
              }
              handleDelete={() => handleDelete(draft.id)}
            />
          ))}
        </div>
      ) : (
        <div className="mt-10 flex w-full flex-col rounded-[20px] bg-grey-50 p-5">
          <span className="font-grey-500 mb-5 text-300 font-medium">
            У вас еще нет ни одного черновика
          </span>
          <button
            onClick={() => navigate("/catalog")}
            className="h-[42px] rounded-[30px] bg-grey-300 px-[18px] font-semibold text-white"
          >
            Создать
          </button>
        </div>
      )}
    </div>
  );
};

export default MyDraftsPreview;
