import { FC, useState } from "react";
import ConstructorLayout from "../layouts/ConstructorLayout";
import GuestFormForm from "../components/ConstructorForms/Forms/GuestFormForm";

const GuestFormConstructor: FC = () => {
  const [calculatedHeight, setCalculatedHeight] = useState<number | null>(null);
  const [calculatedWidth, setCalculatedWidth] = useState<number | null>(null);

  return (
    <ConstructorLayout
      form={<GuestFormForm />}
      previewBlock={"guest-form"}
      calculatedHeight={calculatedHeight}
      calculatedWidth={calculatedWidth}
      setCalculatedHeight={setCalculatedHeight}
      setCalculatedWidth={setCalculatedWidth}
    />
  );
};

export default GuestFormConstructor;
