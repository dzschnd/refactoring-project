import React, { FC, useState } from "react";
import NavigationProgressPoint from "./NavigationProgressPoint";
import { constructorPages } from "../../layouts/ConstructorLayout";

interface Props {
  currentPage: string;
}
const NavigationProgress: FC<Props> = ({ currentPage }) => {
  return (
    <nav className="hidden md:block">
      <ul className="flex gap-[5px] font-primary text-200 font-normal leading-[2] text-grey-400">
        {constructorPages.map((page) => (
          <li key={page.name}>
            <NavigationProgressPoint
              page={page.name}
              current={currentPage === page.name}
              link={page.link}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavigationProgress;
