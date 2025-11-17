import { FC, useState } from "react";
import ConstructorLayout from "../layouts/ConstructorLayout";
import ProgramForm from "../components/ConstructorForms/Forms/ProgramForm";
import InvitationPreview from "../../Templates/InvitationPreview";

const ProgramConstructor: FC = () => {
  const [calculatedHeight, setCalculatedHeight] = useState<number | null>(null);
  const [calculatedWidth, setCalculatedWidth] = useState<number | null>(null);

  return (
    <ConstructorLayout
      form={<ProgramForm />}
      previewBlock={"program"}
      calculatedHeight={calculatedHeight}
      calculatedWidth={calculatedWidth}
      setCalculatedHeight={setCalculatedHeight}
      setCalculatedWidth={setCalculatedWidth}
    />
  );
};

export default ProgramConstructor;
