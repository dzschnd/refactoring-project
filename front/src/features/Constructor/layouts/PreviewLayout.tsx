import type { FC } from "react";
import { IphoneMockup } from "../../../assets/svg/IphoneMockup";
import {
  calculatePreviewHeight,
  calculatePreviewWidth,
} from "../../../utils/previewUtils";
import InvitationPreview from "../../Templates/InvitationPreview";

interface PreviewLayoutProps {
  isMobile: boolean;
  block: string;
  calculatedWidth: number | null;
  calculatedHeight: number | null;
}

const PreviewLayout: FC<PreviewLayoutProps> = ({
  isMobile,
  block,
  calculatedWidth,
  calculatedHeight,
}) => {
  if (!calculatedWidth) return null;

  return (
    <div className={"flex h-full w-full items-center justify-center"}>
      {isMobile ? (
        <div
          className={
            "relative flex items-center justify-center overflow-y-hidden"
          }
          style={{
            maxHeight: `${calculatedWidth && calculatedHeight ? Math.min(calculatedWidth * (1677 / 823), calculatedHeight) + "px" : "1677px"}`,
            maxWidth: `${calculatedWidth && calculatedHeight ? Math.min(calculatedWidth, calculatedHeight * (823 / 1677)) + "px" : "823px"}`,
          }}
        >
          <IphoneMockup />
          <InvitationPreview
            block={block}
            width={calculatePreviewWidth(
              calculatedWidth,
              calculatedHeight,
              isMobile,
            )}
            height={calculatePreviewHeight(
              calculatedWidth,
              calculatedHeight,
              isMobile,
            )}
            isMobile={isMobile}
          />
        </div>
      ) : (
        <>
          <div
            className="hidden h-full w-full items-center justify-center rounded-[30px] border-[9px] border-grey-500 md:flex"
            style={{
              maxHeight: `${calculatedWidth && calculatedHeight ? Math.min(calculatedWidth * (453 / 807), calculatedHeight) + "px" : "453px"}`,
              maxWidth: `${calculatedWidth && calculatedHeight ? Math.min(calculatedWidth, calculatedHeight * (807 / 453)) + "px" : "807px"}`,
            }}
          >
            <InvitationPreview
              block={block}
              width={calculatePreviewWidth(
                calculatedWidth,
                calculatedHeight,
                isMobile,
              )}
              height={calculatePreviewHeight(
                calculatedWidth,
                calculatedHeight,
                isMobile,
              )}
              isMobile={isMobile}
            />
          </div>
          <div
            className="flex h-full w-full items-center justify-center rounded-[30px] border-[9px] border-grey-500 md:hidden"
            style={{
              maxHeight: `${calculatedWidth && calculatedHeight ? Math.min(calculatedWidth * (508 / 232), calculatedHeight) + "px" : "508px"}`,
              maxWidth: `${calculatedWidth && calculatedHeight ? Math.min(calculatedWidth, calculatedHeight * (232 / 508)) + "px" : "232px"}`,
            }}
          >
            <InvitationPreview
              block={block}
              width={calculatePreviewWidth(
                calculatedWidth,
                calculatedHeight,
                isMobile,
              )}
              height={calculatePreviewHeight(
                calculatedWidth,
                calculatedHeight,
                isMobile,
              )}
              isMobile={isMobile}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default PreviewLayout;
