import { FC } from "react";

const Program: FC = () => {
  return (
    <div className="flex max-w-[366px] flex-col items-center">
      <h1 className="gap-[30px] text-center font-primary text-800 font-light leading-[1.2] text-grey-300 md:text-900">
        Программа
      </h1>
      <div className="font-grey-500 mt-10 flex flex-col gap-[25px] font-primary text-400 font-light leading-[1.4]">
        <div className="flex justify-start gap-[47px] md:gap-[58px]">
          <span>13:00</span>
          <p>
            Торжественное враньё о том, что они идеально подходят друг другу
          </p>
        </div>
        <div className="flex items-center justify-start gap-[47px] md:gap-[58px]">
          <span>16:00</span>
          <p>Священная трапеза на выживание</p>
        </div>
        <div className="flex items-center justify-start gap-[47px] md:gap-[58px]">
          <span>18:00</span>
          <p>
            Вакханалия под кодовым названием ‘Танцы, в которых ты — король, но
            только до утра
          </p>
        </div>
      </div>
    </div>
  );
};

export default Program;
