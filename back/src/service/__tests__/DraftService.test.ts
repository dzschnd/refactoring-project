import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import type { Invitation, QuestionType } from "@prisma/client";
import type { InvitationDetailsDTO } from "../../types/dto.js";

const mockPrisma = {
  $transaction: async <T>(callback: (tx: object) => Promise<T>): Promise<T> => callback({}),
};

type GetTemplateIdQuery = (templateName: string, client?: object) => Promise<Array<{ id: number }>>;
type CreateDraftQuery = (
  authorId: number,
  templateId: number,
  client?: object,
) => Promise<[Invitation]>;
type CreateColorQuery = (colorCode: string, client?: object) => Promise<Array<{ id: number }>>;
type GetColorIdQuery = (colorCode: string, client?: object) => Promise<Array<{ id: number }>>;
type CreateInvitationColorQuery = (
  invitationId: number | string,
  colorId: number,
  position: number,
  client?: object,
) => Promise<[]>;
type CreateWishQuery = (
  wish: string,
  position: number,
  invitationId: number | string,
  client?: object,
) => Promise<[]>;
type GetDraftQuery = (
  invitationId: number | string,
  authorId: number,
  client?: object,
) => Promise<Invitation[]>;
type PublishInvitationQuery = (
  invitationId: number | string,
  authorId: number | string,
  client?: object,
) => Promise<[]>;
type GetInvitationPlaceIdQuery = (
  invitationId: number | string,
  client?: object,
) => Promise<Array<{ placeId: number | null }>>;
type UpdatePlaceQuery = (
  address: string | null,
  placeImage: string | null,
  link: string | null,
  placeId: number,
  client?: object,
) => Promise<[]>;
type CreatePlaceQuery = (
  address: string | null,
  placeImage: string | null,
  link: string | null,
  client?: object,
) => Promise<Array<{ id: number }>>;
type UpdateInvitationPlaceIdQuery = (
  placeId: number,
  invitationId: number | string,
  client?: object,
) => Promise<[]>;
type DeleteInvitationColorsQuery = (invitationId: number | string, client?: object) => Promise<[]>;
type DeletePlanItemsQuery = (invitationId: number | string, client?: object) => Promise<[]>;
type DeleteWishesQuery = (invitationId: number | string, client?: object) => Promise<[]>;
type DeleteFormQuestionsQuery = (invitationId: number | string, client?: object) => Promise<[]>;
type DeleteFormAnswersQuery = (invitationId: number | string, client?: object) => Promise<[]>;
type CreatePlanItemQuery = (
  eventTime: string,
  description: string,
  position: number,
  invitationId: number | string,
  client?: object,
) => Promise<[]>;
type CreateFormQuestionQuery = (
  question: string,
  type: QuestionType,
  position: number,
  invitationId: number | string,
  client?: object,
) => Promise<Array<{ id: number }>>;
type GetFormQuestionByPositionQuery = (
  invitationId: number | string,
  position: number,
  client?: object,
) => Promise<Array<{ id: number }>>;
type CreateFormAnswerQuery = (
  answer: string,
  questionId: number,
  position: number,
  invitationId: number | string,
  client?: object,
) => Promise<[]>;
type DeleteInvitation = (
  invitationId: number | string,
  authorId: number | string,
  client?: object,
) => Promise<number>;
type GetAllInvitationsQuery = (...args: unknown[]) => Promise<unknown>;

const mockGetTemplateIdQuery: jest.MockedFunction<GetTemplateIdQuery> = jest.fn();
const mockCreateDraftQuery: jest.MockedFunction<CreateDraftQuery> = jest.fn();
const mockCreateColorQuery: jest.MockedFunction<CreateColorQuery> = jest.fn();
const mockGetColorIdQuery: jest.MockedFunction<GetColorIdQuery> = jest.fn();
const mockCreateInvitationColorQuery: jest.MockedFunction<CreateInvitationColorQuery> = jest.fn();
const mockCreateWishQuery: jest.MockedFunction<CreateWishQuery> = jest.fn();
const mockGetDraftQuery: jest.MockedFunction<GetDraftQuery> = jest.fn();
const mockPublishInvitationQuery: jest.MockedFunction<PublishInvitationQuery> = jest.fn();
const mockGetInvitationPlaceIdQuery: jest.MockedFunction<GetInvitationPlaceIdQuery> = jest.fn();
const mockUpdatePlaceQuery: jest.MockedFunction<UpdatePlaceQuery> = jest.fn();
const mockCreatePlaceQuery: jest.MockedFunction<CreatePlaceQuery> = jest.fn();
const mockUpdateInvitationPlaceIdQuery: jest.MockedFunction<UpdateInvitationPlaceIdQuery> =
  jest.fn();
