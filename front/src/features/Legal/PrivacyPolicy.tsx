import type { FC } from "react";

type PrivacyPolicyProps = Record<string, never>;

export const PrivacyPolicy: FC<PrivacyPolicyProps> = (_props) => {
  return <div className={"p-4"}>Здесь будет политика конфиденциальности</div>;
};
