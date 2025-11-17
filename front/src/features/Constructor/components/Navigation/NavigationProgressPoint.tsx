import React, { FC, useState } from "react";
import { Link } from "react-router-dom";
import currentPageIcon from "../../../../assetsOld/navIcons/blockSelected.png";
interface Props {
  page: string;
  current: boolean;
  link: string;
}
const NavigationProgressPoint: FC<Props> = ({ page, link, current }) => {
  return (
    <Link
      to={link}
      className={`${current ? "cursor-default" : "cursor-pointer"}`}
    >
      <span>{page}</span>
      <div className="relative w-[74px]">
        <div className="relative h-[17px] w-[17px] rounded-full border-[2px] border-grey-400">
          {current && (
            <img
              src={currentPageIcon}
              alt="Current"
              className="absolute left-[-1.6px] top-[-1.2px] max-h-[17px] min-w-[17px] rounded-full"
            />
          )}
        </div>
        <div className="absolute right-0 top-1/2 w-[52px] -translate-y-1/2 transform border-[1px] border-grey-400"></div>
      </div>
    </Link>
  );
};

export default NavigationProgressPoint;
