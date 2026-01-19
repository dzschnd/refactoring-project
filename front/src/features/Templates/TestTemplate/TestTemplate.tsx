import type { FC } from "react";
import Date from "./Date";
import Names from "./Names";
import Place from "./Place";
import Program from "./Program";
import Dresscode from "./Dresscode";
import Wishes from "./Wishes";
import GuestForm from "./GuestForm";
import Signature from "../Signature/Signature";

const TestTemplate: FC = () => {
  return (
    <div className="flex flex-col items-center gap-[120px] px-5 pb-[106.7px] pt-8 md:gap-[160px] md:pb-[80px] md:pt-[121px]">
      <Names />
      <Place />
      <Date />
      <Program />
      <Dresscode />
      <Wishes />
      <GuestForm />
      <Signature />
    </div>
  );
};

export default TestTemplate;
