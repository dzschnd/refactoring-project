import type { FC } from "react";
interface NamesProps {
  firstPartnerName: string;
  secondPartnerName: string;
  coupleImage: string;
  eventDate: string;
}

const Names: FC<NamesProps> = ({
  firstPartnerName,
  secondPartnerName,
  coupleImage,
  eventDate,
}) => {
  return (
    <div className="flex max-w-[360px] flex-col items-center gap-[30px] px-5 font-playfair md:max-w-[466px] md:gap-10">
      <h1 className="text-950 font-light text-grey-500">
        <span>{secondPartnerName}</span> <span>И</span>{" "}
        <span>{firstPartnerName}</span>
      </h1>
      <img
        src={coupleImage}
        alt="Couple"
        className="min-h-[480px] w-full max-w-[426px] object-cover md:min-h-[600px]"
      />
      <div className="relative flex w-full justify-between">
        <div className="absolute left-0 h-full w-1/3 border-b border-l border-t border-red-700" />
        <span className="h-[52px] w-full text-center text-900 font-normal italic text-red-700">
          {eventDate}
        </span>
        <div className="absolute right-0 h-full w-1/3 border-b border-r border-t border-red-700" />
      </div>
    </div>
  );
};

export default Names;
