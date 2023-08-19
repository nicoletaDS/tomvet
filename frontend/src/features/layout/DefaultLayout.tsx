import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const DefaultLayout: React.FC<Props> = ({ children }) => {
  return <div>{children}</div>;
};

export default DefaultLayout;
