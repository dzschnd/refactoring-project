import { useState } from "react";
import type { FC } from "react";
import "./Accordion.css";
import { MinusIcon } from "../../../../assets/svg/MinusIcon";
import { PlusIcon } from "../../../../assets/svg/PlusIcon";
import clsx from "clsx";

type AccordionProps = {
  items: { question: string; answer: string }[];
};

const Accordion: FC<AccordionProps> = ({ items }) => {
  const [selected, setSelected] = useState<number | null>(null);

  const handleCheckOne = (index: number) => {
    setSelected(selected === index ? null : index);
  };

  return (
    <ul className={`flex flex-col`}>
      {items.map((item, index) => (
        <li
          key={index}
          className={clsx(
            "border-b border-dashed border-primary pb-[24px]",
            index > 0 && "pt-[24px]",
          )}
        >
          <input
            className="checkbox sr-only"
            id={`checkbox-${index}`}
            type="checkbox"
            checked={selected === index}
            onChange={() => handleCheckOne(index)}
          />
          <label
            htmlFor={`checkbox-${index}`}
            className={"flex cursor-pointer justify-between gap-3"}
          >
            <h4
              className={
                "text-300 font-semibold leading-[1.2] text-primary md:text-500"
              }
            >
              {item.question}
            </h4>
            {selected === index ? <MinusIcon /> : <PlusIcon />}
          </label>
          <div className={`answer-wrapper grid`}>
            <p
              className={
                "overflow-y-hidden text-200 font-normal leading-[1.4] text-primary md:text-400"
              }
            >
              {item.answer}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Accordion;
