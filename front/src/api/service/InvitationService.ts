import axios from "axios";
import { parseServiceError } from "../../utils/parseServiceError";
import { axiosAuthorized, baseURL } from "./config";
const BASE_URL: string = `${baseURL}/published-invitations`;

// router.post('/guest-answers/:id',
//     PublishedInvitationController.createGuestAnswer);
export const submitGuestAnswers = async (
  id: number,
  isComing: boolean,
  guestName: string,
  answers: {
    questionPosition: number;
    answer: string;
  }[],
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
    return response.data;
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
    return response.data;
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
    return response.data;
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
    return response.data;
  } catch (error) {
    return parseServiceError(error);
  }
};
