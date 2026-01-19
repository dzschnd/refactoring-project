import { api } from "./config";
import { parseServiceError } from "../../utils/parseServiceError";
import { axiosAuthorized } from "./config";
import type { SubmitGuestAnswersRequest } from "../../shared/types";
import { responseSchemas } from "../../shared/schemas/responses";
const BASE_URL: string = "published-invitations";

// router.post('/guest-answers/:id',
//     PublishedInvitationController.createGuestAnswer);
export const submitGuestAnswers = async (
  id: number,
  isComing: SubmitGuestAnswersRequest["isComing"],
  guestName: SubmitGuestAnswersRequest["guestName"],
  answers: SubmitGuestAnswersRequest["answers"],
) => {
  try {
    const response = await api.post(
      `${BASE_URL}/guest-answers/${id}`,
      {
        answers: answers,
        guestName: guestName,
        isComing: isComing,
      },
      {
        withCredentials: true,
      },
    );
    return responseSchemas.message.parse(response.data);
  } catch (error) {
    return parseServiceError(error);
  }
};

// router.get('guest-answers/:id',
//     verifyAccessToken, verifyUser,
//     formAnswerValidation, handleValidationErrors,
//     PublishedInvitationController.getAllGuestAnswers);
export const getAllGuestAnswers = async () => {
  try {
    const response = await axiosAuthorized.get(`${BASE_URL}/guest-answers`, {
      suppressErrorToastOn404: true,
    });
    return responseSchemas.guestAnswerList.parse(response.data);
  } catch (error) {
    return parseServiceError(error);
  }
};

// router.get('/:id',
//     verifyAccessToken, verifyUser,
//     PublishedInvitationController.getInvitation);
export const getInvitation = async (id: number) => {
  try {
    const response = await api.get(`${BASE_URL}/${id}`);
    return responseSchemas.invitationDetails.parse(response.data);
  } catch (error) {
    return parseServiceError(error);
  }
};

// router.get('/',
//     verifyAccessToken, verifyUser,
//     PublishedInvitationController.getAllInvitations);
export const getAllInvitations = async () => {
  try {
    const response = await axiosAuthorized.get(`${BASE_URL}`, {
      suppressErrorToastOn404: true,
    });
    return responseSchemas.invitationDetailsList.parse(response.data);
  } catch (error) {
    return parseServiceError(error);
  }
};
