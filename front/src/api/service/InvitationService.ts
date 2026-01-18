import axios from "axios";
import { parseServiceError } from "../../utils/parseServiceError";
import { axiosAuthorized, baseURL } from "./config";
import type { SubmitGuestAnswersRequest } from "../../shared/types";
import { responseSchemas } from "../../shared/schemas/responses";
const BASE_URL: string = `${baseURL}/published-invitations`;

// router.post('/guest-answers/:id',
//     PublishedInvitationController.createGuestAnswer);
export const submitGuestAnswers = async (
  id: number,
  isComing: SubmitGuestAnswersRequest["isComing"],
  guestName: SubmitGuestAnswersRequest["guestName"],
  answers: SubmitGuestAnswersRequest["answers"],
) => {
  try {
    const response = await axios.post(
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
    const response = await axiosAuthorized.get(`${BASE_URL}/guest-answers`);
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
    const response = await axios.get(`${BASE_URL}/${id}`);
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
    const response = await axiosAuthorized.get(`${BASE_URL}`);
    return responseSchemas.invitationDetailsList.parse(response.data);
  } catch (error) {
    return parseServiceError(error);
  }
};
