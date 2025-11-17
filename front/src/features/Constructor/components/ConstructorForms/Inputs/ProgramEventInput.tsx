import React, { FC, useState } from "react";
import { FieldValues } from "react-hook-form";
import trashIcon from "../../../../../assetsOld/buttonIcons/trash.png";
import trashReverseIcon from "../../../../../assetsOld/buttonIcons/trash-reverse.png";
import TextInput from "./TextInput";
import {
  DateInput,
  DateSegment,
  Label,
  TimeField,
} from "react-aria-components";
import { Time } from "@internationalized/date";

interface ProgramEventInputProps {
  value?: {
    eventTime: Time | null;
    description: string | null;
    position: number;
  } | null;
  placeholder: string;
  onChange: (value: FieldValues) => void;
  onBlur: () => void;
  onRemove: () => void;
}

const ProgramEventInput: FC<ProgramEventInputProps> = ({
  placeholder,
  value,
  onChange,
  onBlur,
  onRemove,
}) => {
  const [isSwiped, setIsSwiped] = useState(false);
  const [startX, setStartX] = useState(0);
  const swipeDistance: number = 20;

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const deltaX = startX - e.touches[0].clientX;
    if (deltaX > swipeDistance) {
      setIsSwiped(true);
      setStartX(startX - deltaX);
    } else if (deltaX < -swipeDistance) {
      setIsSwiped(false);
      setStartX(startX - deltaX);
    }
  };

  const handleTimeChange = (time: Time) => {
    onChange({ ...value, eventTime: time });
  };

  return (
    <div
      className="relative flex items-center gap-[5px] overflow-x-hidden sm:overflow-x-visible"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      <TimeField
        value={value?.eventTime || new Time(0, 0)}
        onChange={(time) => {
          return handleTimeChange(time!);
        }}
        onBlur={onBlur}
        className="flex h-[66px] flex-col items-center justify-center gap-2 rounded-[44px] border-[1px] border-grey-100 px-4 py-3"
      >
        <Label className="font-primary text-200 font-normal leading-[1.2] text-grey-400">
          Время
        </Label>
        <DateInput className="flex">
          {(segment) => (
            <DateSegment
              segment={segment}
              className="font-primary text-400 font-light leading-[1.4] text-grey-500 placeholder:text-grey-200 focus:outline-none"
            />
          )}
        </DateInput>
      </TimeField>

      <TextInput
        placeholder={placeholder}
        value={value?.description || ""}
        label={"Событие"}
        onChange={(e) => onChange({ ...value, description: e.target.value })}
        onBlur={onBlur}
        className="flex-grow"
      />

      <button
        className={`absolute flex h-full w-full items-center justify-center gap-[5px] rounded-[8px] bg-grey-300 transition-transform duration-300 sm:hidden`}
        style={{
          transform: `translateX(${isSwiped ? `0` : `100%`})`,
        }}
        onMouseDown={(e) => e.preventDefault()}
        onClick={onRemove}
      >
        <img src={trashReverseIcon} alt="Delete" className="h-6 min-w-6" />
        <span className="font-primary text-400 font-normal leading-[1.2] text-white">
          Удалить
        </span>
      </button>

      <button
        type="button"
        className="hidden sm:block"
        onMouseDown={(e) => e.preventDefault()}
        onClick={onRemove}
      >
        <img src={trashIcon} alt="Delete" className="h-6 w-6" />
      </button>
    </div>
  );
};

export default ProgramEventInput;
