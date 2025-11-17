import { FC } from "react";
import logo from "../../../assetsOld/brand/logo.png";

const Signature: FC = () => {
  return (
    <div className="flex flex-col items-center gap-[15px]">
      <h1 className={"text-300 leading-[1.4]"}>Made by</h1>
      <img className={"h-[18px] w-[118px]"} src={logo} alt="EVENTESS" />
    </div>
  );
};

export default Signature;
