import type { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import goToIcon from "../../../../assetsOld/buttonIcons/arrowRight.png";
import DraftCard from "./DraftCard";
import { deleteDraft } from "../../../../api/service/DraftService";
import type { CardInfo } from "../../../../types";
import { useDrafts } from "../../../../hooks/useDrafts";
import Loader from "../../../../components/Loader";
import ConfirmationModal from "../../../../components/ConfirmationModal";
import { useState } from "react";

const MyDraftsPreview: FC = () => {
  const { drafts, loading, refresh } = useDrafts();
  const navigate = useNavigate();
  const [draftToDelete, setDraftToDelete] = useState<number | null>(null);

  const handleDelete = (id: number) => {
    setDraftToDelete(id);
  };

  const confirmDelete = async () => {
    if (draftToDelete === null) return;
    await deleteDraft(draftToDelete);
    setDraftToDelete(null);
    void refresh();
  };

  return (
    <div className="sm:hidden">
      <ConfirmationModal
        isOpen={draftToDelete !== null}
        title="Удалить черновик?"
        message="Черновик будет удалён, это действие нельзя отменить."
        confirmLabel="Удалить"
        cancelLabel="Отмена"
        onConfirm={confirmDelete}
        onCancel={() => setDraftToDelete(null)}
      />
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
      {loading ? (
        <div className="mt-10 flex w-full justify-center">
          <Loader />
        </div>
      ) : drafts && drafts.length > 0 ? (
        <div className="scrollbar-hide mt-10 flex max-w-[326px] gap-10 overflow-x-scroll">
          {drafts.map((draft: CardInfo) => (
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
