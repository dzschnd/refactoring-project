import { useState } from "react";
import type { FC } from "react";
import ConstructorLayout from "../layouts/ConstructorLayout";
import PlaceForm from "../components/ConstructorForms/Forms/PlaceForm";

const PlaceConstructor: FC = () => {
  const [calculatedHeight, setCalculatedHeight] = useState<number | null>(null);
  const [calculatedWidth, setCalculatedWidth] = useState<number | null>(null);

  return (
    <ConstructorLayout
      form={<PlaceForm />}
      previewBlock={"place"}
      calculatedHeight={calculatedHeight}
      calculatedWidth={calculatedWidth}
      setCalculatedHeight={setCalculatedHeight}
      setCalculatedWidth={setCalculatedWidth}
    />
  );
};

export default PlaceConstructor;
