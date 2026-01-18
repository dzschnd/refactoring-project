export type {
  ColorDTO,
  PlaceDTO,
  PlanItemDTO,
  WishDTO,
  QuestionDTO,
  AnswerDTO,
  DraftUpdateRequest as DraftUpdateDTO,
  GuestAnswerDTO,
  InvitationDetailsDTO,
  QuestionType,
} from "../shared/types.js";

export interface LoginUserDTO {
  id: number;
  email: string;
  name: string | null;
  verified: boolean;
}
