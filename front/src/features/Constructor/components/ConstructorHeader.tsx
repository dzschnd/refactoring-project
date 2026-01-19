import { useRef, useState } from "react";
import type { FC } from "react";
import logo from "../../../assetsOld/brand/logo.png";
import logoHeart from "../../../assetsOld/brand/logoHeart.png";
import cloudIcon from "../../../assetsOld/cloudIcon.png";
import profile from "../../../assetsOld/navIcons/profile.png";
import { Link, useNavigate } from "react-router-dom";
import PreviewToggle from "./ConstructorPreview/PreviewToggle";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../api/redux/store";
import { publishDraft, validateDraft } from "../../../api/service/DraftService";
import cross from "../../../assetsOld/buttonIcons/cross.png";
import { useCloseOnClickOutside } from "../../../hooks/useCloseOnClickOutside";
import type { StateError } from "../../../types";
import ConfirmationModal from "../../../components/ConfirmationModal";

interface ConstructorHeaderProps {
  isMobile: boolean;
  setIsMobile: (isMobile: boolean) => void;
}

const ConstructorHeader: FC<ConstructorHeaderProps> = ({
  isMobile,
  setIsMobile,
}) => {
  const { loading, error, id } = useSelector((state: RootState) => state.draft);
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [showOverlay, setShowOverlay] = useState(false);
  const [showPublishConfirm, setShowPublishConfirm] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  useCloseOnClickOutside({
    popupRef: overlayRef,
    setIsPopupOpenAction: setShowOverlay,
  });

  const onValidate = async () => {
    const response = await validateDraft({ id });
    const error = response as StateError | undefined;
    if (error?.status === 400) {
      const details = error.details
        ?.map((detail) => detail.message)
        .filter(Boolean);
      setValidationErrors(
        details && details.length > 0 ? details : [error.message],
      );
      setShowOverlay(true);
    } else {
      setShowPublishConfirm(true);
    }
  };

  const confirmPublish = async () => {
    setShowPublishConfirm(false);
    const response = await dispatch(publishDraft({ id }));
    if (response.meta.requestStatus === "fulfilled") {
      navigate(`../../invitations/${id}`);
    }
  };

  return (
    <>
      {showOverlay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div
            ref={overlayRef}
            className="relative mx-4 flex max-w-[328px] flex-col gap-5 rounded-[30px] bg-white p-[30px]"
          >
            <div className="flex justify-between gap-[30px]">
              <h2 className="font-primary text-500 font-normal text-grey-500">
                Предпросмотр перед публикацией
              </h2>
              <button
                onClick={() => setShowOverlay(false)}
                className="flex-shrink"
              >
                <img src={cross} alt="Close" className="h-6 max-w-6" />
              </button>
            </div>
            <p className="font-primary text-300 font-light text-grey-500">
              У вас не заполнены некоторые поля, это может привести к ошибкам
              отображения приглашения:
            </p>
            <ul className="text-error text-left text-300">
              {validationErrors.map((error, index) => (
                <li className={"list-inside list-disc"} key={index}>
                  {error}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      <ConfirmationModal
        isOpen={showPublishConfirm}
        title="Публикация приглашения"
        message="Оплата пока не подключена — это заглушка. Нажимая «Опубликовать», вы разместите приглашение в демо-режиме."
        confirmLabel="Опубликовать"
        cancelLabel="Отмена"
        onConfirm={confirmPublish}
        onCancel={() => setShowPublishConfirm(false)}
      />

      <div className="relative flex h-full max-h-[84px] items-center justify-center bg-white px-[16px] shadow-header sm:px-[30px] sm:py-[22px]">
        <div className="absolute left-[16px] flex gap-[15px] sm:left-[30px]">
          <Link to={"/"} className="sm:hidden">
            <img src={logoHeart} alt="EVENTESS" className="h-[24px] w-[24px]" />
          </Link>
          <Link to={"/"} className="hidden sm:block">
            <img src={logo} alt="EVENTESS" className="h-[20px] w-[132px]" />
          </Link>
          <div className="relative">
            <div className="absolute top-1/2 flex -translate-y-1/2 items-center gap-[5px]">
              <img src={cloudIcon} alt="" className="h-[16px] w-[16px]" />
              <span className="font-primary text-200 font-normal text-grey-400">
                {error
                  ? error.message
                  : loading
                    ? "Сохранение..."
                    : "Сохранено"}
              </span>
            </div>
          </div>
        </div>
        <div className="hidden md:block">
          <PreviewToggle isMobile={isMobile} setIsMobile={setIsMobile} />
        </div>
        <div className="absolute right-[16px] flex items-center justify-end gap-[15px] sm:right-[30px]">
          <a
            href="/constructor/preview"
            className="hidden sm:block"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="h-10 w-[155px] rounded-[30px] border-[2px] border-grey-300 bg-white font-primary text-400 font-normal text-grey-300">
              Предпросмотр
            </button>
          </a>
          <button
            onClick={onValidate}
            className="h-10 w-[155px] rounded-[30px] bg-grey-300 font-primary text-400 font-normal text-white"
          >
            Опубликовать
          </button>
          <Link to={"/profile"}>
            <img src={profile} alt="Profile" className="h-[24px] w-[24px]" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default ConstructorHeader;
