import { useState } from "react";
import type { FC } from "react";
import FormLayout from "../../../layouts/FormLayout";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../../../api/redux/hooks";
import { updateDraft } from "../../../../../api/service/DraftService";
import { updateLocalDraft } from "../../../../../api/redux/slices/draftSlice";
import type { Color } from "../../../../../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { draftUpdateBaseSchema } from "../../../../../shared/schemas/draft";

interface FormInput {
  colors:
    | {
        colorCode: string;
        position: number;
      }[]
    | null;
}

const dresscodeFormSchema = draftUpdateBaseSchema.pick({ colors: true });

const DresscodeForm: FC = () => {
  const dispatch = useAppDispatch();
  const { id, colors, prevColors } = useAppSelector((state) => state.draft);

  const [isBlockDisabled, setIsBlockDisabled] = useState<boolean>(
    colors === null || colors.length === 0,
  );

  const { control, getValues } = useForm<FormInput>({
    resolver: zodResolver(dresscodeFormSchema),
    defaultValues: {
      colors: colors
        ? colors.map((color: Color, index: number) => ({
            colorCode: color.colorCode,
            position: index,
          }))
        : prevColors,
    },
  });

  const { fields } = useFieldArray({
    control,
    name: "colors",
  });

  const handleUpdateLocalDraft = () => {
    const updatedColors = getValues().colors;
    dispatch(updateLocalDraft({ colors: updatedColors }));
  };

  const handleUpdateDraft = async () => {
    const updatedColors = getValues().colors;
    await dispatch(updateDraft({ id: id, colors: updatedColors }));
  };

  return (
    <FormLayout
      isBlockDisabled={isBlockDisabled}
      setIsBlockDisabled={setIsBlockDisabled}
      pageIndex={4}
      description={
        "Укажите, в каких цветах ваши гости смогут блистать на свадьбе! Пусть каждый наряд гармонирует с атмосферой вашего волшебного дня. 🎨✨"
      }
    >
      <div className="flex flex-wrap gap-5 self-center">
        {fields.map((field, index) => (
          <Controller
            key={field.id}
            control={control}
            name={`colors.${index}.colorCode`}
            render={({ field }) => (
              <label htmlFor={`color-${index}`} className="cursor-pointer">
                <div
                  className="h-12 w-12 rounded-full shadow-color-preview"
                  style={{ backgroundColor: field.value || "#000000" }}
                />
                <input
                  autoComplete={"off"}
                  id={`color-${index}`}
                  type="color"
                  className="sr-only"
                  value={field.value || "#000000"}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    handleUpdateLocalDraft();
                  }}
                  onBlur={handleUpdateDraft}
                  disabled={isBlockDisabled}
                />
              </label>
            )}
          />
        ))}
      </div>
    </FormLayout>
  );
};

export default DresscodeForm;
