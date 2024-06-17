import React, { useState, useEffect } from "react";
import { Affix, BackTop } from "antd";
import Header from "./Nav";
import useMobile from "@/hooks/useMobile";
// import Footer from "./Footer";

const Layout = ({ children }) => {
  const isMobile = useMobile();
  return (
    <>
      <Affix offsetTop={0}>
        <Header isMobile={isMobile} />
      </Affix>
      {children}
      {/* <Footer isMobile={isMobile} /> */}
      <BackTop type="primary" />
    </>
  );
};

export default Layout;


