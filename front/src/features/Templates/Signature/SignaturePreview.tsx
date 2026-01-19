import type { FC } from "react";
import logo from "../../../assetsOld/brand/logo.png";

interface SignatureProps {
  scale: (value: number) => string;
  isMobile: boolean;
}

const Signature: FC<SignatureProps> = ({ scale }) => {
  return (
    <div className="flex flex-col items-center" style={{ gap: scale(15) }}>
      <h1 className={"leading-[1.4]"} style={{ fontSize: scale(14) }}>
        Made by
      </h1>
      <img
        style={{ height: scale(18), width: scale(118) }}
        src={logo}
        alt="EVENTESS"
      />
    </div>
  );
};

export default Signature;
