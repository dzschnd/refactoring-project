import { FC, ReactNode } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

type PageLayoutProps = {
  children: ReactNode;
  className?: string;
};

export const PageLayout: FC<PageLayoutProps> = ({ children, className }) => {
  return (
    <div className={"flex min-h-screen flex-col"}>
      <Header />
      <main
        className={`mt-[56px] flex flex-grow flex-col items-center justify-between px-4 sm:px-[15px] md:mt-[60px] md:px-[30px] ${className}`}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
};
