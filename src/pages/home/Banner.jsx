import React from "react";
import { useIntl } from "umi";
import useMobile from "@/hooks/useMobile";
import OverPack from "rc-scroll-anim/lib/ScrollOverPack";
import QueueAnim from "rc-queue-anim";

const Banner = () => {
  const { formatMessage } = useIntl();
  const isMobile = useMobile();
  return (
    <OverPack
      className="home-page-wrapper content13-wrapper"
      playScale={0.3}
      style={{
        backgroundSize: "cover",
      }}
    >
      <QueueAnim
        type="bottom"
        leaveReverse
        key="page"
        delay={[0, 100]}
        className="title-wrapper"
      >
        {/* <img
          src="https://gw.alipayobjects.com/zos/rmsportal/PiqyziYmvbgAudYfhuBr.svg"
          alt=""
          className="title-image"
        /> */}
        <h1 className="title-h1 home-banner-title">
          {formatMessage({ id: "page.home.title" })}
        </h1>
        {!isMobile && (
          <div className="title-content">
            {/* 特色展台包括 Ant Design 、AntV、AntG、Egg 等明星产品，更有产品专家 */}
            <a href="#RESIDENTIAL">
              <img
                src={require("../../assets/residentisl.png")}
                alt=""
                style={{ marginRight: "11.25vw" }}
              />
            </a>
            <a href="#COMMERCIAL & INDUSTRY">
              <img
                src={require("../../assets/commercial & industry.png")}
                alt=""
              />
            </a>
          </div>
        )}
      </QueueAnim>
    </OverPack>
  );
};

export default Banner;
