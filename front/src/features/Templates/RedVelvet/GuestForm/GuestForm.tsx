import { FC, useEffect, useRef, useState } from "react";
import { QuestionType } from "../../../../types";
import { submitGuestAnswers } from "../../../../api/service/InvitationService";
import { GUEST_FORM_EMPTY } from "../../../../api/messages";
import FormErrorMessage from "../../../../components/FormErrorMessage";
import heart from "../../../../assetsOld/guestFormHeart.svg";
import { useCloseOnClickOutside } from "../../../../hooks/useCloseOnClickOutside";
import { getScrollbarWidth } from "../../../../utils/getScrollbarWidth";

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
  guestFormDisabled: boolean;
  id: number;
}

const GuestForm: FC<GuestFormProps> = ({
  questions,
  answers,
  guestFormDisabled,
  id,
}) => {
  const scrollbarWidth = getScrollbarWidth();
  const [guestName, setGuestName] = useState("");
  const [isComing, setIsComing] = useState(true);
  const [selectedAnswers, setSelectedAnswers] = useState<
    { questionPosition: number; answer: string }[]
  >([]);
  const [isSubmittedGuestNameEmpty, setIsSubmittedGuestNameEmpty] =
    useState<boolean>(false);
  const [unansweredQuestionsPositions, setUnansweredQuestionsPositions] =
    useState<number[]>([]);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const popupRef = useRef<HTMLDivElement>(null);

  const onSubmit = async () => {
    setIsSubmittedGuestNameEmpty(!guestName || guestName.trim() === "");

    const unansweredQuestionsPositions = questions
      .filter(
        (question) =>
          !selectedAnswers
            .filter((answer) => answer.answer.trim() !== "")
            .some((answer) => answer.questionPosition === question.position),
      )
      .map((question) => question.position);

    setUnansweredQuestionsPositions(unansweredQuestionsPositions);

    if (
      unansweredQuestionsPositions.length > 0 ||
      !guestName ||
      guestName.trim() === ""
    )
      return;

    const response = await submitGuestAnswers(
      id,
      isComing,
      guestName.trim(),
      selectedAnswers,
    );
    if (!response.status || response.status === 200) {
      setIsPopupOpen(true);
    }
  };

  const handleAnswerChange = (questionPosition: number, answer: string) => {
    setUnansweredQuestionsPositions((prev) =>
      prev.filter((position) => position !== questionPosition),
    );
    setSelectedAnswers((prev) =>
      prev.some((a) => a.questionPosition === questionPosition)
        ? prev.map((a) =>
            a.questionPosition === questionPosition ? { ...a, answer } : a,
          )
        : [...prev, { questionPosition, answer }],
    );
  };

  const handleCheckboxAnswerChange = (
    questionPosition: number,
    answer: string,
    isChecked: boolean,
  ) => {
    setUnansweredQuestionsPositions((prev) =>
      prev.filter((position) => position !== questionPosition),
    );
    setSelectedAnswers((prev) => {
      if (isChecked) {
        return [...prev, { questionPosition, answer }];
      } else {
        return prev.filter(
          (a) =>
            !(a.questionPosition === questionPosition && a.answer === answer),
        );
      }
    });
  };

  useCloseOnClickOutside({
    popupRef: popupRef,
    setIsPopupOpenAction: setIsPopupOpen,
  });

  useEffect(() => {
    window.document.body.style.overflow = isPopupOpen ? "hidden" : "";
    window.document.body.style.marginRight = isPopupOpen
      ? `${scrollbarWidth}px`
      : "0";
  }, [isPopupOpen, scrollbarWidth]);

  return (
    <>
      {isPopupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-grey-700--opaque backdrop-blur-[4px]">
          <div
            ref={popupRef}
            className="flex h-[232px] w-[321px] flex-col items-center justify-center gap-5 rounded-[20px] bg-white p-[30px]"
          >
            <img alt="" src={heart} className="h-[22px] w-[28px]" />
            <div className="flex flex-col gap-2.5 text-center">
              <strong className="text-300 font-bold text-grey-500">
                Спасибо за заполнение анкеты!
              </strong>
              <p className="text-300 text-grey-500">
                Ваши ответы уже переданы молодоженам
              </p>
            </div>
            <button
              className="min-h-10 w-full rounded-[30px] bg-grey-300 text-400 font-semibold text-white"
              onClick={() => setIsPopupOpen(false)}
            >
              Хорошо!
            </button>
          </div>
        </div>
      )}
      <div className="flex max-w-[320px] flex-col items-center gap-[30px] md:max-w-[426px]">
        <h2 className="font-playfair text-900 font-light leading-[1.2] text-grey-500">
          АНКЕТА ГОСТЯ
        </h2>
        <h3 className="text-center font-montserrat text-400 font-light text-grey-500">
          Пожалуйста, подтвердите своё присутствие на нашем торжестве до 15 мая
          2025 года. Это поможет нам лучше организовать праздник!
        </h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit().then();
          }}
          className="font-grey-500 mt-10 flex max-w-[366px] flex-col gap-10 font-montserrat"
        >
          <div className="relative flex flex-col gap-5 text-400">
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
              value={guestName}
              onChange={(e) => {
                setGuestName(e.target.value);
                setIsSubmittedGuestNameEmpty(false);
              }}
              className="h-[27px] w-full border-b-[1px] border-b-grey-100 bg-beige font-light placeholder:text-grey-200 focus:outline-none"
              placeholder="Биба и Боба, с Бубой, 6 лет"
            />
            {isSubmittedGuestNameEmpty && (
              <FormErrorMessage message={GUEST_FORM_EMPTY} />
            )}
          </div>

          <div className="flex flex-col gap-5">
            <label htmlFor="attendance" className="text-400 font-medium">
              Присутствие на торжестве
            </label>
            <p className="text-400 font-light leading-[1.4]">
              Пожалуйста, подтвердите, если вы сможете присоединиться к нам
            </p>
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center">
                <input
                  autoComplete={"off"}
                  id="attendance-true-radio"
                  type="radio"
                  name="attendance"
                  checked={isComing}
                  onChange={() => setIsComing(true)}
                  className="h-[18px] w-[18px] cursor-pointer appearance-none rounded-full border-[1px] border-grey-400 checked:bg-grey-400 checked:shadow-[inset_0_0_0_3px_white] hover:border-black focus:border-grey-400"
                />
                <label
                  htmlFor="attendance-true-radio"
                  className="cursor-pointer pl-2.5 text-300 font-light text-grey-500"
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
                  checked={!isComing}
                  onChange={() => setIsComing(false)}
                  className="h-[18px] w-[18px] cursor-pointer appearance-none rounded-full border-[1px] border-grey-400 checked:bg-grey-400 checked:shadow-[inset_0_0_0_3px_white] hover:border-black focus:border-grey-400"
                />
                <label
                  htmlFor="attendance-false-radio"
                  className="cursor-pointer pl-2.5 text-300 font-light text-grey-500"
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
                className="relative flex flex-col gap-5 font-montserrat"
              >
                <label
                  htmlFor={`question-${question.position}`}
                  className="whitespace-normal break-all text-400 font-medium"
                >
                  {question.question}
                </label>
                <div className="flex flex-col gap-3">
                  {question.type === QuestionType.TEXT && (
                    <input
                      autoComplete={"off"}
                      id={`question-${question.position}`}
                      type="text"
                      className="h-[27px] w-full border-b-[1px] border-b-grey-100 bg-beige font-light placeholder:text-grey-200 focus:outline-none"
                      placeholder="Ваш ответ"
                      onChange={(e) =>
                        handleAnswerChange(question.position, e.target.value)
                      }
                    />
                  )}
                  {answers &&
                    question.type !== QuestionType.TEXT &&
                    [...answers]
                      .filter(
                        (answer) =>
                          answer.questionPosition === question.position,
                      )
                      .sort((a, b) => a.position - b.position)
                      .map((answer) => (
                        <div
                          key={answer.position}
                          className="flex items-center"
                        >
                          {(question.type === QuestionType.CHECKBOX && (
                            <input
                              autoComplete={"off"}
                              id={`${answer.questionPosition}-${answer.position}`}
                              type="checkbox"
                              onChange={(e) =>
                                handleCheckboxAnswerChange(
                                  question.position,
                                  answer.answer,
                                  e.target.checked,
                                )
                              }
                              className="h-[18px] w-[18px] cursor-pointer appearance-none border-[1px] border-grey-400 checked:bg-checkmark checked:bg-cover hover:border-black focus:border-grey-400"
                            />
                          )) || (
                            <input
                              autoComplete={"off"}
                              id={`${answer.questionPosition}-${answer.position}`}
                              type="radio"
                              onChange={() =>
                                handleAnswerChange(
                                  question.position,
                                  answer.answer,
                                )
                              }
                              name={`answer-${answer.position}-for-question-${answer.questionPosition}`}
                              className="h-[18px] w-[18px] cursor-pointer appearance-none rounded-full border-[1px] border-grey-400 checked:bg-grey-400 checked:shadow-[inset_0_0_0_3px_white] hover:border-black focus:border-grey-400"
                            />
                          )}
                          <label
                            htmlFor={`${answer.questionPosition}-${answer.position}`}
                            className="cursor-pointer whitespace-normal break-all pl-2.5 font-primary text-300 font-light text-grey-500"
                          >
                            {answer.answer}
                          </label>
                        </div>
                      ))}
                </div>
                {unansweredQuestionsPositions.some(
                  (position) => position === question.position,
                ) && <FormErrorMessage message={GUEST_FORM_EMPTY} />}
              </div>
            ))}

          <button
            className="rounded-[30px] bg-grey-300 py-4 font-primary text-400 font-normal leading-[1.5] text-white"
            disabled={guestFormDisabled}
          >
            Отправить
          </button>
        </form>
      </div>
    </>
  );
};

export default GuestForm;
