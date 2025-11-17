import { FC } from "react";

const Dresscode: FC = () => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="gap-[30px] text-center font-primary text-800 font-light leading-[1.2] text-grey-300 md:text-900">
        Дресскод
      </h1>
      <div className="mt-[30px] flex max-w-[236px] flex-wrap gap-5">
        <div className="h-[44px] w-[44px] rounded-full bg-grey-200" />
        <div className="h-[44px] w-[44px] rounded-full bg-grey-200" />
        <div className="h-[44px] w-[44px] rounded-full bg-grey-200" />
        <div className="h-[44px] w-[44px] rounded-full bg-grey-200" />
        <div className="h-[44px] w-[44px] rounded-full bg-grey-200" />
        <div className="h-[44px] w-[44px] rounded-full bg-grey-200" />
        <div className="h-[44px] w-[44px] rounded-full bg-grey-200" />
      </div>
    </div>
  );
};

export default Dresscode;
