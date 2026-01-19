import type { DateValue } from "react-aria-components";
import { format } from "date-fns/format";
import { ru } from "date-fns/locale";
import { isValid } from "date-fns";

export const dateValue2ISO = (value: DateValue) => {
  return (
    value.year.toString().padStart(4, "0") +
    "-" +
    value.month.toString().padStart(2, "0") +
    "-" +
    value.day.toString().padStart(2, "0")
  );
};

export const ISO2RU = (isoDate: string) => {
  return (
    isoDate.split("-")[0] +
    "." +
    isoDate.split("-")[1] +
    "." +
    isoDate.split("-")[2]
  );
};

export const currentDateISO = () => {
  return new Date().toISOString().split("T")[0];
};

export const ISO2TextRu = (isoDate: string): string => {
  const date = new Date(isoDate);
  if (!isValid(date)) return isoDate;
  return format(date, "dd.MM.y", {
    locale: ru,
  });
};

export const ISO2TextRuLong = (isoDate: string): string => {
  const date = new Date(isoDate);
  if (!isValid(date)) return isoDate;
  return format(date, "dd MMMM yyyy года", {
    locale: ru,
  });
};

export type timeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export const getTimeUntilDate = (isoDate: string | null): timeLeft => {
  if (!isoDate) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  const [year, month, day] = isoDate.split("-").map(Number);

  const targetDate = new Date(year, month - 1, day);
  const currentDate = new Date();

  const timeDifference = targetDate.getTime() - currentDate.getTime();

  if (timeDifference < 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

  const days = timeDifference / (1000 * 60 * 60 * 24);
  const fullDays = Math.floor(days);
  const hours = (days - fullDays) * 24;
  const fullHours = Math.floor(hours);
  const minutes = (hours - fullHours) * 60;
  const fullMinutes = Math.floor(minutes);
  const seconds = (minutes - fullMinutes) * 60;
  const fullSeconds = Math.floor(seconds);
  return {
    days: fullDays,
    hours: fullHours,
    minutes: fullMinutes,
    seconds: fullSeconds,
  };
};
