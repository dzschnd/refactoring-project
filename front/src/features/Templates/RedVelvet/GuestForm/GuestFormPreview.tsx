import { FC } from "react";
import { QuestionType } from "../../../../types";

interface GuestFormProps {
  questions: {
    question: string;
    type: QuestionType;
    position: number;
  }[];
  answers: {
    answer: string;
    questionPosition: number;
    position: number;
  }[];
  scale: (value: number) => string;
  isMobile: boolean;
}

const GuestFormPreview: FC<GuestFormProps> = ({
  questions,
  answers,
  scale,
  isMobile,
}) => {
  return (
    <div
      className="mx-auto flex w-full flex-col items-center font-playfair"
      style={{
        maxWidth: scale(isMobile ? 360 : 466),
        gap: `${scale(30)}`,
        paddingInline: scale(20),
      }}
    >
      <h2
        className="font-playfair font-light text-grey-500"
        style={{
          fontSize: scale(32),
        }}
      >
        АНКЕТА ГОСТЯ
      </h2>
      <h3
        className="text-center font-montserrat font-light text-grey-500"
        style={{
          fontSize: scale(16),
        }}
      >
        Пожалуйста, подтвердите своё присутствие на нашем торжестве до 15 мая
        2025 года. Это поможет нам лучше организовать праздник!
      </h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="flex flex-col font-montserrat"
        style={{
          marginTop: scale(40),
          gap: scale(40),
          maxWidth: scale(366),
        }}
      >
        <div
          className="flex flex-col gap-5 text-400"
          style={{
            fontSize: scale(16),
          }}
        >
          <label htmlFor="names-input" className="font-medium">
            Имя и Фамилия
          </label>
          <p className="font-light">
            Если будете с парой или семьей, напишите их имена
          </p>
          <input
            autoComplete={"off"}
            id="names-input"
            type="text"
            className="border-b-[1px] bg-beige font-light placeholder:text-grey-200 focus:outline-none"
            style={{
              height: scale(27),
              borderBottomWidth: scale(1),
            }}
            placeholder="Биба и Боба, с Бубой, 6 лет"
          />
        </div>

        <div
          className="flex flex-col"
          style={{
            gap: scale(20),
            fontSize: scale(16),
          }}
        >
          <label htmlFor="attendance" className="font-medium">
            Присутствие на торжестве
          </label>
          <p className="font-light">
            Пожалуйста, подтвердите, если вы сможете присоединиться к нам
          </p>
          <div
            className="flex flex-col"
            style={{
              gap: scale(10),
            }}
          >
            <div className="relative flex items-center">
              <input
                autoComplete={"off"}
                id="attendance-true-radio"
                type="radio"
                name="attendance"
                className="cursor-pointer appearance-none rounded-full border-[1px] border-grey-400 checked:bg-grey-400 checked:shadow-[inset_0_0_0_3px_white] hover:border-black focus:border-grey-400"
                style={{
                  height: scale(18),
                  width: scale(18),
                }}
              />
              <label
                htmlFor="attendance-true-radio"
                className="cursor-pointer font-light text-grey-500"
                style={{
                  fontSize: scale(14),
                  paddingLeft: scale(10),
                }}
              >
                Да, мы придем
              </label>
            </div>
            <div className="flex items-center">
              <input
                autoComplete={"off"}
                id="attendance-false-radio"
                type="radio"
                name="attendance"
                className="cursor-pointer appearance-none rounded-full border-[1px] border-grey-400 checked:bg-grey-400 checked:shadow-[inset_0_0_0_3px_white] hover:border-black focus:border-grey-400"
                style={{
                  height: scale(18),
                  width: scale(18),
                }}
              />
              <label
                htmlFor="attendance-false-radio"
                className="cursor-pointer font-light text-grey-500"
                style={{
                  fontSize: scale(14),
                  paddingLeft: scale(10),
                }}
              >
                К сожалению, не получится
              </label>
            </div>
          </div>
        </div>

        {[...questions]
          .sort((a, b) => a.position - b.position)
          .map((question) => (
            <div
              key={question.position}
              className="flex flex-col"
              style={{
                gap: scale(20),
                fontSize: scale(16),
              }}
            >
              <label
                htmlFor={`question-${question.position}`}
                className="break-after-all whitespace-normal font-medium"
              >
                {question.question}
              </label>
              <div
                className="flex flex-col"
                style={{
                  gap: scale(12),
                }}
              >
                {question.type === QuestionType.TEXT && (
                  <input
                    autoComplete={"off"}
                    id={`question-${question.position}`}
                    type="text"
                    className="border-b-[1px] bg-beige font-light placeholder:text-grey-200 focus:outline-none"
                    style={{
                      height: scale(27),
                      borderBottomWidth: scale(1),
                    }}
                    placeholder="Ваш ответ"
                  />
                )}
                {answers &&
                  question.type !== QuestionType.TEXT &&
                  [...answers]
                    .filter(
                      (answer) => answer.questionPosition === question.position,
                    )
                    .sort((a, b) => a.position - b.position)
                    .map((answer) => (
                      <div key={answer.position} className="flex items-center">
                        {(question.type === QuestionType.CHECKBOX && (
                          <input
                            autoComplete={"off"}
                            id={`${answer.questionPosition}-${answer.position}`}
                            type="checkbox"
                            className="cursor-pointer appearance-none border-[1px] border-grey-400 checked:bg-checkmark checked:bg-cover hover:border-black focus:border-grey-400"
                            style={{
                              minHeight: scale(20),
                              minWidth: scale(20),
                            }}
                          />
                        )) || (
                          <input
                            autoComplete={"off"}
                            id={`${answer.questionPosition}-${answer.position}`}
                            type="radio"
                            name={`answer-${answer.position}-for-question-${answer.questionPosition}`}
                            className="cursor-pointer appearance-none rounded-full border-[1px] border-grey-400 checked:bg-grey-400 checked:shadow-[inset_0_0_0_3px_white] hover:border-black focus:border-grey-400"
                            style={{
                              minHeight: scale(20),
                              minWidth: scale(20),
                            }}
                          />
                        )}
                        <label
                          htmlFor={`${answer.questionPosition}-${answer.position}`}
                          className="cursor-pointer break-after-all whitespace-normal text-grey-500"
                          style={{
                            fontSize: scale(14),
                            paddingLeft: scale(10),
                          }}
                        >
                          {answer.answer}
                        </label>
                      </div>
                    ))}
              </div>
            </div>
          ))}

        <button
          className="bg-grey-300 font-normal leading-[1.5] text-white"
          style={{
            width: "100%",
            borderRadius: scale(30),
            fontSize: scale(16),
            paddingBlock: scale(16),
          }}
          disabled
        >
          Отправить
        </button>
      </form>
    </div>
  );
};

export default GuestFormPreview;
