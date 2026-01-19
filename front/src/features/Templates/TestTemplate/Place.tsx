import type { FC } from "react";
import image from "../../../assetsOld/templates/test/placeImage.png";

const Place: FC = () => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="gap-[30px] text-center font-primary text-800 font-light leading-[1.2] text-grey-300 md:text-900">
        Место проведения
      </h1>
      <h2 className="mt-10 text-center font-primary text-400 font-light leading-[1.4] text-grey-500">
        г.Пупино, ул.Есенина, д.Каруселина, 18
        <br />
        Столовая “у Елены”
      </h2>
      <img src={image} alt="" className="my-[30px] w-[565px]" />
      <a
        className="text-center font-primary text-400 font-normal leading-[1.4] text-grey-500 underline"
        href="https://yandex.ru/maps/org/samu_shaurma/209203219375/?ll=30.295435%2C59.938784&mode=search&sll=30.314997%2C59.938784&sspn=0.195007%2C0.203623&text=%D1%81%D0%B0%D0%BC%D1%83&z=10.74"
        target="_blank"
      >
        СМОТРЕТЬ НА КАРТЕ
      </a>
    </div>
  );
};

export default Place;
