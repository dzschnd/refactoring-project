import React, { ChangeEvent, FC, useId } from "react";
import { FieldValues } from "react-hook-form";
import TextInput from "./TextInput";
import questionIcon from "../../../../../assetsOld/formIcons/question-circle.png";
import trashIcon from "../../../../../assetsOld/buttonIcons/trash.png";
import { QuestionType } from "../../../../../types";
import QuestionTypeSelect from "./QuestionTypeSelect";
import GuestFormAnswerInput from "./GuestFormAnswerInput";
import plusIcon from "../../../../../assetsOld/buttonIcons/plus.png";

interface AppendAnswerProps {
  answer: string;
  position: number;
  questionPosition: number;
}

interface GuestFormInputProps {
  value?: {
    question: string;
    type: QuestionType;
    position: number;
    answers:
      | {
          answer: string;
          questionPosition: number;
          position: number;
          globalAnswerIndex: number;
        }[]
      | null;
  } | null;
  placeholder: string;
  onChange: (value: FieldValues) => void;
  onBlur: () => void;
  onRemoveAnswer: (globalAnswerIndex: number) => void;
  onRemoveQuestion: () => void;
  appendAnswer: (newAnswer: AppendAnswerProps) => void;
  questionIndex: number;
}

const GuestFormInput: FC<GuestFormInputProps> = ({
  placeholder,
  value,
  onChange,
  onBlur,
  onRemoveAnswer,
  onRemoveQuestion,
  appendAnswer,
  questionIndex,
}) => {
  const baseId = useId();

  return (
    <div className="mb-5 mt-5 flex flex-col gap-10">
      <div className="flex flex-col gap-[15px]">
        <div key={`${baseId}-question`} className="flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <span className="font-primary text-400 font-semibold text-grey-400">
              Вопрос {questionIndex + 1}
            </span>
            <button
              onMouseDown={(e) => e.preventDefault()}
              onClick={onRemoveQuestion}
            >
              <img src={trashIcon} alt="Delete" className="h-6 w-6" />
            </button>
          </div>

          <QuestionTypeSelect
            value={value?.type || QuestionType.CHECKBOX}
            onChange={(newType: QuestionType) => {
              const updatedValue = {
                ...value,
                type: newType,
              };
              onChange(updatedValue);
              onBlur();
            }}
          />

          <TextInput
            placeholder={placeholder}
            label="Введите вопрос"
            icon={questionIcon}
            value={value?.question || ""}
            onChange={(e) => {
              const updatedValue = {
                ...value,
                question: e.target.value,
              };
              onChange(updatedValue);
            }}
            onBlur={onBlur}
          />

          {value?.type !== QuestionType.TEXT && (
            <div className="flex flex-col gap-3">
              {value?.answers?.map(
                (a, answerIndex) =>
                  a.questionPosition === value?.position && (
                    <GuestFormAnswerInput
                      index={answerIndex}
                      key={answerIndex}
                      value={a.answer}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        const updatedAnswers = value.answers?.map(
                          (answer, index) => {
                            if (index === answerIndex) {
                              return { ...answer, answer: e.target.value };
                            }
                            return answer;
                          },
                        );
                        onChange({
                          ...value,
                          answers: updatedAnswers,
                        });
                      }}
                      onBlur={onBlur}
                      onRemove={() => onRemoveAnswer(a.globalAnswerIndex)}
                    />
                  ),
              )}

              <button
                type="button"
                className="self-center"
                onClick={() =>
                  appendAnswer({
                    answer: "",
                    position: value?.answers?.length || 0,
                    questionPosition: value?.position || 0,
                  })
                }
              >
                <div className="mb-1 flex items-center gap-1">
                  <span className="font-primary text-300 font-normal text-grey-400">
                    Добавить ответ
                  </span>
                  <img src={plusIcon} alt="Add" className="h-[15px] w-[15px]" />
                </div>
                <div className="h-[1px] w-full bg-grey-400" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GuestFormInput;
