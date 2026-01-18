import { FC, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import goToIcon from "../../../../assetsOld/buttonIcons/arrowRight.png";
import {
  getAllGuestAnswers,
  getAllInvitations,
} from "../../../../api/service/InvitationService";
import type {
  GuestAnswerResponse,
  InvitationDetailsResponse,
} from "../../../../shared/types";

const MyGuestAnswersPreview: FC = () => {
  const [allGuestAnswers, setAllGuestAnswers] = useState<GuestAnswerResponse[]>(
    [],
  );
  const [allInvitations, setAllInvitations] = useState<
    InvitationDetailsResponse[]
  >([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchInvitations().then(fetchGuestAnswers);
  }, []);

  const fetchGuestAnswers = async () => {
    const result = await getAllGuestAnswers();
    setAllGuestAnswers(Array.isArray(result) ? result : []);
  };

  const fetchInvitations = async () => {
    const result = await getAllInvitations();
    setAllInvitations(Array.isArray(result) ? result : []);
  };

  const groupAnswersByGuestId = (answers: GuestAnswerResponse[]) => {
    return answers.reduce<Record<string, GuestAnswerResponse[]>>(
      (acc, answer) => {
        if (!acc[answer.guestId]) {
          acc[answer.guestId] = [];
        }
        acc[answer.guestId].push(answer);
        return acc;
      },
      {},
    );
  };

  const getGuestAnswersByInvitation = (invitationId: number) => {
    const filteredAnswers = allGuestAnswers.filter(
      (guestAnswer) => guestAnswer.invitationId === invitationId,
    );
    return groupAnswersByGuestId(
      filteredAnswers.sort((a, b) => a.id - b.id),
    );
  };

  const groupAnswersByQuestionId = (answers: GuestAnswerResponse[]) => {
    return answers.reduce<Record<number, string[]>>((acc, answer) => {
      if (!acc[answer.questionId]) {
        acc[answer.questionId] = [];
      }
      acc[answer.questionId].push(answer.answer);
      return acc;
    }, {});
  };

  return (
    <div className="sm:hidden">
      <button>
        <Link to="./guest-answers">
          <div className="flex items-center gap-[5px]">
            <h2 className="font-primary text-800 font-normal leading-[1.2] text-grey-500">
              Ответы гостей
            </h2>
            <img src={goToIcon} alt="Go To Guest Answers" className="h-6 w-6" />
          </div>
        </Link>
      </button>
      {allGuestAnswers &&
      allInvitations &&
      allGuestAnswers.length > 0 &&
      allInvitations.length > 0 ? (
        <div className="mt-10 max-w-[326px]">
          {allInvitations.map((invitation) => (
            <div key={invitation.id} className="mb-10">
              {allGuestAnswers.filter(
                (guestAnswer) => guestAnswer.invitationId === invitation.id,
              ).length > 0 && (
                <>
                  <span className="border-b-[2px] border-b-red-500 pb-[3px] font-primary text-400 font-semibold leading-[1.4] text-grey-500">
                    {invitation.firstPartnerName} и{" "}
                    {invitation.secondPartnerName} ({invitation.eventDate})
                  </span>
                  <div className="mt-4">
                    {Object.entries(
                      getGuestAnswersByInvitation(invitation.id),
                    ).map(([guestId, answers], index) => (
                      <div key={guestId}>
                        {index ===
                          Object.entries(
                            getGuestAnswersByInvitation(invitation.id),
                          ).length -
                            1 && (
                          <div className="mt-[30px] flex flex-col gap-5">
                            <dl
                              className="flex flex-col gap-5 rounded-[20px] bg-green-50 p-5 md:p-[30px]"
                              style={{
                                backgroundColor: answers[0].isComing
                                  ? "#A2FDDB40"
                                  : "#FFEBEA",
                              }}
                            >
                              <div>
                                <dt className="mb-2.5 font-primary text-400 font-semibold leading-[1.4] text-grey-500">
                                  Имя:
                                </dt>
                                <dd className="font-primary text-400 font-light leading-[1.4] text-grey-500">
                                  {answers[0].guestName}
                                </dd>
                              </div>
                              <div>
                                <dt className="mb-2.5 font-primary text-400 font-semibold leading-[1.4] text-grey-500">
                                  Присутствие:
                                </dt>
                                <dd className="font-primary text-400 font-light leading-[1.4] text-grey-500">
                                  {answers[0].isComing
                                    ? "С удовольствием приеду (приедем)"
                                    : "К сожалению, не получится"}
                                </dd>
                              </div>
                              <div>
                                {Object.entries(
                                  groupAnswersByQuestionId(answers),
                                ).map(([questionId, groupedAnswers]) => {
                                  const question = invitation.questions?.find(
                                    (q) => q.id === Number(questionId),
                                  );
                                  return question ? (
                                    <div key={question.id}>
                                      <dt className="mb-2.5 font-primary text-400 font-semibold leading-[1.4] text-grey-500">
                                        {question.question}
                                      </dt>
                                      <dd className="font-primary text-400 font-light leading-[1.4] text-grey-500">
                                        {groupedAnswers.join(", ")}
                                      </dd>
                                    </div>
                                  ) : null;
                                })}
                              </div>
                            </dl>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-10 flex w-full flex-col rounded-[20px] bg-grey-50 p-5">
          <span className="font-grey-500 mb-5 text-300 font-medium">
            У вас еще нет ни одного приглашения
          </span>
          <button
            onClick={() => navigate("/catalog")}
            className="h-[42px] rounded-[30px] bg-grey-300 px-[18px] font-semibold text-white"
          >
            Создать
          </button>
        </div>
      )}
    </div>
  );
};

export default MyGuestAnswersPreview;
