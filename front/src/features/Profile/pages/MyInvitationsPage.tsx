import { FC, useEffect, useState } from "react";
import Header from "../../../components/Header";
import ProfileNavigation from "../components/ProfileNavigation";
import ProfileInfo from "../components/Profile/ProfileInfo";
import Footer from "../../../components/Footer";
import InvitationCard from "../components/Invitations/InvitationCard";
import { Link, useNavigate } from "react-router-dom";
import goBackIcon from "../../../assetsOld/buttonIcons/arrowLeft.png";
import DraftCard from "../components/Drafts/DraftCard";
import { getAllInvitations } from "../../../api/service/InvitationService";
import { CardInfo } from "../../../types";
import { getAllDrafts } from "../../../api/service/DraftService";
import InivitationCardSkeleton from "../components/Invitations/InivitationCardSkeleton";

const MyInvitationsPage: FC = () => {
  const [allInvitations, setAllInvitations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchInvitations().then();
  }, []);

  const fetchInvitations = async () => {
    const result = await getAllInvitations();
    setAllInvitations(result);
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-grow flex-col items-center justify-between">
        <Header />
        <div className="max-w-[100vw] justify-center px-4 pb-[160px] pt-[60px] sm:flex sm:gap-[64px] md:w-full md:gap-[117px] md:px-[60px] md:pb-[120px] md:pt-[120px]">
          <ProfileNavigation />
          <div className="w-[335px] flex-grow sm:w-full sm:max-w-[467px] md:max-w-[862px]">
            <button className="md:hidden">
              <Link to="/profile">
                <div className="flex items-center gap-[5px]">
                  <img src={goBackIcon} alt="Go Back" className="h-6 w-6" />
                  <h1 className="font-primary text-800 font-normal leading-[1.2] text-grey-500">
                    Мои приглашения
                  </h1>
                </div>
              </Link>
            </button>
            <h1 className="hidden font-primary text-900 font-semibold leading-[1.21] text-grey-500 md:inline">
              Мои приглашения
            </h1>
            <div className="mt-10 flex w-full flex-col items-center gap-5 sm:grid sm:grid-cols-2 sm:gap-x-[25px] sm:gap-y-5 md:grid-cols-3 md:gap-x-[30px] md:gap-y-[60px]">
              {loading ? (
                <>
                  <InivitationCardSkeleton />
                  <InivitationCardSkeleton />
                  <InivitationCardSkeleton />
                </>
              ) : allInvitations &&
                Array.isArray(allInvitations) &&
                allInvitations.length > 0 ? (
                allInvitations.map((invitation: CardInfo) => (
                  <InvitationCard
                    key={invitation.id}
                    id={invitation.id}
                    coupleImage={invitation.coupleImage}
                    templateName={invitation.templateName}
                    firstPartnerName={
                      invitation.firstPartnerName
                        ? invitation.firstPartnerName
                        : "Невеста"
                    }
                    secondPartnerName={
                      invitation.secondPartnerName
                        ? invitation.secondPartnerName
                        : "Жених"
                    }
                  />
                ))
              ) : (
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
              )}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default MyInvitationsPage;
