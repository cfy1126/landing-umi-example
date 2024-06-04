import React from "react";
import TweenOne from "rc-tween-one";
import OverPack from "rc-scroll-anim/lib/ScrollOverPack";
import QueueAnim from "rc-queue-anim";
import { Row, Col } from "antd";
import { getChildrenToRender } from "../utils/utils";
import { isImg } from "../utils/utils";

const FooterDataSource = {
  wrapper: { className: "home-page-wrapper footer1-wrapper" },
  OverPack: { className: "footer1", playScale: 0.2 },
  block: {
    className: "home-page",
    gutter: 0,
    children: [
      {
        name: "block0",
        xs: 24,
        md: 8,
        className: "block",
        title: {
          className: "logo jzl0qcpyjra-editor_css",
          children:
            "https://gw.alipayobjects.com/mdn/rms_ae7ad9/afts/img/A*GzZ-QqkpH4AAAAAAAAAAAABkARQnAQ",
        },
        childWrapper: {
          className: "slogan",
          children: [
            { name: "content0", children: <p>蚂蚁金服计算机视觉平台</p> },
          ],
        },
      },
      {
        name: "block2",
        xs: 24,
        md: 8,
        className: "block",
        title: { children: <p>联系我们</p> },
        childWrapper: {
          children: [
            {
              name: "image~jzl0tcm4f1d",
              className: "",
              children:
                "https://gw.alipayobjects.com/mdn/rms_ae7ad9/afts/img/A*NoENTI5uyn4AAAAAAAAAAABkARQnAQ",
            },
            {
              href: "#",
              name: "link0",
              children: <p>图鹰对接答疑钉钉群</p>,
              className: "jzl0u1bko6-editor_css",
            },
            { href: "#", name: "link1", children: "联系我们" },
          ],
        },
      },
      {
        name: "block3",
        xs: 24,
        md: 8,
        className: "block",
        title: { children: "资源" },
        childWrapper: {
          children: [
            { href: "#", name: "link0", children: "Ant Design" },
            { href: "#", name: "link1", children: "Ant Motion" },
          ],
        },
      },
    ],
  },
  copyrightWrapper: { className: "copyright-wrapper" },
  copyrightPage: { className: "home-page" },
  copyright: {
    className: "copyright",
    children: (
      <span>
        <a href="http://abc.alipay.com">隐私权政策</a>
        &nbsp; &nbsp; &nbsp; |&nbsp; &nbsp; &nbsp;
        <a href="http://abc.alipay.com">权益保障承诺书</a>
        &nbsp; &nbsp; &nbsp;&nbsp;ICP证:浙B2-20100257&nbsp; &nbsp;
        &nbsp;&nbsp;Copyright © 2019 蚂蚁金融服务集团
        <br />
      </span>
    ),
  },
};
class Footer extends React.Component {
  static defaultProps = {
    className: "footer1",
  };

  getLiChildren = (data) =>
    data.map((item, i) => {
      const { title, childWrapper, ...itemProps } = item;
      return (
        <Col key={i.toString()} {...itemProps} title={null} content={null}>
          <h2 {...title}>
            {typeof title.children === "string" &&
            title.children.match(isImg) ? (
              <img src={title.children} width="100%" alt="img" />
            ) : (
              title.children
            )}
          </h2>
          <div {...childWrapper}>
            {childWrapper.children.map(getChildrenToRender)}
          </div>
        </Col>
      );
    });

  render() {
    const childrenToRender = this.getLiChildren(
      FooterDataSource.block.children
    );
    return (
      <div {...FooterDataSource.wrapper}>
        <OverPack {...FooterDataSource.OverPack}>
          <QueueAnim
            type="bottom"
            key="ul"
            leaveReverse
            component={Row}
            {...FooterDataSource.block}
          >
            {childrenToRender}
          </QueueAnim>
          <TweenOne
            animation={{ y: "+=30", opacity: 0, type: "from" }}
            key="copyright"
            {...FooterDataSource.copyrightWrapper}
          >
            <div {...FooterDataSource.copyrightPage}>
              <div {...FooterDataSource.copyright}>
                {FooterDataSource.copyright.children}
              </div>
            </div>
          </TweenOne>
        </OverPack>
      </div>
    );
  }
}

export default Footer;
