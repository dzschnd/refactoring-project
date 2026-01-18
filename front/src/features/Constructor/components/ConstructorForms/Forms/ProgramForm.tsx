import { FC } from "react";
import FormLayout from "../../../layouts/FormLayout";
import ProgramEventInput from "../Inputs/ProgramEventInput";
import plusIcon from "../../../../../assetsOld/buttonIcons/plus.png";
import { AppDispatch, RootState } from "../../../../../api/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { updateLocalDraft } from "../../../../../api/redux/slices/draftSlice";
import { updateDraft } from "../../../../../api/service/DraftService";
import { Time } from "@internationalized/date";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { draftUpdateBaseSchema } from "../../../../../shared/schemas/draft";

interface FormInput {
  planItems:
    | {
        eventTime: Time | null;
        description: string | null;
        position: number;
      }[]
    | null;
}

const timeToString = (value: Time) => {
  const hours = value.hour.toString().padStart(2, "0");
  const minutes = value.minute.toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

const programFormSchema = z.object({
  planItems: z.preprocess((value) => {
    if (!Array.isArray(value)) return value;
    return value.map((planItem) => ({
      ...planItem,
      eventTime: planItem.eventTime ? timeToString(planItem.eventTime) : "",
      description: planItem.description ?? "",
    }));
  }, draftUpdateBaseSchema.shape.planItems),
});

const ProgramForm: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { id, planItems } = useSelector((state: RootState) => state.draft);

  const { control, getValues, setValue } = useForm<FormInput>({
    resolver: zodResolver(programFormSchema),
    defaultValues: {
      planItems: planItems
        ? [...planItems]
            .sort((a, b) => a.position - b.position)
            .map((planItem) => ({
              ...planItem,
              eventTime: planItem.eventTime
                ? new Time(
                    parseInt(planItem.eventTime.split(":")[0]),
                    parseInt(planItem.eventTime.split(":")[1]),
                  )
                : null,
            }))
        : [
            { eventTime: new Time(), description: "", position: 0 },
            { eventTime: new Time(), description: "", position: 1 },
            { eventTime: new Time(), description: "", position: 2 },
          ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "planItems",
  });

  const mapTimeToStringAndTrimDescription = (
    planItems: {
      eventTime: Time | null;
      description: string | null;
      position: number;
    }[],
  ) => {
    return planItems.map((planItem) => {
      return {
        ...planItem,
        eventTime: planItem.eventTime
          ? planItem.eventTime.toString().split(":")[0] +
            ":" +
            planItem.eventTime.toString().split(":")[1]
          : "",
        description: planItem.description?.trim() || "",
      };
    });
  };

  const handleUpdateLocalDraft = () => {
    const updatedPlanItems = getValues().planItems;
    if (!updatedPlanItems) return;
    const updatedPlanItemsFiltered = updatedPlanItems.filter(
      (planItem) => planItem.description !== "",
    );
    const updatedPlanItemsWithStringTime = mapTimeToStringAndTrimDescription(
      updatedPlanItemsFiltered,
    );
    dispatch(updateLocalDraft({ planItems: updatedPlanItemsWithStringTime }));
  };

  const handleUpdateDraft = async () => {
    const updatedPlanItems = getValues().planItems;
    if (!updatedPlanItems) return;
    const updatedPlanItemsFiltered = updatedPlanItems.filter(
      (planItem) => planItem.description !== "",
    );
    const updatedPlanItemsWithStringTime = mapTimeToStringAndTrimDescription(
      updatedPlanItemsFiltered,
    );
    await dispatch(
      updateDraft({ id: id, planItems: updatedPlanItemsWithStringTime }),
    );
  };

  const handleRemovePlanItem = async (index: number) => {
    remove(index);

    const updatedPlanItems = getValues().planItems;
    const updatedPlanItemsWithPositions = updatedPlanItems
      ? updatedPlanItems.map((planItem, i) => ({
          ...planItem,
          position: i,
        }))
      : [];
    const updatedPlanItemsFiltered = updatedPlanItemsWithPositions.filter(
      (planItem) => planItem.description !== "",
    );
    const updatedPlanItemsFilteredWithPositions = updatedPlanItemsFiltered.map(
      (planItem, i) => ({
        ...planItem,
        position: i,
      }),
    );
    const updatedPlanItemsWithStringTime = mapTimeToStringAndTrimDescription(
      updatedPlanItemsFilteredWithPositions,
    );

    setValue("planItems", updatedPlanItemsWithPositions);
    await dispatch(
      updateDraft({ id: id, planItems: updatedPlanItemsWithStringTime }),
    );
  };

  return (
    <FormLayout
      pageIndex={3}
      description={
        "Укажите время и краткое описание каждого момента — от церемонии до финальной вечеринки. Пусть гости знают, чего ждать и когда веселиться!🎉"
      }
    >
      {fields.map((field, index) => (
        <Controller
          key={field.id}
          control={control}
          name={`planItems.${index}`}
          render={({ field }) => (
            <ProgramEventInput
              value={{
                eventTime: field.value.eventTime,
                description: field.value.description,
                position: index,
              }}
              onChange={(value) => {
                field.onChange(value);
                handleUpdateLocalDraft();
              }}
              onBlur={handleUpdateDraft}
              onRemove={() => handleRemovePlanItem(index)}
              placeholder={"Введите событие"}
            />
          )}
        />
      ))}

      <button
        type="button"
        className="self-center"
        onClick={() =>
          append({
            eventTime: new Time(),
            description: "",
            position: fields.length,
          })
        }
      >
        <div className="mb-1 flex items-center gap-1">
          <span className="font-primary text-300 font-normal text-grey-400">
            Добавить событие
          </span>
          <img src={plusIcon} alt="Add" className="h-[15px] w-[15px]" />
        </div>
        <div className="h-[1px] w-full bg-grey-400" />
      </button>
    </FormLayout>
  );
};

export default ProgramForm;
