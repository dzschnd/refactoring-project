import { useState } from "react";
import type { FC } from "react";
import ConstructorLayout from "../layouts/ConstructorLayout";
import NamesForm from "../components/ConstructorForms/Forms/NamesForm";

const NamesConstructor: FC = () => {
  const [calculatedHeight, setCalculatedHeight] = useState<number | null>(null);
  const [calculatedWidth, setCalculatedWidth] = useState<number | null>(null);

  return (
    <ConstructorLayout
      form={<NamesForm />}
      previewBlock={"names"}
      calculatedHeight={calculatedHeight}
      calculatedWidth={calculatedWidth}
      setCalculatedHeight={setCalculatedHeight}
      setCalculatedWidth={setCalculatedWidth}
    />
  );
};

export default NamesConstructor;
