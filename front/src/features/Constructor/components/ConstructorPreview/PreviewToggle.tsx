import { FC } from "react";
import mobileIcon from "../../../../assetsOld/buttonIcons/smartphone.png";
import mobileFocusedIcon from "../../../../assetsOld/buttonIcons/smartphoneFocused.png";
import desktopIcon from "../../../../assetsOld/buttonIcons/monitor.png";
import desktopFocusedIcon from "../../../../assetsOld/buttonIcons/monitorFocused.png";

interface Props {
  isMobile: boolean;
  setIsMobile: (isMobile: boolean) => void;
}
const PreviewToggle: FC<Props> = ({ isMobile, setIsMobile }) => {
  return (
    <div className="flex gap-[15px]">
      <button onClick={() => setIsMobile(true)}>
        <img
          src={isMobile ? mobileFocusedIcon : mobileIcon}
          alt="Mobile Version"
          className={`${isMobile ? "cursor-default" : "cursor-pointer"} h-[21px] w-[21px]`}
        />
      </button>
      <button onClick={() => setIsMobile(false)}>
        <img
          src={!isMobile ? desktopFocusedIcon : desktopIcon}
          alt="Desktop Version"
          className={`${!isMobile ? "cursor-default" : "cursor-pointer"} h-[21px] w-[21px]`}
        />
      </button>
    </div>
  );
};

export default PreviewToggle;
