import { useState } from "react";
import type { FC } from "react";
import ConstructorLayout from "../layouts/ConstructorLayout";
import WishesForm from "../components/ConstructorForms/Forms/WishesForm";

const WishesConstructor: FC = () => {
  const [calculatedHeight, setCalculatedHeight] = useState<number | null>(null);
  const [calculatedWidth, setCalculatedWidth] = useState<number | null>(null);

  return (
    <ConstructorLayout
      form={<WishesForm />}
      previewBlock={"wishes"}
      calculatedHeight={calculatedHeight}
      calculatedWidth={calculatedWidth}
      setCalculatedHeight={setCalculatedHeight}
      setCalculatedWidth={setCalculatedWidth}
    />
  );
};

export default WishesConstructor;
