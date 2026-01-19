import { beforeEach, describe, expect, it, jest } from "@jest/globals";
const mockPrisma = {
    $transaction: async (callback) => callback({}),
};
const mockGetTemplateIdQuery = jest.fn();
const mockCreateDraftQuery = jest.fn();
const mockCreateColorQuery = jest.fn();
const mockGetColorIdQuery = jest.fn();
const mockCreateInvitationColorQuery = jest.fn();
const mockCreateWishQuery = jest.fn();
const mockGetDraftQuery = jest.fn();
const mockPublishInvitationQuery = jest.fn();
const mockGetInvitationPlaceIdQuery = jest.fn();
const mockUpdatePlaceQuery = jest.fn();
const mockCreatePlaceQuery = jest.fn();
const mockUpdateInvitationPlaceIdQuery = jest.fn();
const mockDeleteInvitationColorsQuery = jest.fn();
const mockDeletePlanItemsQuery = jest.fn();
const mockDeleteWishesQuery = jest.fn();
const mockDeleteFormQuestionsQuery = jest.fn();
const mockDeleteFormAnswersQuery = jest.fn();
const mockCreatePlanItemQuery = jest.fn();
const mockCreateFormQuestionQuery = jest.fn();
const mockGetFormQuestionByPositionQuery = jest.fn();
const mockCreateFormAnswerQuery = jest.fn();
const mockDeleteInvitation = jest.fn();
const mockGetAllInvitationsQuery = jest.fn();
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
const mockGetInvitationDetails = jest.fn();
jest.unstable_mockModule("../../utils/InvitationUtils.js", () => ({
    getInvitationDetails: mockGetInvitationDetails,
}));
jest.unstable_mockModule("../../utils/R2Utils.js", () => ({
    r2: {},
    getParams: () => ({}),
    cleanupOldImages: async () => { },
    cleanupAllImages: async () => { },
}));
const { createDraft, updateDraft, publishDraft, getDraft } = await import("../../service/DraftService.js");
const makeInvitation = (overrides = {}) => ({
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
const makeDetails = (overrides = {}) => ({
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
        const result = await updateDraft(1, {
            answers: [{ answer: "Yes", position: 0, questionPosition: 1 }],
        }, 1);
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