const mockDeleteInvitationColorsQuery: jest.MockedFunction<DeleteInvitationColorsQuery> = jest.fn();
const mockDeletePlanItemsQuery: jest.MockedFunction<DeletePlanItemsQuery> = jest.fn();
const mockDeleteWishesQuery: jest.MockedFunction<DeleteWishesQuery> = jest.fn();
const mockDeleteFormQuestionsQuery: jest.MockedFunction<DeleteFormQuestionsQuery> = jest.fn();
const mockDeleteFormAnswersQuery: jest.MockedFunction<DeleteFormAnswersQuery> = jest.fn();
const mockCreatePlanItemQuery: jest.MockedFunction<CreatePlanItemQuery> = jest.fn();
const mockCreateFormQuestionQuery: jest.MockedFunction<CreateFormQuestionQuery> = jest.fn();
const mockGetFormQuestionByPositionQuery: jest.MockedFunction<GetFormQuestionByPositionQuery> =
  jest.fn();
const mockCreateFormAnswerQuery: jest.MockedFunction<CreateFormAnswerQuery> = jest.fn();
const mockDeleteInvitation: jest.MockedFunction<DeleteInvitation> = jest.fn();
const mockGetAllInvitationsQuery: jest.MockedFunction<GetAllInvitationsQuery> = jest.fn();

jest.unstable_mockModule("../../config/prisma.js", () => ({
  default: mockPrisma,
}));

jest.unstable_mockModule("../../queries/InvitationQueries.js", () => ({
  getTemplateIdQuery: mockGetTemplateIdQuery,
  createDraftQuery: mockCreateDraftQuery,
  createColorQuery: mockCreateColorQuery,
  getColorIdQuery: mockGetColorIdQuery,
  createInvitationColorQuery: mockCreateInvitationColorQuery,
  createWishQuery: mockCreateWishQuery,
  getDraftQuery: mockGetDraftQuery,
  publishInvitationQuery: mockPublishInvitationQuery,
  getInvitationPlaceIdQuery: mockGetInvitationPlaceIdQuery,
  updatePlaceQuery: mockUpdatePlaceQuery,
  createPlaceQuery: mockCreatePlaceQuery,
  updateInvitationPlaceIdQuery: mockUpdateInvitationPlaceIdQuery,
  deleteInvitationColorsQuery: mockDeleteInvitationColorsQuery,
  deletePlanItemsQuery: mockDeletePlanItemsQuery,
  deleteWishesQuery: mockDeleteWishesQuery,
  deleteFormQuestionsQuery: mockDeleteFormQuestionsQuery,
  deleteFormAnswersQuery: mockDeleteFormAnswersQuery,
  createPlanItemQuery: mockCreatePlanItemQuery,
  createFormQuestionQuery: mockCreateFormQuestionQuery,
  getFormQuestionByPositionQuery: mockGetFormQuestionByPositionQuery,
  createFormAnswerQuery: mockCreateFormAnswerQuery,
  deleteInvitation: mockDeleteInvitation,
  getAllInvitationsQuery: mockGetAllInvitationsQuery,
}));

type GetInvitationDetails = (
  invitationId: number | string,
  isPublished: boolean,
  client?: object,
) => Promise<InvitationDetailsDTO | null>;
const mockGetInvitationDetails: jest.MockedFunction<GetInvitationDetails> = jest.fn();
jest.unstable_mockModule("../../utils/InvitationUtils.js", () => ({
  getInvitationDetails: mockGetInvitationDetails,
}));

jest.unstable_mockModule("../../utils/R2Utils.js", () => ({
  r2: {},
  getParams: () => ({}),
  cleanupOldImages: async () => {},
  cleanupAllImages: async () => {},
}));

