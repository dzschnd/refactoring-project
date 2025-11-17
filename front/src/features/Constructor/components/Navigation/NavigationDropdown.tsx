import React, { FC, useState } from "react";
import { Link } from "react-router-dom";
import arrowDown from "../../../../assetsOld/buttonIcons/arrowDown.png";
import { constructorPages } from "../../layouts/ConstructorLayout";

interface Props {
  currentPage: string;
}
const NavigationDropdown: FC<Props> = ({ currentPage }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="relative md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="flex h-11 w-full cursor-pointer items-center justify-center gap-2.5 rounded-[7px] border-[1px] border-grey-100 text-center font-primary text-400 font-semibold leading-[1.4] text-grey-500 sm:w-[328px]"
      >
        {currentPage}
        <img
          src={arrowDown}
          alt="Dropdown"
          className={`h-6 w-6 transform ${isOpen ? "rotate-180" : "rotate-0"}`}
        />
      </button>

      <ul
        className={`absolute z-10 w-full flex-col items-center justify-between rounded-[7px] border-[1px] border-grey-50 bg-white text-center font-primary text-400 font-semibold leading-[1.4] text-grey-500 sm:w-[328px] ${
          isOpen ? "flex" : "hidden"
        }`}
      >
        {constructorPages
          .filter((page) => page.name !== currentPage)
          .map((page) => (
            <li key={page.name} className="w-full">
              <Link to={page.link}>
                <p className="py-3">{page.name}</p>
              </Link>
            </li>
          ))}
      </ul>
    </nav>
  );
};

export default NavigationDropdown;
