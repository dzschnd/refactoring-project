import React, { FC, useId } from "react";
import imageIcon from "../../../../../assetsOld/formIcons/image.png";
import refreshIcon from "../../../../../assetsOld/buttonIcons/refresh.svg";

const ImageSelector: FC<{
  onImageChange: (file: File | null) => void;
  onImageReset: () => void;
  imageUrl: string | null;
  defaultImage: string;
}> = ({ onImageChange, onImageReset, imageUrl, defaultImage }) => {
  const id = useId();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      if (file.type.startsWith("image/")) {
        onImageChange(file);
      } else {
        event.target.value = "";
        alert("Please select a valid image file (jpg, png, etc.).");
      }
    }
  };

  return (
    <div className="flex flex-col gap-3 text-left">
      <div className={"flex items-center justify-between"}>
        <span className="font-primary text-200 font-normal text-grey-400">
          Фото
        </span>
        <button disabled={!imageUrl} onClick={onImageReset}>
          <img
            className={"h-6 w-6"}
            src={refreshIcon}
            alt="Choose default image"
          />
        </button>
      </div>
      <span className="font-primary text-200 font-normal text-grey-300">
        Кликните, чтобы добавить ваше фото
      </span>
      <div className="flex gap-2">
        <img
          src={
            imageUrl
              ? "https://pub-6a9646833fc24b188cbc779464f80132.r2.dev" +
                imageUrl.split(".com")[1]
              : defaultImage
          }
          className="h-[116px] w-[116px] rounded-[10px] object-cover"
          alt="Selected"
        />
        <label htmlFor={id}>
          <div className="flex h-[116px] w-[116px] cursor-pointer flex-col items-center justify-center gap-[7px] rounded-[10px] border-[1px] border-grey-100">
            <img src={imageIcon} alt="" className="h-6 w-6" />
            <span className="font-primary text-200 font-normal text-grey-400">
              Заменить фото
            </span>
          </div>
          <input
            autoComplete={"off"}
            id={id}
            accept="image/*"
            type="file"
            className="sr-only"
            onChange={handleFileChange}
          />
        </label>
      </div>
    </div>
  );
};

export default ImageSelector;
