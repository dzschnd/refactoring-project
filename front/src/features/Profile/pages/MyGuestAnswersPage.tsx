import { FC, useEffect, useState } from "react";
import Header from "../../../components/Header";
import ProfileNavigation from "../components/ProfileNavigation";
import Footer from "../../../components/Footer";
import { Link, useLocation, useNavigate } from "react-router-dom";
import goBackIcon from "../../../assetsOld/buttonIcons/arrowLeft.png";
import {
  getAllGuestAnswers,
  getAllInvitations,
} from "../../../api/service/InvitationService";
import type {
  GuestAnswerResponse,
  InvitationDetailsResponse,
} from "../../../shared/types";
import GuestAnswerSkeleton from "../components/GuestAnswers/GuestAnswerSkeleton";

const MyGuestAnswersPage: FC = () => {
  const location = useLocation();
  const { id } = location.state || {};
  const [allGuestAnswers, setAllGuestAnswers] = useState<GuestAnswerResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [allInvitations, setAllInvitations] = useState<InvitationDetailsResponse[]>([]);
  const [currentId, setCurrentId] = useState<number>(id ? parseInt(id) : 0);
  const navigate = useNavigate();

  const fetchGuestAnswers = async () => {
    const result = await getAllGuestAnswers();
    setLoading(false);
    setAllGuestAnswers(Array.isArray(result) ? result : []);
  };

  const fetchInvitations = async () => {
    const result = await getAllInvitations();
    const invitations = Array.isArray(result) ? result : [];
    setAllInvitations(invitations);
    if (!id && invitations.length > 0) setCurrentId(invitations[0].id);
  };

  useEffect(() => {
    fetchInvitations().then(fetchGuestAnswers);
  }, []);

  const groupAnswersByGuestId = (answers: GuestAnswerResponse[]) => {
    return answers.reduce<Record<string, GuestAnswerResponse[]>>((acc, answer) => {
      if (!acc[answer.guestId]) {
        acc[answer.guestId] = [];
      }
      acc[answer.guestId].push(answer);
      return acc;
    }, {});
  };

  const getGuestAnswersByInvitation = (invitationId: number) => {
    const filteredAnswers = allGuestAnswers.filter(
      (guestAnswer) => guestAnswer.invitationId === invitationId,
    );

    const sortedAnswers = filteredAnswers.sort((a, b) => a.id - b.id);

    return groupAnswersByGuestId(sortedAnswers);
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
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-grow flex-col items-center justify-between">
        <Header />
        <div className="max-w-[100vw] justify-center px-4 pb-[160px] pt-[60px] sm:flex sm:gap-[64px] md:w-full md:gap-[117px] md:px-[60px] md:pb-[120px] md:pt-[120px]">
          <ProfileNavigation />
          <div className="max-w-[335px] flex-grow sm:w-full sm:min-w-[467px] md:max-w-[862px]">
            <button className="md:hidden">
              <Link to="/profile">
                <div className="flex items-center gap-[5px]">
                  <img src={goBackIcon} alt="Go Back" className="h-6 w-6" />
                  <h1 className="font-primary text-800 font-normal leading-[1.2] text-grey-500">
                    Ответы гостей
                  </h1>
                </div>
              </Link>
            </button>
            <h1 className="hidden font-primary text-900 font-semibold leading-[1.21] text-grey-500 md:inline">
              Ответы гостей
            </h1>

            {loading ? (
              <GuestAnswerSkeleton />
            ) : (
              <div className="mt-10">
                {allInvitations &&
                Array.isArray(allInvitations) &&
                allInvitations.length > 0 ? (
                  <>
                    <div className="scrollbar-hide flex gap-[30px] overflow-x-auto pb-[3px]">
                      {allInvitations &&
                        Array.isArray(allInvitations) &&
                        allInvitations.map((invitation) => (
                          <div key={invitation.id}>
                            <button onClick={() => setCurrentId(invitation.id)}>
                              <span
                                className={`${invitation.id === currentId ? "border-b-[2px] border-b-red-500" : ""} whitespace-nowrap font-primary text-400 font-semibold leading-[1.4] text-grey-500`}
                              >
                                {invitation.firstPartnerName} и{" "}
                                {invitation.secondPartnerName} (
                                {invitation.eventDate})
                              </span>
                            </button>
                          </div>
                        ))}
                    </div>

                    <div>
                      {allInvitations &&
                      Array.isArray(allInvitations) &&
                      allGuestAnswers.length > 0 ? (
                        allInvitations.map((invitation) => (
                          <div key={invitation.id}>
                            {invitation.id === currentId &&
                              allGuestAnswers &&
                              Array.isArray(allGuestAnswers) &&
                              allGuestAnswers.length > 0 && (
                                <div>
                                  {Object.entries(
                                    getGuestAnswersByInvitation(invitation.id),
                                  ).length > 0 ? (
                                    Object.entries(
                                      getGuestAnswersByInvitation(
                                        invitation.id,
                                      ),
                                    ).map(([guestId, answers]) => (
                                      <div
                                        key={guestId}
                                        className="mt-[30px] flex flex-col gap-5"
                                      >
                                        <dl
                                          className="flex flex-col gap-5 rounded-[20px] bg-green-50 p-5 md:p-[30px]"
                                          style={{
                                            backgroundColor: answers[0]
                                              .isComing
                                              ? "#A2FDDB40"
                                              : "#FFEBEA",
                                          }}
                                        >
                                          <div className="flex flex-col sm:flex-row">
                                            <dt className="mb-2.5 font-primary text-400 font-semibold leading-[1.4] text-grey-500">
                                              Имя:&nbsp;
                                            </dt>
                                            <dd className="font-primary text-400 font-light leading-[1.4] text-grey-500">
                                              {answers[0].guestName}
                                            </dd>
                                          </div>
                                          <div className="flex flex-col sm:flex-row">
                                            <dt className="mb-2.5 font-primary text-400 font-semibold leading-[1.4] text-grey-500">
                                              Присутствие:&nbsp;
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
                                            ).map(
                                              ([questionId, groupedAnswers]) => {
                                                const question =
                                                  invitation.questions?.find(
                                                    (q) =>
                                                      q.id === Number(questionId),
                                                  );
                                                return question ? (
                                                  <div
                                                    key={question.id}
                                                    className="flex flex-col sm:flex-row"
                                                  >
                                                    <dt className="mb-2.5 font-primary text-400 font-semibold leading-[1.4] text-grey-500">
                                                      {question.question}:&nbsp;
                                                    </dt>
                                                    <dd className="font-primary text-400 font-light leading-[1.4] text-grey-500">
                                                      {groupedAnswers.join(
                                                        ", ",
                                                      )}
                                                    </dd>
                                                  </div>
                                                ) : null;
                                              },
                                            )}
                                          </div>
                                        </dl>
                                      </div>
                                    ))
                                  ) : (
                                    <div className="mt-[30px] rounded-[20px] bg-grey-50 p-5 font-primary text-300 font-medium text-grey-500">
                                      У вас пока нет ответов
                                    </div>
                                  )}
                                </div>
                              )}
                          </div>
                        ))
                      ) : (
                        <div className="mt-[30px] rounded-[20px] bg-grey-50 p-5 font-primary text-300 font-medium text-grey-500">
                          У вас пока нет ответов
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="sm:grid sm:grid-cols-2 sm:gap-x-[25px] md:grid-cols-3">
                    <div className="flex w-full flex-col rounded-[20px] bg-grey-50 p-5">
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
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default MyGuestAnswersPage;
