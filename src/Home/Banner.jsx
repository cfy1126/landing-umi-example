import React from "react";
import OverPack from "rc-scroll-anim/lib/ScrollOverPack";
import QueueAnim from "rc-queue-anim";

const Banner = () => {
  return (
    <OverPack className="home-page-wrapper content13-wrapper" playScale={0.3}>
      <QueueAnim
        type="bottom"
        leaveReverse
        key="page"
        delay={[0, 100]}
        className="title-wrapper"
      >
        <img
          src="https://gw.alipayobjects.com/zos/rmsportal/PiqyziYmvbgAudYfhuBr.svg"
          alt=""
          className="title-image"
        />
        <h1 className="title-h1">阳光电源资料平台</h1>
        <div className="title-content">
          特色展台包括 Ant Design 、AntV、AntG、Egg 等明星产品，更有产品专家
        </div>
      </QueueAnim>
    </OverPack>
  );
};

export default Banner;
