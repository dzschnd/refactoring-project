import { useEffect, useRef } from "react";
import type { FC } from "react";
import { useCloseOnClickOutside } from "../hooks/useCloseOnClickOutside";
import cross from "../assetsOld/buttonIcons/cross.png";

type ConfirmationModalProps = {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel: string;
  cancelLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const ConfirmationModal: FC<ConfirmationModalProps> = ({
  isOpen,
  title,
  message,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  useCloseOnClickOutside({
    popupRef: overlayRef,
    setIsPopupOpenAction: (open) => {
      if (!open) onCancel();
    },
  });

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        ref={overlayRef}
        className="relative mx-4 flex w-full max-w-[360px] flex-col gap-5 rounded-[30px] bg-white p-[30px]"
      >
        <div className="flex justify-between gap-[30px]">
          <h2 className="font-primary text-500 font-normal text-grey-500">
            {title}
          </h2>
          <button onClick={onCancel} className="flex-shrink">
            <img src={cross} alt="Close" className="h-6 max-w-6" />
          </button>
        </div>
        <p className="font-primary text-300 font-light text-grey-500">
          {message}
        </p>
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={onCancel}
            className="h-10 rounded-[30px] border-[2px] border-grey-300 px-4 font-primary text-300 font-normal text-grey-300"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className="h-10 rounded-[30px] bg-grey-300 px-4 font-primary text-300 font-normal text-white"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
