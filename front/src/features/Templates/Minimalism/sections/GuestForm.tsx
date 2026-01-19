import { useEffect, useRef, useState } from "react";
import type { FC } from "react";
import type { TemplateGuestFormProps } from "../../../../types";
import { QuestionType } from "../../../../types";
import { getScrollbarWidth } from "../../../../utils/getScrollbarWidth";
import { submitGuestAnswers } from "../../../../api/service/InvitationService";
import { useCloseOnClickOutside } from "../../../../hooks/useCloseOnClickOutside";
import FormErrorMessage from "../../../../components/FormErrorMessage";
import { GUEST_FORM_EMPTY } from "../../../../api/messages";
import { GuestFormSentPopup } from "../../GuestFormSentPopup";
import { Button } from "../components/Button";
import { ISO2TextRuLong } from "../../../../utils/dateUtils";
import type { StateError } from "../../../../types";

export const GuestForm: FC<TemplateGuestFormProps> = ({
  id,
  questions,
  answers,
  eventDate,
  guestFormDisabled,
  scale,
  isMobile,
}) => {
  const formattedDate = ISO2TextRuLong(eventDate);
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
    const error = response as StateError | undefined;
    if (!error?.status) {
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
    <div>
      {isPopupOpen && (
        <GuestFormSentPopup
          popupRef={popupRef}
          setIsPopupOpen={setIsPopupOpen}
        />
      )}
      <div
        className="flex flex-col items-center"
        style={{ gap: scale(40), maxWidth: isMobile ? scale(330) : scale(392) }}
      >
        <div>
          <h2
            className="text-center font-minimalism--primary font-light leading-[1.2] text-minimalism--primary"
            style={{ fontSize: scale(32), marginBottom: scale(30) }}
          >
            Анкета гостя
          </h2>
          {/*TODO: ask if text wrapping is okay*/}
          <p
            className="text-center font-minimalism--tertiary font-light leading-[1.6] tracking-[-0.02em] text-minimalism--primary"
            style={{
              fontSize: scale(16),
            }}
          >
            Пожалуйста, подтвердите своё присутствие на нашем торжестве до{" "}
            <span
              className={
                "font-minimalism--tertiary font-bold leading-[1.4] tracking-[-0.02em]"
              }
            >
              {formattedDate}.
            </span>{" "}
            Это поможет нам лучше организовать праздник!
          </p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void onSubmit();
          }}
          className="flex flex-col"
          style={{ gap: scale(40) }}
        >
          <div className="relative flex flex-col" style={{ gap: scale(20) }}>
            <label
              htmlFor="names-input"
              className="font-minimalism--secondary font-semibold leading-[1.4] tracking-[-0.02em] text-minimalism--primary"
              style={{ fontSize: scale(16) }}
            >
              Имя и Фамилия
            </label>
            <p
              className="font-minimalism--secondary font-light leading-[1.6] tracking-[-0.02em] text-minimalism--primary"
              style={{ fontSize: scale(16) }}
            >
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
              className="border-b-[1px] border-b-grey-100 bg-beige bg-transparent font-minimalism--secondary font-light leading-[1.4] tracking-[-0.02em] placeholder:text-grey-200 focus:outline-none"
              style={{ fontSize: scale(16) }}
              placeholder="Биба и Боба, с Бубой, 6 лет"
            />
            {isSubmittedGuestNameEmpty && (
              <FormErrorMessage message={GUEST_FORM_EMPTY} />
            )}
          </div>

          <div className="relative flex flex-col" style={{ gap: scale(20) }}>
            <label
              htmlFor="names-input"
              className="font-minimalism--secondary font-semibold leading-[1.4] tracking-[-0.02em] text-minimalism--primary"
              style={{ fontSize: scale(16) }}
            >
              Присутствие на торжестве
            </label>
            <div className="flex flex-col" style={{ gap: scale(10) }}>
              <div className="flex items-center">
                <input
                  autoComplete={"off"}
                  id="attendance-true-radio"
                  type="radio"
                  name="attendance"
                  checked={isComing}
                  onChange={() => setIsComing(true)}
                  className="cursor-pointer appearance-none rounded-full border-[1px] border-grey-400 checked:bg-grey-400 hover:border-black focus:border-grey-400"
                  style={{
                    height: scale(18),
                    width: scale(18),
                    boxShadow: isComing
                      ? `inset 0 0 0 ${scale(3)} white`
                      : "none",
                  }}
                />
                <label
                  htmlFor="attendance-true-radio"
                  className="cursor-pointer font-minimalism--secondary font-light leading-[1.6] tracking-[-0.02em] text-minimalism--primary"
                  style={{ paddingLeft: scale(10), fontSize: scale(16) }}
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
                  className="cursor-pointer appearance-none rounded-full border-[1px] border-grey-400 checked:bg-grey-400 hover:border-black focus:border-grey-400"
                  style={{
                    height: scale(18),
                    width: scale(18),
                    boxShadow: !isComing
                      ? `inset 0 0 0 ${scale(3)} white`
                      : "none",
                  }}
                />
                <label
                  htmlFor="attendance-false-radio"
                  className="cursor-pointer font-minimalism--secondary font-light leading-[1.6] tracking-[-0.02em] text-minimalism--primary"
                  style={{ paddingLeft: scale(10), fontSize: scale(16) }}
                >
                  К сожалению, не получится
                </label>
              </div>
            </div>
          </div>

          {questions &&
            [...questions]
              .sort((a, b) => a.position - b.position)
              .map((question) => (
                <div
                  key={question.position}
                  className="relative flex flex-col gap-5 font-minimalism--secondary"
                  style={{ gap: scale(20) }}
                >
                  <label
                    htmlFor={`question-${question.position}`}
                    className="whitespace-normal break-words font-semibold leading-[1.4] tracking-[-0.02] text-minimalism--primary"
                    style={{ fontSize: scale(16) }}
                  >
                    {question.question}
                  </label>
                  <div className="flex flex-col" style={{ gap: scale(10) }}>
                    {question.type === QuestionType.TEXT && (
                      <input
                        autoComplete={"off"}
                        id={`question-${question.position}`}
                        type="text"
                        className="border-b-[1px] border-b-grey-100 bg-beige bg-transparent font-minimalism--secondary font-light leading-[1.4] tracking-[-0.02em] placeholder:text-grey-200 focus:outline-none"
                        style={{ fontSize: scale(16) }}
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
                                name={`answer-to-question-${answer.questionPosition}`}
                                type="checkbox"
                                onChange={(e) =>
                                  handleCheckboxAnswerChange(
                                    question.position,
                                    answer.answer,
                                    e.target.checked,
                                  )
                                }
                                className="cursor-pointer appearance-none border-[1px] border-grey-400 checked:bg-checkmark checked:bg-cover hover:border-black focus:border-grey-400"
                                style={{
                                  minHeight: scale(18),
                                  minWidth: scale(18),
                                }}
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
                                name={`answer-to-question-${answer.questionPosition}`}
                                className="cursor-pointer appearance-none rounded-full border-grey-400 checked:bg-grey-400 hover:border-black focus:border-grey-400"
                                style={{
                                  borderWidth: scale(1),
                                  minHeight: scale(18),
                                  minWidth: scale(18),
                                  boxShadow: selectedAnswers.find(
                                    (a) =>
                                      a.questionPosition ===
                                        answer.questionPosition &&
                                      a.answer === answer.answer,
                                  )
                                    ? `inset 0 0 0 ${scale(3)} white`
                                    : "none",
                                }}
                              />
                            )}
                            <label
                              htmlFor={`${answer.questionPosition}-${answer.position}`}
                              className="cursor-pointer break-words font-minimalism--secondary font-light leading-[1.6] tracking-[-0.02] text-minimalism--primary"
                              style={{
                                paddingLeft: scale(10),
                                fontSize: scale(16),
                              }}
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

          <div
            className={"flex items-center justify-center"}
            style={{ height: scale(115), marginBlock: scale(-0) }}
          >
            <Button
              buttonText={"Как добраться"}
              disabled={guestFormDisabled}
              scale={scale}
            />
          </div>
        </form>
      </div>
    </div>
  );
};
