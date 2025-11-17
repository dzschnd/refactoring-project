import { FC, useEffect, useState } from "react";
import InvitationCard from "./InvitationCard";
import { Link, useNavigate } from "react-router-dom";
import goToIcon from "../../../../assetsOld/buttonIcons/arrowRight.png";
import { getAllInvitations } from "../../../../api/service/InvitationService";
import { CardInfo } from "../../../../types";

const MyInvitationsPreview: FC = () => {
  const [allInvitations, setAllInvitations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchInvitations().then();
  }, []);

  const fetchInvitations = async () => {
    const result = await getAllInvitations();
    setAllInvitations(result);
  };

  return (
    <div className="sm:hidden">
      <button>
        <Link to="./invitations">
          <div className="flex items-center gap-[5px]">
            <h2 className="font-primary text-800 font-normal leading-[1.2] text-grey-500">
              Мои приглашения
            </h2>
            <img
              src={goToIcon}
              alt="Go To My Invitations"
              className="h-6 w-6"
            />
          </div>
        </Link>
      </button>
      {allInvitations && allInvitations.length > 0 ? (
        <div className="scrollbar-hide mt-10 flex max-w-[326px] gap-10 overflow-x-scroll">
          {allInvitations.map((invitation: CardInfo) => (
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

export default MyInvitationsPreview;
