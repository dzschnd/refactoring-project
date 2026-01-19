import type { FC } from "react";
const GuestForm: FC = () => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="gap-[30px] text-center font-primary text-800 font-light leading-[1.2] text-grey-300 md:text-900">
        Анкета гостя
      </h1>
      <h2 className="mt-[30px] max-w-[290px] text-center font-primary text-400 font-light leading-[1.4] text-black">
        Пожалуйста, подтвердите своё присутствие на нашем торжестве до&nbsp;15
        мая 2025 года. Это поможет нам лучше организовать праздник!
      </h2>
      <form className="font-grey-500 mt-10 flex max-w-[366px] flex-col gap-10">
        <div className="flex flex-col gap-5">
          <label
            htmlFor="names-input"
            className="font-primary text-400 font-medium leading-[1.4]"
          >
            Имя и Фамилия
          </label>
          <p className="font-primary text-400 font-light leading-[1.4]">
            Если будете с парой или семьей, напишите их имена
          </p>
          <input
            autoComplete={"off"}
            id="names-input"
            type="text"
            className="h-[27px] w-full border-b-[1px] border-b-grey-100 font-primary text-400 font-light leading-[1.4] placeholder:text-grey-200 focus:outline-none"
            placeholder="Биба и Боба, с Бубой, 6 лет"
          />
        </div>
        <div className="flex flex-col gap-5">
          <label
            htmlFor="names-input"
            className="font-primary text-400 font-medium leading-[1.4]"
          >
            Присутствие на торжестве
          </label>
          <p className="font-primary text-400 font-light leading-[1.4]">
            Если будете с парой или семьей, напишите их имена
          </p>
          <div className="flex flex-col gap-[15px]">
            <div className="relative">
              <input
                autoComplete={"off"}
                id="attendance-true-radio"
                type="radio"
                name="attendance"
                className="absolute top-1/2 h-[18px] w-[18px] -translate-y-1/2 transform cursor-pointer appearance-none rounded-full border-[1px] border-grey-400 checked:bg-grey-400 checked:shadow-[inset_0_0_0_3px_white] hover:border-black focus:border-grey-400"
              />
              <label
                htmlFor="attendance-true-radio"
                className="ml-10 font-primary text-300 font-normal leading-[1.21] text-grey-500"
              >
                С удовольствием приеду (приедем)
              </label>
            </div>
            <div className="relative">
              <input
                autoComplete={"off"}
                id="attendance-false-radio"
                type="radio"
                name="attendance"
                className="absolute top-1/2 h-[18px] w-[18px] -translate-y-1/2 transform cursor-pointer appearance-none rounded-full border-[1px] border-grey-400 checked:bg-grey-400 checked:shadow-[inset_0_0_0_3px_white] hover:border-black focus:border-grey-400"
              />
              <label
                htmlFor="attendance-false-radio"
                className="ml-10 font-primary text-300 font-normal leading-[1.21] text-grey-500"
              >
                К сожалению, не получится
              </label>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <label
            htmlFor="names-input"
            className="font-primary text-400 font-medium leading-[1.4]"
          >
            Предпочтения по напиткам
          </label>
          <div className="flex flex-col gap-3">
            <div className="relative">
              <input
                autoComplete={"off"}
                id="drink-choice-champaigne"
                type="checkbox"
                name="drink-choice"
                className="absolute top-1/2 h-5 w-5 -translate-y-1/2 transform cursor-pointer appearance-none rounded-[6px] border-[1px] border-grey-400 checked:bg-grey-400 checked:shadow-[inset_0_0_0_3px_white] hover:border-black focus:border-grey-400"
              />
              <label
                htmlFor="drink-choice-champaigne"
                className="ml-10 font-primary text-300 font-normal leading-[1.21] text-grey-500"
              >
                Шампанское
              </label>
            </div>
            <div className="relative">
              <input
                autoComplete={"off"}
                id="drink-choice-beer"
                type="checkbox"
                name="drink-choice"
                className="absolute top-1/2 h-5 w-5 -translate-y-1/2 transform cursor-pointer appearance-none rounded-[6px] border-[1px] border-grey-400 checked:bg-grey-400 checked:shadow-[inset_0_0_0_3px_white] hover:border-black focus:border-grey-400"
              />
              <label
                htmlFor="drink-choice-beer"
                className="ml-10 font-primary text-300 font-normal leading-[1.21] text-grey-500"
              >
                Пиво
              </label>
            </div>
            <div className="relative">
              <input
                autoComplete={"off"}
                id="drink-choice-bubble-tea"
                type="checkbox"
                name="drink-choice"
                className="absolute top-1/2 h-5 w-5 -translate-y-1/2 transform cursor-pointer appearance-none rounded-[6px] border-[1px] border-grey-400 checked:bg-grey-400 checked:shadow-[inset_0_0_0_3px_white] hover:border-black focus:border-grey-400"
              />
              <label
                htmlFor="drink-choice-bubble-tea"
                className="ml-10 font-primary text-300 font-normal leading-[1.21] text-grey-500"
              >
                Бубль ти
              </label>
            </div>
            <div className="relative">
              <input
                autoComplete={"off"}
                id="drink-choice-kompot"
                type="checkbox"
                name="attendance"
                className="absolute top-1/2 h-5 w-5 -translate-y-1/2 transform cursor-pointer appearance-none rounded-[6px] border-[1px] border-grey-400 checked:bg-grey-400 checked:shadow-[inset_0_0_0_3px_white] hover:border-black focus:border-grey-400"
              />
              <label
                htmlFor="drink-choice-kompot"
                className="ml-10 font-primary text-300 font-normal leading-[1.21] text-grey-500"
              >
                Компот из сухофруктов
              </label>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="rounded-[30px] bg-grey-300 py-4 font-primary text-400 font-normal leading-[1.5] text-white"
        >
          Отправить
        </button>
      </form>
    </div>
  );
};

export default GuestForm;
