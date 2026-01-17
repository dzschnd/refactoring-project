//TODO: figure out if user's sending all of the group on each update, or adding single entries.
//TODO: if latter, validate unique positions against db

import {getAllFormAnswersQuery} from "../queries/InvitationQueries.js";

export const uniquePositionValidator = (groupByField) => {
    return async (value) => {
        if (!value || !Array.isArray(value)) return;

        const positionsMap = {};

        if (value) {
            for (const item of value) {
                const groupValue = item[groupByField];
                const position = item.position;

                if (!positionsMap[groupValue]) {
                    positionsMap[groupValue] = new Set();
                }

                if (positionsMap[groupValue].has(position)) {
                    throw new Error();
                }

                positionsMap[groupValue].add(position);
            }
        }
    };
};


export const publishedQuestionConstraintsValidation = () => {
    return async (value, { req }) => {
        const answerMap = new Map();

        if (req.body.answers) {
            req.body.answers.forEach(answer => {
                answerMap.set(answer.questionPosition, answer.answer);
            });
        }

        if (value) {
            value.forEach(question => {
                const questionType = question.type;
                const questionPosition = question.position;

                const answer = answerMap.get(questionPosition);

                if (questionType === 'SELECT' || questionType === 'CHECKBOX') {
                    if (!answer) {
                        throw new Error(`Question at position ${questionPosition} is of type ${questionType} and must have an associated answer.`);
                    }
                }

                if (questionType === 'TEXT') {
                    if (answer) {
                        throw new Error(`Question at position ${questionPosition} is of type ${questionType} and must not have an associated answer.`);
                    }
                }
            });
        }
    };
};

export const updatedQuestionConstraintsValidation = () => {
    return  async (value, { req }) => {
        try {
            const answerMap = new Map();
            const existingAnswers = await getAllFormAnswersQuery(req.params.id);

            if (existingAnswers.length > 0) {
                existingAnswers.forEach(question => {
                    answerMap.set(question.position, question.type);
                });
            }

            if (req.body.answers) {
                req.body.answers.forEach(answer => {
                    answerMap.set(answer.questionPosition, answer.answer);
                });
            }

            if (value) {
                value.forEach(question => {
                    const questionType = question.type;
                    const questionPosition = question.position;

                    const answer = answerMap.get(questionPosition);

                    if (questionType === 'TEXT') {
                        if (answer) {
                            throw new Error(`Question at position ${questionPosition} is of type ${questionType} and must not have an associated answer.`);
                        }
                    }
                });
            }

        } catch (err) {
            throw new Error(`${err.message}`);
        }
    }
};
