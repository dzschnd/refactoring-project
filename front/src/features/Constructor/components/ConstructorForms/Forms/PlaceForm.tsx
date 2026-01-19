import { useRef } from "react";
import type { FC } from "react";
import FormLayout from "../../../layouts/FormLayout";
import TextInput from "../Inputs/TextInput";
import ImageSelector from "../Inputs/ImageSelector";
import locationIcon from "../../../../../assetsOld/formIcons/location.png";
import linkIcon from "../../../../../assetsOld/formIcons/link.png";
import { useAppDispatch, useAppSelector } from "../../../../../api/redux/hooks";
import { Controller, useForm } from "react-hook-form";
import { updateLocalDraft } from "../../../../../api/redux/slices/draftSlice";
import { updateDraft } from "../../../../../api/service/DraftService";
import {
  resetImage,
  uploadImage,
} from "../../../../../api/service/UploadService";
import { defaultTemplateImages } from "../../../../Templates/defaultTemplateImages";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { placeSchema } from "../../../../../shared/schemas/draft";

interface FormInput {
  address: string | null;
  link: string | null;
}

const placeFormSchema = z.object({
  address: placeSchema.shape.address,
  link: placeSchema.shape.link,
});

const PlaceForm: FC = () => {
  const dispatch = useAppDispatch();
  const { id, place, templateName } = useAppSelector((state) => state.draft);

  const {
    control,
    getValues,
    formState: { errors },
  } = useForm<FormInput>({
    mode: "onBlur",
    resolver: zodResolver(placeFormSchema),
    defaultValues: {
      address: place.address,
      link: place.link,
    },
  });

  let defaultImage;

  switch (templateName) {
    case "nezhnost":
      defaultImage = defaultTemplateImages.nezhnostPlaceImage;
      break;
    default:
      defaultImage = "";
  }

  const savedValuesRef = useRef({
    place,
  });

  const handleUpdateLocalDraft = () => {
    const { address, link } = getValues();

    dispatch(
      updateLocalDraft({
        place: {
          address: address?.trim(),
          link: link?.trim(),
          placeImage: place.placeImage,
        },
      }),
    );
  };

  const handleUpdateDraft = async () => {
    const { address, link } = getValues();

    if (place !== savedValuesRef.current.place) {
      await dispatch(
        updateDraft({
          id: id,
          place: {
            address: address && address.trim(),
            link: link && link.trim(),
            placeImage: place.placeImage,
          },
        }),
      );

      savedValuesRef.current = { place };
    }
  };

  const handleImageChange = async (file: File | null) => {
    if (file) await dispatch(uploadImage({ file, id, type: "placeImage" }));
  };

  const handleImageReset = async () => {
    await dispatch(resetImage({ id, type: "placeImage" }));
  };

  return (
    <FormLayout
      pageIndex={2}
      description={
        "Укажите адрес, где развернется ваше свадебное волшебство. Пусть гости легко найдут путь к вашей незабываемой вечеринке! 📍✨"
      }
    >
      <Controller
        name="address"
        control={control}
        render={({ field }) => (
          <TextInput
            {...field}
            placeholder={"Введите адрес места"}
            icon={locationIcon}
            label={"Местоположение"}
            onChange={(e) => {
              field.onChange(e);
              handleUpdateLocalDraft();
            }}
            onBlur={handleUpdateDraft}
          />
        )}
      />
      {errors.address && (
        <span className="text-red-500">{errors.address.message}</span>
      )}

      <Controller
        name="link"
        control={control}
        render={({ field }) => (
          <TextInput
            {...field}
            placeholder={"https://yandex.ru/maps/..."}
            icon={linkIcon}
            label={"Добавьте ссылку на Yandex или Google карты"}
            onChange={(e) => {
              field.onChange(e);
              handleUpdateLocalDraft();
            }}
            onBlur={handleUpdateDraft}
          />
        )}
      />

      <ImageSelector
        onImageChange={handleImageChange}
        onImageReset={handleImageReset}
        imageUrl={place.placeImage}
        defaultImage={defaultImage}
      />
    </FormLayout>
  );
};

export default PlaceForm;
