import React, { useState, useEffect } from "react";
import { Affix, BackTop, Layout as AntdLayout } from "antd";
import Header from "./Nav";
import useMobile from "@/hooks/useMobile";
const { Footer } = AntdLayout;
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
      {/* <Footer
        style={{
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        © 2024 Copyright - Hangzhou Livoltek Power Co., Ltd.
      </Footer> */}
      <BackTop type="primary" />
    </>
  );
};

export default Layout;
