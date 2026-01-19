import type { FC } from "react";
import { currentDateISO } from "../../../../utils/dateUtils";

const GuestAnswerSkeleton: FC = () => {
  return (
    <div className="mt-10">
      <div className="scrollbar-hide flex gap-[30px] overflow-x-auto pb-[3px]">
        <span className="border-b-[2px] border-b-red-500 font-primary text-400 font-semibold leading-[1.4] text-grey-500">
          {"firstPartnerName"} и {"secondPartnerName"} ({currentDateISO()})
        </span>
      </div>

      <div>
        <div className="mt-[30px] flex flex-col gap-5">
          <dl className="flex flex-col gap-5 rounded-[20px] bg-green-50 bg-grey-50 p-5 md:p-[30px]">
            <div className="flex flex-col sm:flex-row">
              <dt className="mb-2.5 font-primary text-400 font-semibold leading-[1.4] text-grey-500">
                Имя:&nbsp;
              </dt>
              <dd className="font-primary text-400 font-light leading-[1.4] text-grey-500">
                {"guest_name"}
              </dd>
            </div>
            <div className="flex flex-col sm:flex-row">
              <dt className="mb-2.5 font-primary text-400 font-semibold leading-[1.4] text-grey-500">
                Присутствие:&nbsp;
              </dt>
              <dd className="font-primary text-400 font-light leading-[1.4] text-grey-500">
                {"С удовольствием приеду (приедем)"}
              </dd>
            </div>
            <div>
              <div className="flex flex-col sm:flex-row">
                <dt className="mb-2.5 font-primary text-400 font-semibold leading-[1.4] text-grey-500">
                  {"question"}:&nbsp;
                </dt>
                <dd className="font-primary text-400 font-light leading-[1.4] text-grey-500">
                  {"groupedAnswers.join(', ')"}
                </dd>
              </div>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default GuestAnswerSkeleton;
