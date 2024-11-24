/** @format */

import React from "react";
import { useDevice } from "../../context/DeviceContext";

import MobileHeader from "./MobileHeader";
import DesktopHeader from "./DesktopHeader";

const Header: React.FC = () => {
  const { isMobile } = useDevice();

  return <>{isMobile ? <MobileHeader /> : <DesktopHeader />}</>;
};

export default Header;
