import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../api/redux/store";

interface ProgramProps {
  planItems: {
    eventTime: string;
    description: string;
    position: number;
  }[];
}

const Program: FC<ProgramProps> = ({ planItems }) => {
  return (
    <div className="flex max-w-[320px] flex-col items-center gap-[30px] font-playfair md:max-w-[426px]">
      <h2 className="text-900 font-light text-grey-500">ПРОГРАММА</h2>
      <div className="flex w-full min-w-[360px] flex-col gap-2.5">
        {[...planItems]
          .sort((a, b) => a.position - b.position)
          .map((planItem, index) => (
            <div key={index} className="flex gap-5 font-montserrat">
              <span className="flex w-full max-w-[170px] items-center justify-end bg-red-700 py-4 pr-4 text-600 font-normal text-white">
                {planItem.eventTime}
              </span>
              <p className="flex w-1/2 break-after-all items-center whitespace-normal text-400 font-light text-grey-500">
                {planItem.description}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Program;
