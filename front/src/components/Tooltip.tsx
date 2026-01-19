import { useState } from "react";
import type { FC, ReactNode } from "react";
import { TooltipIcon } from "../assets/svg/common/TooltipIcon";
import { TooltipCloudEdge } from "../assets/svg/common/TooltipCloudEdge";
import clsx from "clsx";

type TooltipProps = {
  contents: ReactNode;
  edgePosition: "left" | "right" | "center";
};

export const Tooltip: FC<TooltipProps> = ({ contents, edgePosition }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className={"relative"}>
      <div
        onMouseOver={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <TooltipIcon />
      </div>
      <div
        className={clsx(
          "absolute top-0 -translate-y-full transition-opacity duration-200 ease-in-out",
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
          edgePosition === "left" && "-left-[9px]",
          edgePosition === "right" && "-right-[9px]",
          edgePosition === "center" && "left-[7px] -translate-x-1/2",
        )}
      >
        <div className={"min-w-[288px] rounded-9 bg-white p-3 shadow-tooltip"}>
          {contents}
        </div>
        <div
          className={clsx(
            "flex px-2.5",
            edgePosition === "left" && "justify-start",
            edgePosition === "right" && "justify-end",
            edgePosition === "center" && "justify-center",
          )}
        >
          <TooltipCloudEdge />
        </div>
      </div>
    </div>
  );
};
