import type { FC } from "react";

interface PlaceProps {
  address: string;
  link: string;
  placeImage: string;
}
const Place: FC<PlaceProps> = ({ address, link, placeImage }) => {
  return (
    <div className="md-max-w-[466px] flex max-w-[360px] flex-col items-center gap-5 px-5 font-playfair md:gap-[30px]">
      <h2 className="mb-2.5 text-900 font-light text-grey-500 md:mb-0">
        МЕСТО ПРОВЕДЕНИЯ
      </h2>
      <img
        src={placeImage}
        alt="Place"
        className="min-h-[360px] w-full max-w-[426px] object-cover md:min-h-[500px]"
      />
      <div className="flex flex-col gap-4 text-center font-montserrat text-400 text-grey-500">
        <span className="font-light">Торжество состоится по адресу:</span>
        <p className="font-normal">{address}</p>
      </div>
      <a href={link} target="_blank" rel="noreferrer" className="w-full">
        <button className="w-full border border-red-700 py-4 text-center font-montserrat text-400 font-normal text-red-700">
          Как добраться
        </button>
      </a>
    </div>
  );
};

export default Place;
