import type { QuestionType } from "@prisma/client";

export interface ColorDTO {
  colorCode: string;
  position: number;
}

export interface PlaceDTO {
  address: string | null;
  placeImage: string | null;
  link: string | null;
}

export interface PlanItemDTO {
  eventTime: string;
  description: string;
  position: number;
}

export interface WishDTO {
  wish: string;
  position: number;
}

export interface QuestionDTO {
  question: string;
  type: QuestionType;
  position: number;
}

export interface AnswerDTO {
  answer: string;
  questionPosition: number;
  position: number;
}

export interface DraftUpdateDTO {
  firstPartnerName?: string | null;
  secondPartnerName?: string | null;
  coupleImage?: string | null;
  eventDate?: string | null;
  templateName?: string | null;
  colors?: ColorDTO[] | null;
  place?: PlaceDTO | null;
  planItems?: PlanItemDTO[] | null;
  wishes?: WishDTO[] | null;
  questions?: QuestionDTO[] | null;
  answers?: AnswerDTO[] | null;
}

export interface GuestAnswerDTO {
  questionPosition: number;
  answer: string;
}

export interface InvitationDetailsDTO {
  id: number;
  firstPartnerName: string | null;
  secondPartnerName: string | null;
  coupleImage: string | null;
  authorId: number;
  templateName: string;
  eventDate: string | null;
  isPublished: boolean;
  colors: ColorDTO[] | null;
  place: PlaceDTO | null;
  planItems: PlanItemDTO[] | null;
  wishes: WishDTO[] | null;
  questions: Array<{
    id: number;
    question: string;
    position: number;
    type: QuestionType;
  }> | null;
  answers: AnswerDTO[] | null;
}

export interface LoginUserDTO {
  id: number;
  email: string;
  name: string | null;
  verified: boolean;
}
