import type { FC } from "react";
import wishesImage from "../../../../assetsOld/templates/redVelvet/dresscodeImage.png";
interface DresscodeProps {
  colors: {
    colorCode: string;
    position: number;
  }[];
}
const Dresscode: FC<DresscodeProps> = ({ colors }) => {
  return (
    <div className="flex max-w-[320px] flex-col items-center gap-[30px] md:max-w-[426px]">
      <h2 className="font-playfair text-900 font-light text-grey-500">
        DRESS CODE
      </h2>
      <h3 className="text-center font-montserrat text-400 font-light text-grey-500">
        Будем признательны, если при выборе нарядов вы придержитесь цветовой
        палитры нашего торжества.
      </h3>
      <div className="flex gap-2">
        {colors.map((color, index) => (
          <div
            key={index}
            className="h-[26px] w-[58px]"
            style={{ backgroundColor: color.colorCode }}
          />
        ))}
      </div>
      <img src={wishesImage} alt={""} className="mt-[90px]" />
    </div>
  );
};

export default Dresscode;
