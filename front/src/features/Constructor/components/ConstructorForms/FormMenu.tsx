import { FC, PropsWithChildren, useState } from "react";
import cross from "../../../../assetsOld/buttonIcons/cross.png";
import arrowRight from "../../../../assetsOld/buttonIcons/arrowRight.png";
import templatePreview from "../../../../assetsOld/templates/redVelvet/templatePreview.png";
import { Link } from "react-router-dom";
import { constructorPages } from "../../layouts/ConstructorLayout";
import { updateDraft } from "../../../../api/service/DraftService";
import { AppDispatch, RootState } from "../../../../api/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { templates } from "../../../../constants";

interface FormLayoutProps extends PropsWithChildren {
  pageIndex: number;
  setIsMenuOpen: (isOpen: boolean) => void;
}
const FormMenu: FC<FormLayoutProps> = ({ pageIndex, setIsMenuOpen }) => {
  const dispatch: AppDispatch = useDispatch();
  const { id } = useSelector((state: RootState) => state.draft);
  const [isNavOpen, setIsNavOpen] = useState<boolean>(true);
  const [isChangeTemplateOpen, setIsChangeTemplateOpen] =
    useState<boolean>(false);

  const handleChangeTemplate = async (templateName: string) => {
    await dispatch(
      updateDraft({
        id: id,
        templateName: templateName,
      }),
    );
  };

  return (
    <div className="relative min-h-full w-full overflow-y-auto overflow-x-hidden sm:w-[423px] sm:min-w-[423px] sm:shadow-form">
      <div className="absolute inset-0 flex min-h-full w-full justify-center pl-[16px] pr-[16px] pt-[20px] sm:w-[423px] sm:min-w-[423px] sm:pl-[30px] sm:pr-[30px] sm:pt-[40px]">
        <div className="flex w-[328px] flex-col gap-[30px] sm:w-[363px]">
          <div className="flex justify-end">
            <button onClick={() => setIsMenuOpen(false)}>
              <img src={cross} alt="Close Menu" className="h-[24px] w-[24px]" />
            </button>
          </div>

          <div className="flex flex-col gap-[20px]">
            <button
              onClick={() => setIsNavOpen(!isNavOpen)}
              className="flex items-center justify-between font-primary text-600 font-semibold text-grey-400"
            >
              <span>Редактировать разделы</span>
              <img
                src={arrowRight}
                alt={""}
                className="h-[24px] w-[24px]"
                style={{ transform: `rotate(${isNavOpen ? `90deg` : `0`}` }}
              />
            </button>
            {isNavOpen && (
              <div className="flex flex-col gap-[16px]">
                {constructorPages.map((page) => (
                  <div className="flex" key={page.link}>
                    <Link
                      to={page.link}
                      className="flex flex-grow justify-start"
                    >
                      <button
                        disabled={
                          page.link === constructorPages[pageIndex].link
                        }
                        className="flex w-full font-primary text-500 font-normal text-grey-400 disabled:text-grey-100"
                      >
                        {page.name}
                      </button>
                    </Link>
                    {/*{!page.required &&*/}
                    {/*  <DisableBlockToggle blockLink={page.link}/>*/}
                    {/*}*/}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-[20px]">
            <button
              onClick={() => setIsChangeTemplateOpen(!isChangeTemplateOpen)}
              className="flex items-center justify-between font-primary text-600 font-semibold text-grey-400"
            >
              <span>Выбрать другой шаблон</span>
              <img
                src={arrowRight}
                alt={""}
                className="h-[24px] w-[24px]"
                style={{
                  transform: `rotate(${isChangeTemplateOpen ? `90deg` : `0`}`,
                }}
              />
            </button>
            {isChangeTemplateOpen && (
              <div className="mb-5 grid grid-cols-2 gap-5">
                {templates.map((template) => (
                  <div className="flex flex-col gap-4 rounded-[10px] bg-grey-50 p-2">
                    <img
                      src={templatePreview}
                      alt={template.name}
                      className="h-[180px] w-[155px]"
                    />
                    <div className="flex justify-between">
                      <span>"{template.name}"</span>
                      <span>{template.price} ₽</span>
                    </div>
                    <div className="flex flex-col gap-[6px]">
                      <button
                        onClick={() => handleChangeTemplate(template.name)}
                        className="w-[155px] rounded-[42px] bg-red-700 py-2 font-primary text-300 font-normal text-white"
                      >
                        Выбрать
                      </button>
                      <Link to={template.link}>
                        <button className="w-[155px] rounded-[42px] border-[1px] border-red-700 bg-white py-2 font-primary text-300 font-normal text-red-700">
                          Смотреть
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormMenu;
