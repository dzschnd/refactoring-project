import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Catalog from "./features/Catalog/Catalog";
import ProfilePage from "./features/Profile/pages/ProfilePage";
import MyDraftsPage from "./features/Profile/pages/MyDraftsPage";
import MyInvitationsPage from "./features/Profile/pages/MyInvitationsPage";
import MyGuestAnswersPage from "./features/Profile/pages/MyGuestAnswersPage";
import Home from "./features/Home/Home";
import TestTemplate from "./features/Templates/TestTemplate/TestTemplate";
import NamesConstructor from "./features/Constructor/pages/NamesConstructor";
import DateConstructor from "./features/Constructor/pages/DateConstructor";
import PlaceConstructor from "./features/Constructor/pages/PlaceConstructor";
import ProgramConstructor from "./features/Constructor/pages/ProgramConstructor";
import DresscodeConstructor from "./features/Constructor/pages/DresscodeConstructor";
import WishesConstructor from "./features/Constructor/pages/WishesConstructor";
import GuestFormConstructor from "./features/Constructor/pages/GuestFormConstructor";
import PreviewPage from "./features/Constructor/pages/PreviewPage";
import { I18nProvider } from "@react-aria/i18n";
import { useAppDispatch } from "./api/redux/hooks";
import { getUser } from "./api/service/UserService";
import Invitation from "./features/Templates/Invitation";
import RedVelvetTemplate from "./features/Templates/RedVelvet/RedVelvetTemplate";
import PageNotFound from "./features/PageNotFound/PageNotFound";
import ScrollToTop from "./utils/ScrollToTop";
import { NezhnostTemplate } from "./features/Templates/Nezhnost/NezhnostTemplate";
import { Blog } from "./features/Blog/Blog";
import { PinkVibeTemplate } from "./features/Templates/PinkVibe/PinkVibeTemplate";
import { MinimalismTemplate } from "./features/Templates/Minimalism/MinimalismTemplate";
import { PrivacyPolicy } from "./features/Legal/PrivacyPolicy";
import GlobalSpinner from "./components/GlobalSpinner";
import ErrorToast from "./components/ErrorToast";

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(getUser());
  }, [dispatch]);

  return (
    <I18nProvider locale={"ru-RU"}>
      <BrowserRouter>
        <GlobalSpinner />
        <ErrorToast />
        <ScrollToTop>
          <Routes>
            <Route path={"/"} element={<Home />} />

            <Route path={"/privacy-policy"} element={<PrivacyPolicy />} />

            <Route path={"/profile"} element={<ProfilePage />} />
            <Route path={"/profile/drafts"} element={<MyDraftsPage />} />
            <Route
              path={"/profile/invitations"}
              element={<MyInvitationsPage />}
            />
            <Route
              path={"/profile/guest-answers"}
              element={<MyGuestAnswersPage />}
            />

            <Route path={"/catalog"} element={<Catalog />} />

            <Route path={"/constructor/names"} element={<NamesConstructor />} />
            <Route path={"/constructor/date"} element={<DateConstructor />} />
            <Route path={"/constructor/place"} element={<PlaceConstructor />} />
            <Route
              path={"/constructor/program"}
              element={<ProgramConstructor />}
            />
            <Route
              path={"/constructor/dresscode"}
              element={<DresscodeConstructor />}
            />
            <Route
              path={"/constructor/wishes"}
              element={<WishesConstructor />}
            />
            <Route
              path={"/constructor/guest-form"}
              element={<GuestFormConstructor />}
            />
            <Route path={"/constructor/preview"} element={<PreviewPage />} />

            <Route path={`/invitations/:id`} element={<Invitation />} />

            <Route path={`/blog`} element={<Blog />} />

            <Route path={"*"} element={<PageNotFound />} />

            <Route path={"/templates/test"} element={<TestTemplate />} />
            <Route
              path={"/templates/red-velvet"}
              element={<RedVelvetTemplate />}
            />
            <Route
              path={"/templates/nezhnost"}
              element={<NezhnostTemplate />}
            />
            <Route
              path={"/templates/pinkVibe"}
              element={<PinkVibeTemplate />}
            />
            <Route
              path={"/templates/minimalism"}
              element={<MinimalismTemplate />}
            />
          </Routes>
        </ScrollToTop>
      </BrowserRouter>
    </I18nProvider>
  );
};

export default App;
