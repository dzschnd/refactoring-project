import type { FC } from "react";
import image from "../../../assetsOld/templates/test/namesImage.png";
const Names: FC = () => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="flex gap-[30px] font-primary text-800 font-light leading-[1.2] text-grey-400 md:text-900">
        <span>Невеста</span> <span>&</span> <span>Жених</span>
      </h1>
      <img src={image} alt="" className="mb-[30px] mt-10 w-[640px]" />
      <h2 className="gap-[30px] text-center font-primary text-800 font-light leading-[1.2] text-grey-500">
        09.09.25
      </h2>
    </div>
  );
};

export default Names;
