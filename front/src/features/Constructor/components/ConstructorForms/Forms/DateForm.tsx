import React, { FC, useRef } from "react";
import FormLayout from "../../../layouts/FormLayout";
import calendarIcon from "../../../../../assetsOld/formIcons/calendar.png";
import ConstructorDateInput from "../Inputs/ConstructorDateInput";
import { AppDispatch, RootState } from "../../../../../api/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { updateDraft } from "../../../../../api/service/DraftService";
import { updateLocalDraft } from "../../../../../api/redux/slices/draftSlice";
import { DateValue } from "react-aria-components";
import { parseDate } from "@internationalized/date";
import { dateValue2ISO } from "../../../../../utils/dateUtils";

interface FormInput {
  eventDateValue: DateValue | undefined;
}

const DateForm: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { id, eventDate } = useSelector((state: RootState) => state.draft);

  const {
    control,
    getValues,
    formState: { errors },
  } = useForm<FormInput>({
    mode: "onBlur",
    defaultValues: {
      eventDateValue: eventDate ? parseDate(eventDate) : undefined,
    },
  });

  const savedValuesRef = useRef({ eventDate });

  const handleUpdateLocalDraft = async () => {
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
            onChange={async (e) => {
              field.onChange(e);
              await handleUpdateLocalDraft();
            }}
            onBlur={handleUpdateDraft}
          />
        )}
        rules={{
          required: "Please enter the event date",
        }}
      />
      {errors.eventDateValue && (
        <span className="text-red-500">{errors.eventDateValue.message}</span>
      )}
    </FormLayout>
  );
};

export default DateForm;
