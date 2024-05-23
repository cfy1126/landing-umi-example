import React, { useState, useEffect } from "react";
import Header from "./Nav";
// import Footer from "./Footer";

const Layout = ({ children }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);
  useEffect(() => {
    const mediaQueryList = window.matchMedia('(max-width: 767px)');
    const listener = (event) => {
      setIsMobile(event.matches);
    };

    mediaQueryList.addListener(listener);

    return () => {
      mediaQueryList.removeListener(listener);
    };
  }, []);
  return (
    <>
      <Header isMobile={isMobile} />
      {children}
      {/* <Footer isMobile={isMobile} /> */}
    </>
  );
};

export default Layout;

// TODO 1. 用antd做一个响应式底部导航
// TODO 3. 多数据测试
// TODO 4. 加上全部场景时候得情况
