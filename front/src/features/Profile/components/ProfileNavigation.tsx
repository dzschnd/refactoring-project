import type { FC } from "react";
import profile from "../../../assetsOld/navIcons/profile.png";
import pencil from "../../../assetsOld/navIcons/pencil.png";
import envelopeOpened from "../../../assetsOld/navIcons/envelopeOpened.png";
import { Link } from "react-router-dom";
const ProfileNavigation: FC = () => {
  return (
    <nav className="hidden w-full max-w-[181px] flex-col gap-5 sm:flex">
      <div className="flex gap-2.5">
        <img src={profile} alt="" className="max-h-6 max-w-6" />
        <Link to="/profile">
          <span className="font-primary text-400 font-normal leading-[1.4]">
            Профиль
          </span>
        </Link>
      </div>
      <div className="flex gap-2.5">
        <img src={pencil} alt="" className="max-h-6 max-w-6" />
        <Link to="/profile/drafts">
          <span className="font-primary text-400 font-normal leading-[1.4]">
            Мои черновики
          </span>
        </Link>
      </div>
      <div className="flex gap-2.5">
        <img src={envelopeOpened} alt="" className="max-h-6 max-w-6" />
        <Link to="/profile/invitations">
          <span className="font-primary text-400 font-normal leading-[1.4]">
            Мои приглашения
          </span>
        </Link>
      </div>
      <div className="flex gap-2.5">
        <img src={envelopeOpened} alt="" className="max-h-6 max-w-6" />
        <Link to="/profile/guest-answers">
          <span className="font-primary text-400 font-normal leading-[1.4]">
            Ответы гостей
          </span>
        </Link>
      </div>
    </nav>
  );
};

export default ProfileNavigation;
