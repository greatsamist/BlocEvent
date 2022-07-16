import { Footer, Header } from "@components";
import { FC, Fragment, ReactNode } from "react";

export const Layout: FC<LayoutProps> = (props: LayoutProps) => {
  const { children } = props;

  return (
    <Fragment>
      <Header />
      {children}
      <Footer />
    </Fragment>
  );
};

interface LayoutProps {
  children: ReactNode;
}
