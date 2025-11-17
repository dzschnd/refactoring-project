import { FC, PropsWithChildren, useState } from "react";
import DisableBlockToggle from "../components/DisableBlockToggle";
import hamburgerMenu from "../../../assetsOld/hamburger-menu.png";
import arrowLeft from "../../../assetsOld/buttonIcons/arrowLeft.png";
import arrowRight from "../../../assetsOld/buttonIcons/arrowRight.png";
import { Link } from "react-router-dom";
import { constructorPages } from "./ConstructorLayout";
import FormMenu from "../components/ConstructorForms/FormMenu";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../api/redux/store";
import { setLastViewedConstructorBlock } from "../../../api/redux/slices/draftSlice";

interface FormLayoutProps extends PropsWithChildren {
  pageIndex: number;
  description: string;
  isBlockDisabled?: boolean;
  setIsBlockDisabled?: (disabled: boolean) => void;
}
const FormLayout: FC<FormLayoutProps> = ({
  children,
  pageIndex,
  description,
  setIsBlockDisabled,
  isBlockDisabled,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();

  return isMenuOpen ? (
    <FormMenu pageIndex={pageIndex} setIsMenuOpen={setIsMenuOpen} />
  ) : (
    <div className="relative flex min-h-full w-full max-w-full flex-col items-center justify-between bg-white sm:max-w-[423px] sm:shadow-form">
      <div className="relative w-full flex-grow overflow-y-auto overflow-x-hidden sm:w-[423px] sm:min-w-[423px] sm:shadow-form">
        <div className="absolute inset-0 flex min-h-full w-full justify-center pl-[16px] pr-[16px] pt-[20px] sm:w-[423px] sm:min-w-[423px] sm:pl-[30px] sm:pr-[30px] sm:pt-[40px]">
          <div className="w-[328px] sm:w-[363px]">
            <div className="mb-[40px] flex justify-between">
              <h1 className="font-primary text-600 font-semibold text-grey-400">
                {constructorPages[pageIndex].name}
              </h1>
              <div className="flex items-center gap-3">
                {!constructorPages[pageIndex].required &&
                  isBlockDisabled !== undefined &&
                  setIsBlockDisabled && (
                    <DisableBlockToggle
                      isBlockDisabled={isBlockDisabled}
                      setIsBlockDisabled={setIsBlockDisabled}
                      blockLink={constructorPages[pageIndex].link}
                    />
                  )}
                <button onClick={() => setIsMenuOpen(true)}>
                  <img
                    src={hamburgerMenu}
                    alt="Open Menu"
                    className="h-[24px] w-[24px]"
                  />
                </button>
              </div>
            </div>
            <div className="">
              {isBlockDisabled && (
                <div className="absolute bottom-0 left-0 right-0 top-[90px] z-10 bg-grey-50 bg-opacity-50"></div>
              )}
              <p className="mb-[30px] font-primary text-300 font-normal text-grey-500">
                {description}
              </p>
              <div className="flex flex-col gap-5 pb-5">{children}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full justify-center gap-2.5 px-[30px] py-[24px] shadow-form-footer sm:max-w-[423px]">
        <Link
          to={
            pageIndex > 0
              ? constructorPages[pageIndex - 1].link
              : "/profile/drafts"
          }
        >
          <button
            onClick={() => dispatch}
            className="hidden h-[35px] w-[176.5px] rounded-[30px] border-[2px] border-grey-300 bg-white font-primary text-400 font-normal text-grey-300 sm:block"
          >
            Назад
          </button>
          <button className="h-[40px] w-[40px] rounded-full bg-grey-50 p-2 sm:hidden">
            <img
              src={arrowLeft}
              alt="Previous Page"
              className="h-[24px] w-[24px]"
            />
          </button>
        </Link>
        <Link to={"/constructor/preview"} className="sm:hidden">
          <button
            onClick={() =>
              dispatch(
                setLastViewedConstructorBlock(
                  constructorPages[pageIndex].link.replace("/constructor/", ""),
                ),
              )
            }
            className="h-[40px] w-[220px] rounded-[30px] bg-grey-300 font-primary text-400 font-normal text-white"
          >
            Предпросмотр
          </button>
        </Link>
        <Link
          to={
            pageIndex < constructorPages.length - 1
              ? constructorPages[pageIndex + 1].link
              : "/constructor/preview"
          }
        >
          <button
            onClick={() =>
              dispatch(
                setLastViewedConstructorBlock(
                  constructorPages[pageIndex].link.replace("/constructor/", ""),
                ),
              )
            }
            className="hidden h-[35px] w-[176.5px] rounded-[30px] bg-grey-300 font-primary text-400 font-normal text-white sm:block"
          >
            Далее
          </button>
          <button className="h-[40px] w-[40px] rounded-full bg-grey-50 p-2 sm:hidden">
            <img
              src={arrowRight}
              alt="Next Page"
              className="h-[24px] w-[24px]"
            />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FormLayout;
