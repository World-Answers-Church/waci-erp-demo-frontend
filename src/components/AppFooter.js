import React, { useContext } from "react";
import { LayoutContext } from "../context/layoutcontext";

const AppFooter = () => {
  const { layoutConfig } = useContext(LayoutContext);

  const logo =
    layoutConfig.colorScheme === "light"
      ? require("../assets/logos/purple_logo.png")
      : require("../assets/logos/white.png");

  return (
    <div className="layout-footer">
      <img src={logo} width="80px" height={"40px"} widt={"true"} alt="logo" />

      <span className="font-medium ml-2">
        World Answers Church International
      </span>
    </div>
  );
};

export default AppFooter;
