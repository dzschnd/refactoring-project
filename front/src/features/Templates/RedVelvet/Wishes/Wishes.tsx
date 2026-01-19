import type { FC } from "react";

interface WishesProps {
  wishes: {
    wish: string;
    position: number;
  }[];
}

const Wishes: FC<WishesProps> = ({ wishes }) => {
  return (
    <div className="max-w-[320px] md:max-w-[426px]">
      <div className="x-5 flex max-w-[320px] flex-col items-center gap-[30px] md:max-w-[426px]">
        <h2 className="font-playfair text-900 font-light text-grey-500">
          ПОЖЕЛАНИЯ
        </h2>
        <div className="flex flex-col items-center gap-5">
          {[...wishes]
            .sort((a, b) => a.position - b.position)
            .map((wish, index) => (
              <div key={index} className="flex flex-col items-center gap-5">
                <p className="text-center font-montserrat text-400 font-light text-grey-500">
                  {wish.wish}
                </p>
                {index !== wishes.length - 1 && (
                  <div className="w-[150px] border-[0.5px] border-red-700" />
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Wishes;
