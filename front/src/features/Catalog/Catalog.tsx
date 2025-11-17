import { FC } from "react";
import { PageLayout } from "../../layouts/PageLayout";
import Cta from "../Home/Cta";
import { templates } from "../../constants";
import TemplateCard from "../Templates/TemplateCard";

const Catalog: FC = () => {
  return (
    <PageLayout
      className={
        "gap-[160px] pb-[160px] pt-[40px] sm:pb-[172px] md:pb-[190px] md:pt-[80px]"
      }
    >
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
            <div key={index}>
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
      </section>
      <div className={"hidden w-full justify-center sm:flex"}>
        <Cta />
      </div>
    </PageLayout>
  );
};

export default Catalog;
