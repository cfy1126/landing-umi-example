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

// TODO 1. 用antd做一个响应式底部导航
// TODO 4. 加上全部场景时候得情况