const { createDraft, updateDraft, publishDraft, getDraft } =
  await import("../../service/DraftService.js");

const makeInvitation = (overrides: Partial<Invitation> = {}): Invitation => ({
  id: 1,
  partner1Name: null,
  partner2Name: null,
  coupleImage: null,
  eventDate: null,
  isPublished: false,
  createdAt: new Date(),
  authorId: 1,
  templateId: 1,
  placeId: null,
  ...overrides,
});

const makeDetails = (overrides: Partial<InvitationDetailsDTO> = {}): InvitationDetailsDTO => ({
  id: 1,
  firstPartnerName: null,
  secondPartnerName: null,
  coupleImage: null,
  authorId: 1,
  templateName: "red_velvet",
  eventDate: null,
  isPublished: false,
  colors: [],
  place: null,
  planItems: [],
  wishes: [],
  questions: [],
  answers: [],
  ...overrides,
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe("DraftService.createDraft", () => {
  it("returns invitation details for valid template", async () => {
    mockGetTemplateIdQuery.mockResolvedValueOnce([{ id: 1 }]);
    mockCreateDraftQuery.mockResolvedValueOnce([makeInvitation({ id: 1 })]);
    mockGetColorIdQuery.mockResolvedValue([]);
    mockCreateColorQuery.mockResolvedValue([{ id: 1 }]);
    mockCreateInvitationColorQuery.mockResolvedValue([]);
    mockCreateWishQuery.mockResolvedValue([]);
    mockGetInvitationDetails.mockResolvedValueOnce(makeDetails());

    const result = await createDraft(1, "red_velvet");

    expect("error" in result).toBe(false);
    if (!("error" in result)) {
      expect(result.id).toBe(1);
      expect(result.templateName).toBe("red_velvet");
    }
  });

  it("returns error when template not found", async () => {
    mockGetTemplateIdQuery.mockResolvedValueOnce([]);

    const result = await createDraft(1, "missing_template");

    expect("error" in result).toBe(true);
    if ("error" in result) {
      expect(result.error).toBe("Template not found");
    }
  });
});

describe("DraftService.updateDraft", () => {
  it("returns error when question for answer not found", async () => {
    mockGetDraftQuery.mockResolvedValueOnce([makeInvitation()]);
    mockGetFormQuestionByPositionQuery.mockResolvedValueOnce([]);

    const result = await updateDraft(
      1,
      {
        answers: [{ answer: "Yes", position: 0, questionPosition: 1 }],
      },
      1,
    );

    expect("error" in result).toBe(true);
    if ("error" in result) {
      expect(result.error).toBe("Question for some of the answers not found");
    }
  });
});

describe("DraftService.publishDraft", () => {
  it("publishes draft and returns details", async () => {
    mockGetDraftQuery.mockResolvedValueOnce([makeInvitation()]);
    mockPublishInvitationQuery.mockResolvedValueOnce([]);
    mockGetInvitationDetails.mockResolvedValueOnce(makeDetails({ isPublished: true }));

    const result = await publishDraft(1, 1);

    expect("error" in result).toBe(false);
    if (!("error" in result)) {
      expect(result.isPublished).toBe(true);
    }
  });

  it("returns error when draft not found", async () => {
    mockGetDraftQuery.mockResolvedValueOnce([]);

    const result = await publishDraft(1, 1);

    expect("error" in result).toBe(true);
    if ("error" in result) {
      expect(result.error).toBe("Draft not found");
    }
  });
});

describe("DraftService.getDraft", () => {
  it("returns draft details for owner", async () => {
    mockGetInvitationDetails.mockResolvedValueOnce(makeDetails({ authorId: 1 }));

    const result = await getDraft(1, 1);

    expect("error" in result).toBe(false);
    if (!("error" in result)) {
      expect(result.authorId).toBe(1);
    }
  });

  it("returns error when draft not found", async () => {
    mockGetInvitationDetails.mockResolvedValueOnce(null);

    const result = await getDraft(1, 1);

    expect("error" in result).toBe(true);
    if ("error" in result) {
      expect(result.error).toBe("Draft not found");
    }
  });
});
