import { useState } from "react";
import type { FC } from "react";
import FormLayout from "../../../layouts/FormLayout";
import WishInput from "../Inputs/WishInput";
import plusIcon from "../../../../../assetsOld/buttonIcons/plus.png";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../../../api/redux/store";
import { updateDraft } from "../../../../../api/service/DraftService";
import { updateLocalDraft } from "../../../../../api/redux/slices/draftSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { draftUpdateBaseSchema } from "../../../../../shared/schemas/draft";

interface FormInput {
  wishes:
    | {
        wish: string;
        position: number;
      }[]
    | null;
}

const wishesFormSchema = draftUpdateBaseSchema.pick({ wishes: true });

const WishesForm: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { id, wishes, prevWishes } = useSelector(
    (state: RootState) => state.draft,
  );

  const [isBlockDisabled, setIsBlockDisabled] = useState<boolean>(
    wishes === null || wishes.length === 0,
  );

  const { control, getValues, setValue } = useForm<FormInput>({
    resolver: zodResolver(wishesFormSchema),
    defaultValues: {
      wishes: wishes
        ? [...wishes].sort((a, b) => a.position - b.position)
        : prevWishes,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "wishes",
  });

  const handleUpdateLocalDraft = () => {
    const updatedWishes = getValues().wishes;
    if (!updatedWishes) return;
    const updatedWishesFiltered = updatedWishes.filter(
      (wish) => wish.wish !== "",
    );
    const updatedWishesWithPositions = updatedWishesFiltered.map((wish, i) => ({
      wish: wish.wish.trim(),
      position: i,
    }));

    dispatch(updateLocalDraft({ wishes: updatedWishesWithPositions }));
  };

  const handleUpdateDraft = async () => {
    const updatedWishes = getValues().wishes;
    if (!updatedWishes) return;
    const updatedWishesFiltered = updatedWishes.filter(
      (wish) => wish.wish !== "",
    );
    const updatedWishesWithPositions = updatedWishesFiltered.map((wish, i) => ({
      wish: wish.wish.trim(),
      position: i,
    }));
    await dispatch(updateDraft({ id: id, wishes: updatedWishesWithPositions }));
  };

  const handleRemoveWish = async (index: number) => {
    remove(index);

    const updatedWishes = getValues().wishes;
    const updatedWishesWithPositions = updatedWishes
      ? updatedWishes.map((wish, i) => ({
          ...wish,
          position: i,
        }))
      : [];
    const updatedWishesFiltered = updatedWishesWithPositions.filter(
      (wish) => wish.wish !== "",
    );
    const updatedWishesFilteredWithPositions = updatedWishesFiltered.map(
      (wish, i) => ({
        wish: wish.wish.trim(),
        position: i,
      }),
    );

    setValue("wishes", updatedWishesWithPositions);
    await dispatch(
      updateDraft({ id: id, wishes: updatedWishesFilteredWithPositions }),
    );
  };

  return (
    <FormLayout
      isBlockDisabled={isBlockDisabled}
      setIsBlockDisabled={setIsBlockDisabled}
      pageIndex={5}
      description={"Поделитесь важными просьбами для ваших гостей"}
    >
      {fields.map((field, index) => (
        <Controller
          key={field.id}
          control={control}
          name={`wishes.${index}.wish`}
          render={({ field }) => (
            <WishInput
              index={index}
              value={{ wish: field.value, position: index }}
              onChange={(e) => {
                field.onChange(e.target.value);
                handleUpdateLocalDraft();
              }}
              onBlur={handleUpdateDraft}
              onRemove={() => handleRemoveWish(index)}
              placeholder={"Введите пожелание"}
              disabled={isBlockDisabled}
            />
          )}
        />
      ))}

      <button
        type="button"
        className="self-center"
        onClick={() => append({ wish: "", position: fields.length })}
      >
        <div className="mb-1 flex items-center gap-1">
          <span className="font-primary text-300 font-normal text-grey-400">
            Добавить пожелание
          </span>
          <img src={plusIcon} alt="Add" className="h-[15px] w-[15px]" />
        </div>
        <div className="h-[1px] w-full bg-grey-400" />
      </button>
    </FormLayout>
  );
};

export default WishesForm;
