import Wallet from "../../Wallet/Wallet";
import React, { useState } from "react";
import { NavItemProps } from "../../../interfaces/app.interfaces";
import RouteItemComponent from "../../ToolebarRouteItem/ToolbarRouteItem";

const Header: React.FC = () => {

  const [routes] = useState<NavItemProps[]>([
    {
      text: "Create",
      path: "/create/owner",
    },
    {
      text: "Market Place",
      path: "/market-place",
    },
    {
      text: "Dashboard",
      path: "/dashboard",
    },
  ]);

  return (
    <nav className="bg-black h-14 flex items-center">
      <div className="container w-full mx-auto px-6">
        <div className="flex items-center justify-between flex-wrap">
          <div className="flex items-center flex-shrink-0 text-white mr-6">
            <span className="font-semibold text-xl text-4xl text-blue-500">
              Linkd
            </span>
          </div>
          <div className="flex">
            {routes.map((route) => (
              <RouteItemComponent key={route.text} {...route} />
            ))}
          </div>
          <Wallet />

        </div>
      </div>
    </nav>
  );
};

export {
  Header
};
