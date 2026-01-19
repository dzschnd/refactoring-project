import { useRef, useState } from "react";
import type { FC } from "react";
import {
  Button,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
  Select,
  SelectValue,
} from "react-aria-components";
import type { Key } from "react-aria-components";
import checkboxIcon from "../../../../../assetsOld/formIcons/check-square.png";
import arrowRightIcon from "../../../../../assetsOld/buttonIcons/arrowRight.png";
import radioIcon from "../../../../../assetsOld/formIcons/radio-circle.png";
import textIcon from "../../../../../assetsOld/formIcons/text-input.png";
import type { QuestionType } from "../../../../../types";

interface QuestionTypeSelectProps {
  value: QuestionType;
  onChange: (newType: QuestionType) => void;
}

const QuestionTypeSelect: FC<QuestionTypeSelectProps> = ({
  value,
  onChange,
}) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    <Select
      selectedKey={value}
      onSelectionChange={(newKey: Key) => {
        const newType =
          newKey === "react-aria-1"
            ? QuestionType.CHECKBOX
            : newKey === "react-aria-2"
              ? QuestionType.SELECT
              : QuestionType.TEXT;
        onChange(newType);
        setIsPopoverOpen(false);
      }}
    >
      <Button
        ref={triggerRef}
        onPress={() => setIsPopoverOpen(true)}
        className="flex h-[66px] w-full items-center gap-3 rounded-[44px] border-[1px] border-grey-100 px-4 py-3 focus:outline-none"
      >
        <img
          src={
            value === QuestionType.CHECKBOX
              ? checkboxIcon
              : value === QuestionType.SELECT
                ? radioIcon
                : textIcon
          }
          alt=""
          className="h-6 w-6"
        />
        <div className="relative flex w-full flex-col gap-1 focus:outline-none">
          <Label className="self-start font-primary text-200 font-normal text-grey-400">
            Тип вопроса
          </Label>
          <SelectValue className="flex font-primary text-400 font-normal text-grey-500">
            {value === QuestionType.CHECKBOX && "Несколько из списка"}
            {value === QuestionType.SELECT && "Один из списка"}
            {value === QuestionType.TEXT && "Текст"}
          </SelectValue>
          <img
            src={arrowRightIcon}
            alt="Dropdown"
            className="absolute right-0 top-1/2"
            style={{
              transform: `translateY(-50%) rotate(${isPopoverOpen ? `0` : `90deg`}`,
            }}
          />
        </div>
      </Button>
      <Popover
        style={{ width: triggerRef.current?.offsetWidth }}
        className="w-full"
        isOpen={isPopoverOpen}
        onOpenChange={setIsPopoverOpen}
      >
        <ListBox className="flex flex-col rounded-[20px] border-[1px] border-grey-100 bg-white font-primary text-400 font-normal text-grey-500 focus:outline-none">
          <ListBoxItem
            textValue={"Несколько из списка"}
            className="flex cursor-pointer gap-3 px-5 pb-2 pt-5 focus:outline-none"
          >
            <img src={checkboxIcon} alt="" className="h-6 w-6" />
            Несколько из списка
          </ListBoxItem>
          <ListBoxItem
            textValue={"Один из списка"}
            className="flex cursor-pointer gap-3 px-5 py-2 focus:outline-none"
          >
            <img src={radioIcon} alt="" className="h-6 w-6" />
            Один из списка
          </ListBoxItem>
          <ListBoxItem
            textValue={"Текст"}
            className="flex cursor-pointer gap-3 px-5 pb-5 pt-2 focus:outline-none"
          >
            <img src={textIcon} alt="" className="h-6 w-6" />
            Текст
          </ListBoxItem>
        </ListBox>
      </Popover>
    </Select>
  );
};

export default QuestionTypeSelect;
