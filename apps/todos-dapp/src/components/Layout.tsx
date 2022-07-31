import React, {Fragment, ReactNode} from "react";
import Header from "./Header";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = ({children}) => (
  <div className={`
        h-100vh
        bg-gray-50
  `}>
    <Header />
    <main>
        {children}
    </main>
  </div>
);

export default Layout;
