import type { CSSProperties } from "react";
import type {
  DraftUpdateRequest,
  QuestionType as QuestionTypeType,
} from "./shared/types";
import { QuestionType as QuestionTypeConst } from "./shared/types";

export const QuestionType = QuestionTypeConst;
export type QuestionTypeValue = QuestionTypeType;

export type AuthPage =
  | "LOGIN"
  | "REGISTER"
  | "REGISTER_OTP_INPUT"
  | "PASSWORD_RESET_OTP_INPUT"
  | "REGISTER_SUCCESS"
  | "FORGOT_PASSWORD"
  | "PASSWORD_RESET"
  | "PASSWORD_RESET_SUCCESS";

export interface Color {
  colorCode: string;
  position: number;
}

export interface StateError {
  message: string;
  status: number;
}

export interface DraftState {
  lastViewedConstructorBlock: string;
  loading: boolean;
  error: StateError | null;
  id: number;
  firstPartnerName: string | null;
  secondPartnerName: string | null;
  coupleImage: string | null;
  eventDate: string | null;
  place: {
    address: string | null;
    placeImage: string | null;
    link: string | null;
  };
  templateName: string | null;
  colors:
    | {
        colorCode: string;
        position: number;
      }[]
    | null;
  prevColors:
    | {
        colorCode: string;
        position: number;
      }[]
    | null;
  planItems:
    | {
        eventTime: string;
        description: string;
        position: number;
      }[]
    | null;
  wishes:
    | {
        wish: string;
        position: number;
      }[]
    | null;
  prevWishes:
    | {
        wish: string;
        position: number;
      }[]
    | null;
  questions:
    | {
        question: string;
        type: QuestionTypeType;
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

export interface CardInfo {
  id: number;
  firstPartnerName: string | null;
  secondPartnerName: string | null;
  coupleImage: string | null;
  eventDate: string | null;
  templateName: string;
}

export type UpdateDraftPayload = DraftUpdateRequest & { id: number };

export interface PreviewProps {
  width: number;
  height: number;
  isMobile: boolean;
  block?: string;
}

export interface TemplateProps {
  style?: CSSProperties;
  firstPartnerName: string;
  secondPartnerName: string;
  coupleImage?: string;
  eventDate: string;
  place: {
    address: string;
    placeImage?: string;
    link: string;
  };
  colors:
    | {
        colorCode: string;
        position: number;
      }[]
    | null;
  planItems: {
    eventTime: string;
    description: string;
    position: number;
  }[];
  wishes:
    | {
        wish: string;
        position: number;
      }[]
    | null;
  questions: {
    question: string;
    type: QuestionTypeType;
    position: number;
  }[];
  answers: {
    answer: string;
    questionPosition: number;
    position: number;
  }[];
  width: number;
  height: number;
  isMobile: boolean;
  isPreview: boolean;
  guestFormDisabled: boolean;
  block: string;
  id?: number;
}

export interface TemplateNamesProps {
  firstPartnerName: string;
  secondPartnerName: string;
  coupleImage?: string;
  eventDate: string;
  scale: (value: number) => string;
  isMobile: boolean;
}

export interface TemplateDateProps {
  eventDate: string;
  scale: (value: number) => string;
  isMobile: boolean;
  coupleImage?: string;
}

export interface TemplateDresscodeProps {
  colors:
    | {
        colorCode: string;
        position: number;
      }[]
    | null;
  scale: (value: number) => string;
  isMobile: boolean;
}

export interface TemplatePlaceProps {
  address: string;
  link: string;
  placeImage: string;
  scale: (value: number) => string;
  isMobile: boolean;
}

export interface TemplateProgramProps {
  planItems: {
    eventTime: string;
    description: string;
    position: number;
  }[];
  scale: (value: number) => string;
  isMobile: boolean;
}

export interface TemplateTimerProps {
  eventDate: string | null;
  scale: (value: number) => string;
  isMobile: boolean;
}

export interface TemplateMinimalProps {
  scale: (value: number) => string;
  isMobile: boolean;
}

export interface TemplateWishesProps {
  wishes:
    | {
        wish: string;
        position: number;
      }[]
    | null;
  scale: (value: number) => string;
  isMobile: boolean;
}

export interface TemplateGuestFormProps {
  questions: {
    question: string;
    type: QuestionTypeType;
    position: number;
  }[];
  answers: {
    answer: string;
    questionPosition: number;
    position: number;
  }[];
  eventDate: string;
  scale: (value: number) => string;
  isMobile: boolean;
  guestFormDisabled: boolean;
  id: number;
}

export interface TemplateInfo {
  name: string;
  displayedName: string;
  link: string;
  price: number;
  previewImage: string;
}
