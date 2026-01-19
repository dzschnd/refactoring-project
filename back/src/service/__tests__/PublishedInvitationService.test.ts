import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import type { FormQuestion, Invitation } from "@prisma/client";
import { QuestionType } from "@prisma/client";
import type { InvitationDetailsDTO } from "../../types/dto.js";

const mockPrisma = {
  $transaction: async <T>(callback: (tx: object) => Promise<T>): Promise<T> => callback({}),
};

type GetInvitationQuery = (invitationId: number | string, client?: object) => Promise<Invitation[]>;
type GetAllFormQuestionsQuery = (
  invitationId: number | string,
  client?: object,
) => Promise<FormQuestion[]>;
type DeleteGuestAnswersQuery = (
  invitationId: number | string,
  guestId: string,
  client?: object,
) => Promise<[]>;
type CreateGuestAnswerQuery = (
  invitationId: number | string,
  questionId: number,
  guestName: string,
  isComing: boolean,
  answer: string,
  guestId: string,
  client?: object,
) => Promise<[]>;
type GetAllGuestAnswersQuery = (...args: unknown[]) => Promise<Array<{ id: number }>>;
type GetAllInvitationsQuery = (...args: unknown[]) => Promise<unknown>;

const mockGetInvitationQuery: jest.MockedFunction<GetInvitationQuery> = jest.fn();
const mockGetAllFormQuestionsQuery: jest.MockedFunction<GetAllFormQuestionsQuery> = jest.fn();
const mockDeleteGuestAnswersQuery: jest.MockedFunction<DeleteGuestAnswersQuery> = jest.fn();
const mockCreateGuestAnswerQuery: jest.MockedFunction<CreateGuestAnswerQuery> = jest.fn();
const mockGetAllGuestAnswersQuery: jest.MockedFunction<GetAllGuestAnswersQuery> = jest.fn();
const mockGetAllInvitationsQuery: jest.MockedFunction<GetAllInvitationsQuery> = jest.fn();

jest.unstable_mockModule("../../config/prisma.js", () => ({
  default: mockPrisma,
}));

jest.unstable_mockModule("../../queries/InvitationQueries.js", () => ({
  getInvitationQuery: mockGetInvitationQuery,
  getAllFormQuestionsQuery: mockGetAllFormQuestionsQuery,
  deleteGuestAnswersQuery: mockDeleteGuestAnswersQuery,
  createGuestAnswerQuery: mockCreateGuestAnswerQuery,
  getAllGuestAnswersQuery: mockGetAllGuestAnswersQuery,
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

const { getInvitation, submitGuestAnswers, getAllGuestAnswers } =
  await import("../../service/PublishedInvitationService.js");

const makeInvitation = (overrides: Partial<Invitation> = {}): Invitation => ({
  id: 1,
  partner1Name: null,
  partner2Name: null,
  coupleImage: null,
  eventDate: null,
  isPublished: true,
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
  isPublished: true,
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

describe("PublishedInvitationService.getInvitation", () => {
  it("returns invitation details when found", async () => {
    mockGetInvitationDetails.mockResolvedValueOnce(makeDetails());

    const result = await getInvitation(1);

    expect("error" in result).toBe(false);
    if (!("error" in result)) {
      expect(result.id).toBe(1);
    }
  });

  it("returns error when invitation not found", async () => {
    mockGetInvitationDetails.mockResolvedValueOnce(null);

    const result = await getInvitation(1);

    expect("error" in result).toBe(true);
    if ("error" in result) {
      expect(result.error).toBe("Invitation not found");
    }
  });
});

describe("PublishedInvitationService.submitGuestAnswers", () => {
  it("submits guest answers successfully", async () => {
    mockGetInvitationQuery.mockResolvedValueOnce([makeInvitation()]);
    mockGetAllFormQuestionsQuery.mockResolvedValueOnce([
      { id: 1, invitationId: 1, question: "Q1", position: 0, type: QuestionType.TEXT },
      { id: 2, invitationId: 1, question: "Q2", position: 1, type: QuestionType.TEXT },
    ]);
    mockDeleteGuestAnswersQuery.mockResolvedValueOnce([]);
    mockCreateGuestAnswerQuery.mockResolvedValue([]);

    const result = await submitGuestAnswers(
      1,
      [
        { questionPosition: 0, answer: "A1" },
        { questionPosition: 1, answer: "A2" },
      ],
      "Guest",
      true,
      "guest-1",
    );

    expect("error" in result).toBe(false);
    if (!("error" in result)) {
      expect(result.message).toBe("Answers submitted successfully");
    }
  });

  it("returns error when not all questions are answered", async () => {
    mockGetInvitationQuery.mockResolvedValueOnce([makeInvitation()]);
    mockGetAllFormQuestionsQuery.mockResolvedValueOnce([
      { id: 1, invitationId: 1, question: "Q1", position: 0, type: QuestionType.TEXT },
      { id: 2, invitationId: 1, question: "Q2", position: 1, type: QuestionType.TEXT },
    ]);

    const result = await submitGuestAnswers(
      1,
      [{ questionPosition: 0, answer: "A1" }],
      "Guest",
      true,
      "guest-1",
    );

    expect("error" in result).toBe(true);
    if ("error" in result) {
      expect(result.error).toBe("Not all questions are answered");
    }
  });
});

describe("PublishedInvitationService.getAllGuestAnswers", () => {
  it("returns guest answers when found", async () => {
    mockGetAllGuestAnswersQuery.mockResolvedValueOnce([{ id: 1 }]);

    const result = await getAllGuestAnswers(1);

    expect("error" in result).toBe(false);
    if (!("error" in result)) {
      expect(result.length).toBe(1);
    }
  });

  it("returns error when no guest answers found", async () => {
    mockGetAllGuestAnswersQuery.mockResolvedValueOnce([]);

    const result = await getAllGuestAnswers(1);

    expect("error" in result).toBe(true);
    if ("error" in result) {
      expect(result.error).toBe("No guest answers found");
    }
  });
});
