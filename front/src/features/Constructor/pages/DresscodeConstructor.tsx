import { useState } from "react";
import type { FC } from "react";
import ConstructorLayout from "../layouts/ConstructorLayout";
import DresscodeForm from "../components/ConstructorForms/Forms/DresscodeForm";

const DresscodeConstructor: FC = () => {
  const [calculatedHeight, setCalculatedHeight] = useState<number | null>(null);
  const [calculatedWidth, setCalculatedWidth] = useState<number | null>(null);

  return (
    <ConstructorLayout
      form={<DresscodeForm />}
      previewBlock={"dresscode"}
      calculatedHeight={calculatedHeight}
      calculatedWidth={calculatedWidth}
      setCalculatedHeight={setCalculatedHeight}
      setCalculatedWidth={setCalculatedWidth}
    />
  );
};

export default DresscodeConstructor;
