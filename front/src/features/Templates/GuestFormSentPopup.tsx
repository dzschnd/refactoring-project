import type { FC, Ref } from "react";
import heart from "../../assetsOld/guestFormHeart.svg";

type GuestFormSentPopupProps = {
  popupRef: Ref<HTMLDivElement>;
  setIsPopupOpen: (value: boolean) => void;
};

export const GuestFormSentPopup: FC<GuestFormSentPopupProps> = ({
  popupRef,
  setIsPopupOpen,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-grey-700--opaque backdrop-blur-[4px]">
      <div
        ref={popupRef}
        className="flex h-[232px] w-[321px] flex-col items-center justify-center gap-5 rounded-[20px] bg-white p-[30px]"
      >
        <img alt="" src={heart} className="h-[22px] w-[28px]" />
        <div className="flex flex-col gap-2.5 text-center">
          <strong className="text-300 font-bold text-grey-500">
            Спасибо за заполнение анкеты!
          </strong>
          <p className="text-300 text-grey-500">
            Ваши ответы уже переданы молодоженам
          </p>
        </div>
        <button
          className="min-h-10 w-full rounded-[30px] bg-grey-300 text-400 font-semibold text-white"
          onClick={() => setIsPopupOpen(false)}
        >
          Хорошо!
        </button>
      </div>
    </div>
  );
};
