import { useEffect } from "react";
import type { FC } from "react";
import Header from "../../../components/Header";
import ProfileNavigation from "../components/ProfileNavigation";
import ProfileInfo from "../components/Profile/ProfileInfo";
import Footer from "../../../components/Footer";
import LogoutButton from "../components/Profile/LogoutButton";
import ChangePassword from "../components/Profile/ChangePassword";
import { useNavigate } from "react-router-dom";
import MyGuestAnswersPreview from "../components/GuestAnswers/MyGuestAnswersPreview";
import MyDraftsPreview from "../components/Drafts/MyDraftsPreview";
import MyInvitationsPreview from "../components/Invitations/MyInvitationsPreview";
import { useSelector } from "react-redux";
import type { RootState } from "../../../api/redux/store";

const Register: FC = () => {
  const navigate = useNavigate();
  const { email } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (!email) {
      navigate("/");
    }
  }, [email, navigate]);

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <div className="flex flex-grow flex-col justify-between">
        <Header />
        <div className="flex max-w-[100vw] flex-col items-center justify-center px-4 pb-[160px] pt-[60px] sm:flex-row sm:items-start sm:gap-[64px] md:w-full md:gap-[117px] md:px-[60px] md:pb-[120px] md:pt-[120px]">
          <ProfileNavigation />
          <div className="flex max-w-[335px] flex-grow flex-col gap-[60px] sm:w-full sm:max-w-[467px] sm:gap-[30px] md:max-w-[862px] md:gap-[60px]">
            <ProfileInfo />
            <ChangePassword />

            <MyGuestAnswersPreview />
            <MyDraftsPreview />
            <MyInvitationsPreview />

            <LogoutButton />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Register;
