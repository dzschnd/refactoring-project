import { useCallback, useEffect, useRef, useState } from "react";
import type { FC, ReactNode } from "react";
import ConstructorHeader from "../components/ConstructorHeader";
import PreviewLayout from "./PreviewLayout";
import { useSelector } from "react-redux";
import type { RootState } from "../../../api/redux/store";
import { useNavigate } from "react-router-dom";

interface ConstructorLayoutProps {
  form: ReactNode;
  previewBlock: string;
  calculatedWidth: number | null;
  calculatedHeight: number | null;
  setCalculatedWidth: (height: number) => void;
  setCalculatedHeight: (height: number) => void;
}
interface PageInfo {
  name: string;
  link: string;
  required: boolean;
}
export const constructorPages: PageInfo[] = [
  { name: "Обложка", link: "/constructor/names", required: true },
  { name: "Дата", link: "/constructor/date", required: true },
  { name: "Место", link: "/constructor/place", required: true },
  { name: "Программа", link: "/constructor/program", required: true },
  { name: "Дресс-код", link: "/constructor/dresscode", required: false },
  { name: "Пожелания", link: "/constructor/wishes", required: false },
  { name: "Анкета", link: "/constructor/guest-form", required: true },
];

const ConstructorLayout: FC<ConstructorLayoutProps> = ({
  form,
  previewBlock,
  calculatedWidth,
  calculatedHeight,
  setCalculatedWidth,
  setCalculatedHeight,
}) => {
  const { templateName } = useSelector((state: RootState) => state.draft);
  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState<boolean>(true);
  const previewContainerRef = useRef<HTMLDivElement | null>(null);

  const calculateHeight = useCallback(() => {
    if (previewContainerRef.current) {
      const parentHeight = previewContainerRef.current.clientHeight;
      const paddingToSubtract = 100;
      const height = parentHeight - paddingToSubtract;
      setCalculatedHeight(height);
    }
  }, [setCalculatedHeight]);
  const calculateWidth = useCallback(() => {
    if (previewContainerRef.current) {
      const parentWidth = previewContainerRef.current.clientWidth;
      const paddingToSubtract = 0;
      const width = parentWidth - paddingToSubtract;
      setCalculatedWidth(width);
    }
  }, [setCalculatedWidth]);

  useEffect(() => {
    if (!templateName) {
      navigate("/");
    }
  }, [navigate, templateName]);

  useEffect(() => {
    calculateHeight();
    calculateWidth();
    window.addEventListener("resize", calculateHeight);
    window.addEventListener("resize", calculateWidth);
    return () => {
      window.removeEventListener("resize", calculateHeight);
      window.removeEventListener("resize", calculateWidth);
    };
  }, [calculateHeight, calculateWidth]);

  return (
    <div className="flex h-screen flex-col">
      <ConstructorHeader isMobile={isMobile} setIsMobile={setIsMobile} />
      <div className="flex flex-grow gap-5 overflow-y-hidden">
        {form}
        <div
          ref={previewContainerRef}
          className="hidden w-full items-center justify-center py-[30px] pr-[30px] sm:flex"
        >
          <PreviewLayout
            isMobile={isMobile}
            block={previewBlock}
            calculatedWidth={calculatedWidth}
            calculatedHeight={calculatedHeight}
          />
        </div>
      </div>
    </div>
  );
};

export default ConstructorLayout;
