import { useRef } from "react";
import type { FC } from "react";
import FormLayout from "../../../layouts/FormLayout";
import calendarIcon from "../../../../../assetsOld/formIcons/calendar.png";
import ConstructorDateInput from "../Inputs/ConstructorDateInput";
import { useAppDispatch, useAppSelector } from "../../../../../api/redux/hooks";
import { Controller, useForm } from "react-hook-form";
import { updateDraft } from "../../../../../api/service/DraftService";
import { updateLocalDraft } from "../../../../../api/redux/slices/draftSlice";
import type { DateValue } from "react-aria-components";
import { parseDate } from "@internationalized/date";
import { dateValue2ISO } from "../../../../../utils/dateUtils";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { draftUpdateBaseSchema } from "../../../../../shared/schemas/draft";

interface FormInput {
  eventDateValue: DateValue | undefined;
}

const dateFormSchema = z.object({
  eventDateValue: z.preprocess((value) => {
    if (!value) return undefined;
    if (typeof value === "string") return value;
    return dateValue2ISO(value as DateValue);
  }, draftUpdateBaseSchema.shape.eventDate),
});

const DateForm: FC = () => {
  const dispatch = useAppDispatch();
  const { id, eventDate } = useAppSelector((state) => state.draft);

  const {
    control,
    getValues,
    formState: { errors },
  } = useForm<FormInput>({
    mode: "onBlur",
    resolver: zodResolver(dateFormSchema),
    defaultValues: {
      eventDateValue: eventDate ? parseDate(eventDate) : undefined,
    },
  });

  const savedValuesRef = useRef({ eventDate });

  const handleUpdateLocalDraft = () => {
    const { eventDateValue } = getValues();

    if (
      eventDateValue &&
      eventDateValue.year &&
      eventDateValue.month &&
      eventDateValue.day
    ) {
      const formattedDate = dateValue2ISO(eventDateValue);
      dispatch(
        updateLocalDraft({
          eventDate: formattedDate,
        }),
      );
    }
  };

  const handleUpdateDraft = async () => {
    const { eventDateValue } = getValues();

    if (
      eventDateValue &&
      eventDateValue.year &&
      eventDateValue.month &&
      eventDateValue.day
    ) {
      const formattedDate = dateValue2ISO(eventDateValue);

      if (formattedDate !== savedValuesRef.current.eventDate) {
        await dispatch(
          updateDraft({
            id: id,
            eventDate: formattedDate,
          }),
        );

        savedValuesRef.current = { eventDate: formattedDate };
      }
    }
  };

  return (
    <FormLayout
      pageIndex={1}
      description={
        "Введите день, который станет началом вашего совместного пути! Этот момент важен, ведь он запомнится на всю жизнь 🗓️"
      }
    >
      <Controller
        name="eventDateValue"
        control={control}
        render={({ field }) => (
          <ConstructorDateInput
            {...field}
            label={"Дата"}
            icon={calendarIcon}
            onChange={(e) => {
              field.onChange(e);
              handleUpdateLocalDraft();
            }}
            onBlur={handleUpdateDraft}
          />
        )}
      />
      {errors.eventDateValue && (
        <span className="text-red-500">{errors.eventDateValue.message}</span>
      )}
    </FormLayout>
  );
};

export default DateForm;
