import { useEffect, useRef, useState } from "react";
import type { FC } from "react";
import { useAppSelector } from "../../../api/redux/hooks";
import { Link, useNavigate } from "react-router-dom";
import cross from "../../../assetsOld/buttonIcons/cross.png";
import PreviewToggle from "../components/ConstructorPreview/PreviewToggle";
import profile from "../../../assetsOld/navIcons/profile.png";
import PreviewLayout from "../layouts/PreviewLayout";
import { getScrollbarWidth } from "../../../utils/getScrollbarWidth";
import useIsMobile from "../../../hooks/useIsMobile";

import {
  calculatePreviewHeight,
  calculatePreviewWidth,
} from "../../../utils/previewUtils";

import { SM_SCREEN_WIDTH } from "../../../constants";
import { getTemplatePreview } from "../../../utils/getTemplatePreview";

const PreviewPage: FC = () => {
  const scrollbarWidth = getScrollbarWidth();
  const navigate = useNavigate();
  const {
    templateName,
    firstPartnerName,
    secondPartnerName,
    coupleImage,
    eventDate,
    place,
    planItems,
    wishes,
    questions,
    answers,
    colors,
  } = useAppSelector((state) => state.draft);
  const [isMobilePreview, setIsMobilePreview] = useState(false);
  const [isMobileScreen, setIsMobileScreen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(true);
  const [calculatedHeight, setCalculatedHeight] = useState<number | null>(null);
  const [calculatedWidth, setCalculatedWidth] = useState<number | null>(null);
  const [loadingDimensions, setLoadingDimensions] = useState(true);

  const previewContainerRef = useRef<HTMLDivElement | null>(null);

  const calculateHeight = () => {
    if (previewContainerRef.current) {
      const parentHeight = previewContainerRef.current.clientHeight;
      const paddingToSubtract = 100;
      const height = parentHeight - paddingToSubtract;
      setCalculatedHeight(height);
    }
  };
  const calculateWidth = () => {
    if (previewContainerRef.current) {
      const parentWidth = previewContainerRef.current.clientWidth;
      const paddingToSubtract = 0;
      const width = parentWidth - paddingToSubtract;
      setCalculatedWidth(width);
      setIsMobileScreen(width < SM_SCREEN_WIDTH);
    }
  };

  useEffect(() => {
    if (!templateName) {
      navigate("/");
    }
  }, [navigate, templateName]);

  useEffect(() => {
    calculateHeight();
    calculateWidth();
    window.addEventListener("resize", calculateHeight);
    window.addEventListener("resize", calculateWidth);
    setLoadingDimensions(false);
    return () => {
      window.removeEventListener("resize", calculateHeight);
      window.removeEventListener("resize", calculateWidth);
    };
  }, []);

  if (!templateName) {
    navigate("/");
  }

  const isMobile = useIsMobile();
  const displayedDate = eventDate ? eventDate : "";
  const displayedCoupleImage =
    coupleImage &&
    "https://pub-6a9646833fc24b188cbc779464f80132.r2.dev" +
      coupleImage.split(".com")[1];
  const displayedPlaceImage =
    place &&
    place.placeImage &&
    "https://pub-6a9646833fc24b188cbc779464f80132.r2.dev" +
      place.placeImage.split(".com")[1];

  const templateWidth =
    isMobilePreview && !isMobileScreen && !loadingDimensions
      ? calculatePreviewWidth(
          calculatedWidth,
          calculatedHeight,
          isMobilePreview,
        )
      : window.innerWidth;
  const templateHeight =
    isMobilePreview && !isMobileScreen && !loadingDimensions
      ? calculatePreviewHeight(
          calculatedWidth,
          calculatedHeight,
          isMobilePreview,
        )
      : window.innerWidth;
  return (
    <div
      className={`${isMobilePreview && !isMobileScreen ? "flex justify-center" : ""} relative pt-[84px]`}
    >
      {isPopupOpen && (
        <div
          className={
            "fixed left-[30px] top-[30px] z-50 min-h-[319px] w-[393px] rounded-[30px] bg-white p-[30px] shadow-header"
          }
        >
          <div className="mb-5 flex justify-between">
            <span className={"text-500 font-normal text-grey-500"}>
              Демо-версия сайта
            </span>
            <button onClick={() => setIsPopupOpen(false)}>
              <img className={"h-6 w-6"} src={cross} alt="Close" />
            </button>
          </div>
          <p className={"text-300 font-light leading-[24px] text-grey-500"}>
            Посмотрите на ваш сайт глазами гостя!
            <br />
            <br />
            Именно так он будет выглядеть для приглашённых. Ответы на ваше
            приглашение будут поступать в личный кабинет, где вы сможете
            отслеживать всю статистику по подтверждениям и пожеланиям гостей. А
            если подключите уведомления в{" "}
            <strong className={"font-bold"}>Telegram-боте</strong>, то сможете
            получать ответы прямо туда!
          </p>
        </div>
      )}

      <div className="fixed left-0 right-0 top-0 z-40 flex h-[84px] items-center justify-center bg-white px-[16px] shadow-header sm:px-[30px] sm:py-[22px]">
        {/*<button onClick={handleGoBack} className="flex items-center gap-[10px]">*/}
        {/*    <img src={goBackIcon} alt="" className="h-[24px] w-[24px]" />*/}
        {/*    <span className="font-primary font-normal text-300 text-grey-400">*/}
        {/*        Вернуться в конструктор*/}
        {/*    </span>*/}
        {/*</button>*/}
        <div
          className={`hidden sm:block ${isMobilePreview ? `mr-[${scrollbarWidth}px]` : ""}`}
        >
          <PreviewToggle
            isMobile={isMobilePreview}
            setIsMobile={setIsMobilePreview}
          />
        </div>
        <div className="absolute right-4 flex items-center justify-end gap-[15px]">
          <Link to={"/profile"}>
            <img src={profile} alt="Profile" className="h-[24px] w-[24px]" />
          </Link>
        </div>
      </div>

      <div
        ref={previewContainerRef}
        className={`${isMobilePreview && !isMobileScreen ? "flex w-full items-center justify-center" : ""} h-[calc(100vh-84px)]`}
      >
        {isMobilePreview && !isMobileScreen && !loadingDimensions ? (
          <PreviewLayout
            isMobile={isMobilePreview}
            block={"names"}
            calculatedWidth={calculatedWidth}
            calculatedHeight={calculatedHeight}
          />
        ) : (
          getTemplatePreview(templateName, {
            firstPartnerName,
            secondPartnerName,
            coupleImage: displayedCoupleImage,
            eventDate: displayedDate,
            place: {
              address: place.address,
              placeImage: displayedPlaceImage,
              link: place.link,
            },
            colors,
            planItems,
            wishes,
            questions,
            answers,
            templateWidth,
            templateHeight,
            isMobile,
            isPreview: isMobilePreview && !isMobileScreen && !loadingDimensions,
            block: "names",
          })
        )}
      </div>
    </div>
  );
};

export default PreviewPage;
