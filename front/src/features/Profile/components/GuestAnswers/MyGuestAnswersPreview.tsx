import { FC, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import goToIcon from "../../../../assetsOld/buttonIcons/arrowRight.png";
import {
  getAllGuestAnswers,
  getAllInvitations,
} from "../../../../api/service/InvitationService";

const MyGuestAnswersPreview: FC = () => {
  const [allGuestAnswers, setAllGuestAnswers] = useState([]);
  const [allInvitations, setAllInvitations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchInvitations().then(fetchGuestAnswers);
  }, []);

  const fetchGuestAnswers = async () => {
    const result = await getAllGuestAnswers();
    setAllGuestAnswers(result);
  };

  const fetchInvitations = async () => {
    const result = await getAllInvitations();
    setAllInvitations(result);
  };

  const groupAnswersByGuestId = (answers: any[]) => {
    return answers.reduce((acc: any, answer: any) => {
      if (!acc[answer.guest_id]) {
        acc[answer.guest_id] = [];
      }
      acc[answer.guest_id].push(answer);
      return acc;
    }, {});
  };

  const getGuestAnswersByInvitation = (invitationId: number) => {
    const filteredAnswers = allGuestAnswers.filter(
      (guestAnswer: any) => guestAnswer.invitation_id === invitationId,
    );
    return groupAnswersByGuestId(
      filteredAnswers.sort((a: any, b: any) => a.created_at - b.created_at),
    );
  };

  const groupAnswersByQuestionId = (answers: any[]) => {
    return answers.reduce((acc: any, answer: any) => {
      if (!acc[answer.question_id]) {
        acc[answer.question_id] = [];
      }
      acc[answer.question_id].push(answer.answer);
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
          {allInvitations.map((invitation: any) => (
            <div key={invitation.id} className="mb-10">
              {allGuestAnswers.filter(
                (guestAnswer: any) =>
                  guestAnswer.invitation_id === invitation.id,
              ).length > 0 && (
                <>
                  <span className="border-b-[2px] border-b-red-500 pb-[3px] font-primary text-400 font-semibold leading-[1.4] text-grey-500">
                    {invitation.firstPartnerName} и{" "}
                    {invitation.secondPartnerName} ({invitation.eventDate})
                  </span>
                  <div className="mt-4">
                    {Object.entries(
                      getGuestAnswersByInvitation(invitation.id),
                    ).map(([guestId, answers]: any, index: number) => (
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
                                backgroundColor: answers[0].is_coming
                                  ? "#A2FDDB40"
                                  : "#FFEBEA",
                              }}
                            >
                              <div>
                                <dt className="mb-2.5 font-primary text-400 font-semibold leading-[1.4] text-grey-500">
                                  Имя:
                                </dt>
                                <dd className="font-primary text-400 font-light leading-[1.4] text-grey-500">
                                  {answers[0].guest_name}
                                </dd>
                              </div>
                              <div>
                                <dt className="mb-2.5 font-primary text-400 font-semibold leading-[1.4] text-grey-500">
                                  Присутствие:
                                </dt>
                                <dd className="font-primary text-400 font-light leading-[1.4] text-grey-500">
                                  {answers[0].is_coming
                                    ? "С удовольствием приеду (приедем)"
                                    : "К сожалению, не получится"}
                                </dd>
                              </div>
                              <div>
                                {Object.entries(
                                  groupAnswersByQuestionId(answers),
                                ).map(([questionId, groupedAnswers]: any) => {
                                  const question = invitation.questions.find(
                                    (q: any) => q.id === parseInt(questionId),
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
