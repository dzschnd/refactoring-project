import React, { FC, useRef, useEffect, useState, forwardRef } from "react";
import trashReverseIcon from "../../../../../assetsOld/buttonIcons/trash-reverse.png";
import trashIcon from "../../../../../assetsOld/buttonIcons/trash.png";

interface WishInputProps {
  placeholder: string;
  className?: string;
  disabled?: boolean;
  value: { wish: string; position: number } | null;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur: () => void;
  onRemove: () => void;
  index: number;
}

const WishInput: FC<WishInputProps> = forwardRef<
  HTMLTextAreaElement,
  WishInputProps
>(
  (
    {
      placeholder,
      disabled,
      className,
      value,
      onChange,
      onBlur,
      onRemove,
      index,
    },
    ref,
  ) => {
    const localRef = useRef<HTMLTextAreaElement>(null);
    const [text, setText] = useState(value || "");
    const heightFiller: number = 1.2;

    const [isDeleteSwiped, setIsDeleteSwiped] = useState(false);
    const [deleteSwipeStartX, setDeleteSwipeStartX] = useState(0);
    const swipeDistance: number = 20;

    const adjustHeight = () => {
      const textArea = localRef.current;
      if (textArea) {
        textArea.style.height = "auto";
        textArea.style.height = `${textArea.scrollHeight + heightFiller}px`;
      }
    };

    useEffect(() => {
      adjustHeight();
    }, [text]);

    const handleTouchStart = (e: React.TouchEvent) => {
      setDeleteSwipeStartX(e.touches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
      const deltaX = deleteSwipeStartX - e.touches[0].clientX;
      if (deltaX > swipeDistance) {
        setIsDeleteSwiped(true);
        setDeleteSwipeStartX(deleteSwipeStartX - deltaX);
      } else if (deltaX < -swipeDistance) {
        setIsDeleteSwiped(false);
        setDeleteSwipeStartX(deleteSwipeStartX - deltaX);
      }
    };

    return (
      <div
        className={`relative mb-5 flex flex-col gap-3 overflow-x-hidden ${className}`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        <div className="flex items-center justify-between">
          <span className="font-primary text-400 font-semibold text-grey-400">
            Пожелание {index + 1}
          </span>
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={onRemove}
            className=""
            disabled={disabled}
          >
            <img src={trashIcon} alt="Delete" className="h-6 w-6" />
          </button>
        </div>
        <div className="flex w-full flex-col">
          <textarea
            ref={ref || localRef}
            value={value?.wish}
            onChange={(e) => {
              setText(e.target.value);
              if (onChange) onChange(e);
              adjustHeight();
            }}
            onBlur={onBlur}
            className="w-full resize-none overflow-hidden rounded-[20px] border-[1px] border-grey-100 px-3 py-5 font-primary text-300 font-normal text-grey-500 focus:outline-none"
            rows={1}
            placeholder={placeholder}
            disabled={disabled}
            style={{ height: "auto" }}
          />
        </div>

        <button
          className={`absolute flex h-full w-full items-center justify-center gap-[5px] rounded-[8px] bg-grey-300 transition-transform duration-300 sm:hidden`}
          style={{
            transform: `translateX(${isDeleteSwiped ? `0` : `100%`})`,
          }}
          onMouseDown={(e) => e.preventDefault()}
          onClick={onRemove}
        >
          <img src={trashReverseIcon} alt="Delete" className="h-6 min-w-6" />
          <span className="font-primary text-400 font-normal leading-[1.2] text-white">
            Удалить
          </span>
        </button>
      </div>
    );
  },
);

export default WishInput;
