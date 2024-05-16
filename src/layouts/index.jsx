import React, { useState, useEffect } from "react";
import { enquireScreen } from "enquire-js";
import Header from "./Nav";
// import Footer from "./Footer";

const Layout = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScreenChange = (isScreenMobile) => {
      setIsMobile(isScreenMobile);
    };

    // 屏幕尺寸监听器
    const screenListener = enquireScreen((b) => {
      handleScreenChange(!!b);
    });

    return () => {
      screenListener.unregister();
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
// TODO 2. 国际化
// TODO 3. 多数据测试
// TODO 4. 加上全部场景时候得情况
