import type { Prisma, PrismaClient } from "@prisma/client";
import prisma from "../config/prisma.js";
import type { InvitationDetailsDTO } from "../types/dto.js";

type TxClient = Prisma.TransactionClient;

export const getInvitationDetails = async (
  invitationId: number | string,
  isPublished: boolean,
  client: TxClient | PrismaClient = prisma,
): Promise<InvitationDetailsDTO | null> => {
  const id = Number(invitationId);
  const invitation = await client.invitation.findFirst({
    where: { id: id, isPublished: isPublished },
    include: {
      template: true,
      place: true,
      invitationColors: {
        include: { color: true },
        orderBy: { position: "asc" },
      },
      planItems: { orderBy: { position: "asc" } },
      wishes: { orderBy: { position: "asc" } },
      questions: { orderBy: { position: "asc" } },
      answers: { orderBy: { position: "asc" } },
    },
  });

  if (!invitation) {
    return null;
  }

  const formattedPlace = invitation.place
    ? {
        address: invitation.place.address,
        link: invitation.place.link,
        placeImage: invitation.place.placeImage,
      }
    : null;

  const formattedPlanItems =
    invitation.planItems.length > 0
      ? invitation.planItems.map((item) => {
          const [hours, minutes] = item.eventTime.split(":");
          return {
            position: item.position,
            description: item.description,
            eventTime: `${hours}:${minutes}`,
          };
        })
      : null;

  const formattedColors =
    invitation.invitationColors.length > 0
      ? invitation.invitationColors.map((ic) => {
          return {
            position: ic.position,
            colorCode: ic.color.colorCode,
          };
        })
      : null;

  const questions =
    invitation.questions.length > 0
      ? invitation.questions.map((question) => {
          return {
            id: question.id,
            question: question.question,
            position: question.position,
            type: question.type,
          };
        })
      : null;

  const formattedAnswers =
    invitation.answers.length > 0
      ? invitation.answers.map((answer) => {
          const question = invitation.questions.find((q) => q.id === answer.questionId);
          return {
            position: answer.position,
            answer: answer.answer,
            questionPosition: question ? question.position : 0,
          };
        })
      : null;

  const eventDate = invitation.eventDate ? invitation.eventDate.toISOString().split("T")[0] : null;

  return {
    id: invitation.id,
    firstPartnerName: invitation.partner1Name,
    secondPartnerName: invitation.partner2Name,
    coupleImage: invitation.coupleImage,
    authorId: invitation.authorId,
    templateName: invitation.template.name,
    eventDate: eventDate,
    isPublished: invitation.isPublished,
    colors: formattedColors,
    place: formattedPlace,
    planItems: formattedPlanItems,
    wishes: invitation.wishes.length === 0 ? null : invitation.wishes,
    questions: questions,
    answers: formattedAnswers,
  };
};
