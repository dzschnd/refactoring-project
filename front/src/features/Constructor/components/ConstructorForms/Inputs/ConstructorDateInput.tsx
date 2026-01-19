import {
  Button,
  Calendar,
  CalendarCell,
  CalendarGrid,
  DateInput,
  DatePicker,
  DateSegment,
  Dialog,
  Group,
  Heading,
  Label,
  Popover,
} from "react-aria-components";
import type { DateValue, ValidationResult } from "react-aria-components";
import { FieldError } from "react-aria-components";
import { today, getLocalTimeZone } from "@internationalized/date";
import arrowLeft from "../../../../../assetsOld/buttonIcons/arrowLeft.png";
import arrowRight from "../../../../../assetsOld/buttonIcons/arrowRight.png";
import { useEffect, useRef, useState, forwardRef } from "react";

interface Props<T extends DateValue> {
  label: string;
  icon?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  value?: T;
  onChange?: (value: DateValue) => void;
  onBlur?: () => void;
}

const ConstructorDateInput = forwardRef<HTMLInputElement, Props<DateValue>>(
  (
    { label, icon, errorMessage, value, onChange, onBlur }: Props<DateValue>,
    ref,
  ) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 760);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const popoverRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleResize = () => setIsMobile(window.innerWidth < 760);
      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }, [value]);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          popoverRef.current &&
          !popoverRef.current.contains(event.target as Node)
        ) {
          setIsPopoverOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    const togglePopover = () => {
      setIsPopoverOpen(!isPopoverOpen);
    };

    const handleDateChange = (newValue: DateValue | null) => {
      if (onChange && newValue) {
        onChange(newValue);
      }
      setIsPopoverOpen(false);
    };

    const currentDateValue = today(getLocalTimeZone());

    return (
      <DatePicker
        minValue={currentDateValue}
        value={value}
        onChange={handleDateChange}
        onBlur={onBlur}
      >
        <Group className="flex h-[66px] items-center gap-4 rounded-[44px] border-[1px] border-grey-100 px-4 py-3">
          <Button className="focus:outline-none" onPress={togglePopover}>
            <img src={icon} alt="Pick a date" />
          </Button>
          <div className="flex flex-col gap-1">
            <Label className="font-primary text-200 font-normal text-grey-400">
              {label}
            </Label>
            <DateInput className="flex" ref={ref}>
              {(segment) => (
                <DateSegment
                  segment={segment}
                  className="font-primary text-400 font-light text-grey-500 placeholder:text-grey-200 focus:outline-none"
                />
              )}
            </DateInput>
          </div>
        </Group>
        <FieldError className={"text-300 text-red-500"}>
          {errorMessage}
        </FieldError>
        {isPopoverOpen && (
          <Popover
            ref={popoverRef}
            isNonModal={!isMobile}
            className="focus:outline-none"
          >
            <Dialog>
              <Calendar className="w-52 rounded-[7px] border-[1px] border-grey-100 bg-white p-2">
                <header className="flex justify-between">
                  <Button slot="previous">
                    <img src={arrowLeft} alt="Previous" />
                  </Button>
                  <Heading />
                  <Button slot="next">
                    <img src={arrowRight} alt="Next" />
                  </Button>
                </header>
                <CalendarGrid weekdayStyle={"short"} className="w-full">
                  {(date) => (
                    <CalendarCell
                      date={date}
                      className={`text-center ${date < currentDateValue ? "bg-grey-50" : ""}`}
                    />
                  )}
                </CalendarGrid>
              </Calendar>
            </Dialog>
          </Popover>
        )}
      </DatePicker>
    );
  },
);

export default ConstructorDateInput;
