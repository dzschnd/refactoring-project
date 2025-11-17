import { FC } from "react";

const Wishes: FC = () => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="gap-[30px] text-center font-primary text-800 font-light leading-[1.2] text-grey-300 md:text-900">
        Пожелания
      </h1>
      <div className="font-grey-500 mt-10 flex max-w-[366px] flex-col gap-[25px] text-center font-primary text-400 font-light leading-[1.4]">
        <p>
          Если вдруг не сможете удержаться и полезете в караоке с песнями в
          стиле 'Мурка' — не переживайте! Заранее договорились с ведущим, что в
          самые ответственные моменты он выключит микрофон.
        </p>
        <p>
          Отличный подарок для нас — это запасная печень. Но если ее нет, то
          хотя бы возьмите с собой крепкую закуску, чтобы не терять сознание
          раньше, чем зажжется свет!
        </p>
        <p>
          Просьба оставлять нежные чувства и диеты у дверей — сегодня никто не
          уйдет трезвым, голодным и с сохраненной репутацией!
        </p>
      </div>
    </div>
  );
};

export default Wishes;
