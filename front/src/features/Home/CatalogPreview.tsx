import { useState } from "react";
import type { FC } from "react";
import TemplateCard from "../Templates/TemplateCard";
import { Link } from "react-router-dom";
import { templates } from "../../constants";
import { LinkArrowIcon } from "../../assets/svg/LinkArrowIcon";
import clsx from "clsx";
const CatalogPreview: FC = () => {
  const [isLinkHovered, setIsLinkHovered] = useState<boolean>(false);

  return (
    <section>
      <h2
        className={
          "mb-6 text-center font-primary-condensed text-600 font-bold leading-[1.2] tracking-[-0.03em] text-primary sm:text-900 md:text-950"
        }
      >
        КАТАЛОГ
      </h2>
      <div
        className={
          "grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3 sm:gap-x-5 md:grid-cols-4"
        }
      >
        {templates.map((template, index) => (
          <div
            key={index}
            className={clsx(
              index === 3 && "sm:hidden md:block",
              index > 3 && "hidden",
            )}
          >
            <TemplateCard
              name={template.name}
              displayedName={template.displayedName}
              key={template.name}
              link={template.link}
              price={template.price}
              previewImage={template.previewImage}
            />
          </div>
        ))}
      </div>
      <Link
        to={"/catalog"}
        className={"mx-auto block max-w-[145px] sm:max-w-[166px]"}
      >
        <div
          onMouseOver={() => setIsLinkHovered(true)}
          onMouseLeave={() => setIsLinkHovered(false)}
          className={
            "mt-[32px] flex items-center justify-center gap-2 md:mt-[40px]"
          }
        >
          <span
            className={clsx(
              "text-200 font-semibold leading-[1] sm:text-300",
              isLinkHovered ? "text-primary-700" : "text-primary",
            )}
          >
            ПЕРЕЙТИ В КАТАЛОГ
          </span>
          <LinkArrowIcon inverted dark={isLinkHovered} />
        </div>
        <div
          className={clsx(
            "h-[1px] w-full sm:h-[1.5px]",
            isLinkHovered ? "bg-primary-700" : "bg-primary",
          )}
        />
      </Link>
    </section>
  );
};

export default CatalogPreview;
