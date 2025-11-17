import React, { FC, useRef } from "react";
import heartIcon from "../../../../../assetsOld/formIcons/heart.png";
import ImageSelector from "../Inputs/ImageSelector";
import TextInput from "../Inputs/TextInput";
import FormLayout from "../../../layouts/FormLayout";
import { AppDispatch, RootState } from "../../../../../api/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { updateDraft } from "../../../../../api/service/DraftService";
import { updateLocalDraft } from "../../../../../api/redux/slices/draftSlice";
import {
  resetImage,
  uploadImage,
} from "../../../../../api/service/UploadService";
import { defaultTemplateImages } from "../../../../Templates/defaultTemplateImages";

interface FormInput {
  firstPartnerName: string | null;
  secondPartnerName: string | null;
}

const NamesForm: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { id, firstPartnerName, secondPartnerName, coupleImage, templateName } =
    useSelector((state: RootState) => state.draft);

  let defaultImage;

  switch (templateName) {
    case "nezhnost":
      defaultImage = defaultTemplateImages.nezhnostCoupleImage;
      break;
    default:
      defaultImage = "";
  }

  const {
    control,
    getValues,
    formState: { errors },
  } = useForm<FormInput>({
    mode: "onBlur",
    defaultValues: {
      firstPartnerName: firstPartnerName,
      secondPartnerName: secondPartnerName,
    },
  });

  const savedValuesRef = useRef({
    firstPartnerName,
    secondPartnerName,
  });

  const handleUpdateLocalDraft = async () => {
    const { firstPartnerName, secondPartnerName } = getValues();

    dispatch(
      updateLocalDraft({
        firstPartnerName: firstPartnerName,
        secondPartnerName: secondPartnerName,
      }),
    );
  };

  const handleUpdateDraft = async () => {
    const { firstPartnerName, secondPartnerName } = getValues();

    if (
      firstPartnerName?.trim() !==
        savedValuesRef.current.firstPartnerName?.trim() ||
      secondPartnerName?.trim() !==
        savedValuesRef.current.secondPartnerName?.trim()
    ) {
      await dispatch(
        updateDraft({
          id: id,
          firstPartnerName: firstPartnerName?.trim(),
          secondPartnerName: secondPartnerName?.trim(),
        }),
      );

      savedValuesRef.current = {
        firstPartnerName: firstPartnerName?.trim(),
        secondPartnerName: secondPartnerName?.trim(),
      };
    }
  };

  const handleImageChange = async (file: File | null) => {
    if (file) await dispatch(uploadImage({ file, id, type: "coupleImage" }));
  };

  const handleImageReset = async () => {
    await dispatch(resetImage({ id, type: "coupleImage" }));
  };

  return (
    <FormLayout
      pageIndex={0}
      description={
        "Добро пожаловать в вашу историю любви! Введите имена жениха и невесты и добавьте ваше общее фото, чтобы все знали, кто станет главными героями этого волшебного дня! 💍✨"
      }
    >
      <Controller
        name="firstPartnerName"
        control={control}
        render={({ field }) => (
          <TextInput
            {...field}
            label={"Как зовут невесту?"}
            placeholder={"Невеста"}
            icon={heartIcon}
            onChange={async (e) => {
              field.onChange(e);
              await handleUpdateLocalDraft();
            }}
            onBlur={handleUpdateDraft}
          />
        )}
        rules={{
          required: "Please enter the first partner's name",
        }}
      />
      {errors.firstPartnerName && (
        <span className="text-red-500">{errors.firstPartnerName.message}</span>
      )}

      <Controller
        name="secondPartnerName"
        control={control}
        render={({ field }) => (
          <TextInput
            {...field}
            label={"Как зовут жениха?"}
            placeholder={"Жених"}
            icon={heartIcon}
            onChange={async (e) => {
              field.onChange(e);
              await handleUpdateLocalDraft();
            }}
            onBlur={handleUpdateDraft}
          />
        )}
        rules={{
          required: "Please enter the second partner's name",
        }}
      />
      {errors.secondPartnerName && (
        <span className="text-red-500">{errors.secondPartnerName.message}</span>
      )}

      <ImageSelector
        onImageChange={handleImageChange}
        onImageReset={handleImageReset}
        imageUrl={coupleImage}
        defaultImage={defaultImage}
      />
    </FormLayout>
  );
};

export default NamesForm;
