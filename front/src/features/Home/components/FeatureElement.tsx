import { FC, ReactNode } from "react";
import { SparkIcon } from "../../../assets/svg/SparkIcon";
import clsx from "clsx";

type FeatureElementProps = {
  icon: ReactNode;
  index: number;
  heading: string;
  description: string;
};

const FeatureElement: FC<FeatureElementProps> = ({
  icon,
  index,
  heading,
  description,
}) => {
  return (
    <div className={"relative"}>
      <div
        className={
          "flex flex-col items-center gap-3 text-center sm:max-w-[280px] md:h-[181px]"
        }
      >
        {icon}
        <h3
          className={
            "mt-[6px] text-300 font-semibold uppercase leading-[1.2] text-primary sm:text-400"
          }
        >
          {heading}
        </h3>
        <p
          className={
            "text-200 font-normal leading-[1.4] text-primary sm:text-300"
          }
        >
          {description}
        </p>
        <div />
      </div>
      <div className={"flex items-center gap-[18px] sm:hidden"}>
        <SparkIcon />
        <div className={"h-0 w-full rounded-full border-t border-primary"} />
        <SparkIcon />
      </div>
      <div
        className={clsx(
          index === 0 && "-bottom-[29.5px] left-[-42px] w-[338px] sm:block",
          index === 1 && "-bottom-[29.5px] right-[-42px] w-[338px] sm:block",
          "absolute hidden rounded-full border-t border-primary md:-bottom-[44px] md:left-0 md:block md:w-full",
        )}
      />
      <div
        className={clsx(
          index === 0 &&
            "-bottom-[3px] left-[calc(100%+41.5px)] h-[197px] sm:block",
          index === 2 &&
            "-top-[3px] left-[calc(100%+41.5px)] h-[197px] sm:block",
          index !== 3 && "md:block",
          "absolute hidden rounded-full border-l border-primary md:left-[calc(100%+48.67px/2-0.5px)] md:top-[-17.5px] md:h-[216px]",
        )}
      />
      <div
        className={clsx(
          index === 0 &&
            "left-[calc(100%+42px)] top-[calc(100%+30px)] sm:block",
          index !== 3 && "md:block",
          "absolute hidden -translate-x-1/2 -translate-y-1/2 md:left-[calc(100%+24px)] md:top-[calc(100%+44px)]",
        )}
      >
        <SparkIcon />
      </div>
    </div>
  );
};

export default FeatureElement;
