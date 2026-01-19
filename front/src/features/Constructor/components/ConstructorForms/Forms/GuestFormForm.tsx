import type { FC } from "react";
import FormLayout from "../../../layouts/FormLayout";
import plusIcon from "../../../../../assetsOld/buttonIcons/plus.png";
import type { QuestionType } from "../../../../../types";
import type { AppDispatch, RootState } from "../../../../../api/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { updateLocalDraft } from "../../../../../api/redux/slices/draftSlice";
import { updateDraft } from "../../../../../api/service/DraftService";
import GuestFormInput from "../Inputs/GuestFormInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { draftUpdateBaseSchema } from "../../../../../shared/schemas/draft";

interface FormInput {
  questions:
    | {
        question: string;
        type: QuestionType;
        position: number;
      }[]
    | null;
  answers:
    | {
        answer: string;
        questionPosition: number;
        position: number;
      }[]
    | null;
}

type AnswerFormValue = NonNullable<FormInput["answers"]>[number];

const guestFormSchema = draftUpdateBaseSchema.pick({
  questions: true,
  answers: true,
});

const GuestFormForm: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { id, questions, answers } = useSelector(
    (state: RootState) => state.draft,
  );

  const { control, getValues, setValue } = useForm<FormInput>({
    resolver: zodResolver(guestFormSchema),
    defaultValues: questions
      ? {
          questions: [...questions].sort((a, b) => a.position - b.position),
          answers: answers
            ? [...answers].sort((a, b) => a.position - b.position)
            : null,
        }
      : {
          questions: [
            {
              question: "",
              type: QuestionType.CHECKBOX,
              position: 0,
            },
          ],
          answers: [],
        },
  });

  const {
    fields: questionFields,
    append: appendQuestion,
    remove: removeQuestion,
  } = useFieldArray({
    control,
    name: "questions",
  });

  const {
    fields: answerFields,
    append: appendAnswer,
    remove: removeAnswer,
  } = useFieldArray({
    control,
    name: "answers",
  });

  const handleUpdateLocalDraft = () => {
    const updatedQuestions = getValues("questions");
    if (!updatedQuestions) return;
    const updatedQuestionsFiltered = updatedQuestions.filter(
      (q) => q.question !== "",
    );

    const formData = updatedQuestionsFiltered.map((q, i) => ({
      thisQuestion: q,
      answers: answerFields
        .filter((answer) => answer.questionPosition === i)
        .map((answer) => ({
          answer: answer.answer.trim(),
          position: answer.position,
          questionPosition: i,
        })),
    }));

    const questions = formData.map((item) => ({
      question: item.thisQuestion.question.trim(),
      type: item.thisQuestion.type,
      position: item.thisQuestion.position,
    }));

    const answers = formData.flatMap((item) =>
      item.answers
        .filter((a) => a.answer.trim() !== "")
        .map((answer) => ({
          answer: answer.answer.trim(),
          questionPosition: item.thisQuestion.position,
          position: answer.position,
        })),
    );

    dispatch(
      updateLocalDraft({
        questions: questions,
        answers: answers,
      }),
    );
  };

  const handleUpdateDraft = async () => {
    const updatedQuestions = getValues("questions");
    if (!updatedQuestions) return;
    const updatedQuestionsFiltered = updatedQuestions.filter(
      (q) => q.question.trim() !== "",
    );

    const formData = updatedQuestionsFiltered.map((q, i) => ({
      thisQuestion: q,
      answers: answerFields
        .filter((answer) => answer.questionPosition === i)
        .filter(() => q.type !== QuestionType.TEXT)
        .map((answer) => ({
          answer: answer.answer.trim(),
          position: answer.position,
          questionPosition: i,
        })),
    }));

    const questions = formData.map((item) => ({
      question: item.thisQuestion.question.trim(),
      type: item.thisQuestion.type,
      position: item.thisQuestion.position,
    }));

    const answers = formData.flatMap((item) =>
      item.answers
        .filter((a) => a.answer.trim() !== "")
        .map((answer) => ({
          answer: answer.answer.trim(),
          questionPosition: item.thisQuestion.position,
          position: answer.position,
        })),
    );

    await dispatch(
      updateDraft({
        id: id,
        questions: questions,
        answers: answers,
      }),
    );
  };

  const handleRemoveQuestion = async (questionIndex: number) => {
    removeQuestion(questionIndex);

    const updatedAnswers = getValues("answers");
    const answersToRemove = updatedAnswers
      ? [...updatedAnswers]
          .map((answer, index) => ({ ...answer, formIndex: index }))
          .filter((answer) => answer.questionPosition === questionIndex)
      : [];
    for (let i = answersToRemove.length - 1; i >= 0; i--) {
      removeAnswer(answersToRemove[i].formIndex);
    }

    const remainingAnswers = getValues("answers");
    const updatedAnswersWithPositions = remainingAnswers
      ? [...remainingAnswers].map((a) => {
          return a.questionPosition > questionIndex
            ? {
                ...a,
                questionPosition: a.questionPosition - 1,
              }
            : a;
        })
      : [];
    const updatedAnswersFiltered = updatedAnswersWithPositions.filter(
      (answer) => answer.answer !== "",
    );
    const updatedAnswersFilteredWithPositions = updatedAnswersFiltered.map(
      (a, i) => ({
        ...a,
        position: i,
      }),
    );

    const updatedQuestions = getValues("questions");
    const updatedQuestionsWithPositions = updatedQuestions
      ? [...updatedQuestions].map((q, i) => ({
          ...q,
          position: i,
        }))
      : [];
    const updatedQuestionsFiltered = updatedQuestionsWithPositions.filter(
      (q) => q.question !== "",
    );
    const updatedQuestionsFilteredWithPositions = updatedQuestionsFiltered.map(
      (q, i) => ({
        ...q,
        position: i,
      }),
    );

    setValue("questions", updatedQuestionsWithPositions);
    setValue("answers", updatedAnswersWithPositions);

    dispatch(
      updateLocalDraft({
        questions: updatedQuestionsFilteredWithPositions,
        answers: updatedAnswersFilteredWithPositions,
      }),
    );

    await dispatch(
      updateDraft({
        id: id,
        questions: updatedQuestionsFilteredWithPositions,
        answers: updatedAnswersFilteredWithPositions,
      }),
    );
  };

  const handleRemoveAnswer = async (index: number) => {
    removeAnswer(index);

    const updatedAnswers = getValues("answers");
    const updatedAnswersWithPositions = updatedAnswers
      ? updatedAnswers.map((a, i) => ({
          answer: a.answer,
          position: i,
          questionPosition: a.questionPosition,
        }))
      : [];
    const updatedAnswersFiltered = updatedAnswersWithPositions.filter(
      (answer) => answer.answer !== "",
    );
    const updatedAnswersFilteredWithPositions = updatedAnswersFiltered.map(
      (a, i) => ({
        ...a,
        position: i,
      }),
    );

    setValue("answers", updatedAnswersWithPositions);

    dispatch(
      updateLocalDraft({
        questions: questions,
        answers: updatedAnswersFilteredWithPositions,
      }),
    );
    await dispatch(
      updateDraft({
        id: id,
        questions: questions,
        answers: updatedAnswersFilteredWithPositions,
      }),
    );
  };

  return (
    <FormLayout pageIndex={6} description={"Узнайте побольше о ваших гостях!"}>
      {questionFields.map((field, index) => (
        <Controller
          key={field.id}
          control={control}
          name={`questions.${index}`}
          render={({ field }) => (
            <GuestFormInput
              value={{
                question: field.value.question,
                type: field.value.type,
                position: index,
                answers: answerFields
                  .map((answer, answerIndex) => ({
                    answer: answer.answer,
                    position: answerIndex,
                    questionPosition: answer.questionPosition,
                    globalAnswerIndex: answerIndex,
                  }))
                  .filter((answer) => answer.questionPosition === index),
              }}
              questionIndex={index}
              onChange={(value) => {
                const currentAnswers = getValues("answers") || [];

                const updatedAnswers = currentAnswers
                  .filter((answer) => answer.questionPosition !== index)
                  .concat(
                    (value.answers ?? []).map(
                      (answer: AnswerFormValue, answerIndex: number) => ({
                        ...answer,
                        questionPosition: index,
                        position: answerIndex,
                      }),
                    ),
                  );

                setValue(`answers`, updatedAnswers);
                field.onChange(value);
                handleUpdateLocalDraft();
              }}
              onBlur={handleUpdateDraft}
              onRemoveQuestion={() => handleRemoveQuestion(index)}
              onRemoveAnswer={(answerIndex) => handleRemoveAnswer(answerIndex)}
              appendAnswer={() =>
                appendAnswer({
                  answer: "",
                  position: answerFields.length,
                  questionPosition: index,
                })
              }
              placeholder={"Пожелания по напиткам"}
            />
          )}
        />
      ))}

      <button
        type="button"
        className="self-center"
        onClick={() =>
          appendQuestion({
            question: "",
            position: questionFields.length,
            type: QuestionType.CHECKBOX,
          })
        }
      >
        <div className="mb-1 flex items-center gap-1">
          <span className="font-primary text-300 font-normal text-grey-400">
            Добавить вопрос
          </span>
          <img src={plusIcon} alt="Add" className="h-[15px] w-[15px]" />
        </div>
        <div className="h-[1px] w-full bg-grey-400" />
      </button>
    </FormLayout>
  );
};

export default GuestFormForm;
