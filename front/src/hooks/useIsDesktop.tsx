import { useState, useEffect } from "react";
import { MD_SCREEN_WIDTH } from "../constants";

const useIsDesktop = (breakpoint = MD_SCREEN_WIDTH) => {
  const [isDesktop, setIsDesktop] = useState(
    () => window.innerWidth >= breakpoint,
  );

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= breakpoint);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isDesktop;
};

export default useIsDesktop;
