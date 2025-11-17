import { FC, useState } from "react";
import ConstructorLayout from "../layouts/ConstructorLayout";
import DateForm from "../components/ConstructorForms/Forms/DateForm";

const DateConstructor: FC = () => {
  const [calculatedHeight, setCalculatedHeight] = useState<number | null>(null);
  const [calculatedWidth, setCalculatedWidth] = useState<number | null>(null);

  return (
    <ConstructorLayout
      form={<DateForm />}
      previewBlock={"date"}
      calculatedHeight={calculatedHeight}
      calculatedWidth={calculatedWidth}
      setCalculatedHeight={setCalculatedHeight}
      setCalculatedWidth={setCalculatedWidth}
    />
  );
};

export default DateConstructor;
