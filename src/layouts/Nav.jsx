import React from "react";
import { Link, connect } from "umi";
import TweenOne from "rc-tween-one";
import { Menu, Select } from "antd";

const { Item, SubMenu } = Menu;

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneOpen: false,
      // selectKey: "home",
    };
  }

  phoneClick = () => {
    const phoneOpen = !this.state.phoneOpen;
    this.setState({
      phoneOpen,
    });
  };

  componentDidMount() {
    this.props.dispatch({ type: "productCategory/fetchData" });
  }

  render() {
    const { phoneOpen, selectKey } = this.state;
    const { isMobile, productCategory } = this.props;
    const { data: categories } = productCategory;
    const moment = phoneOpen === undefined ? 300 : null;
    return (
      <TweenOne
        component="header"
        animation={{ opacity: 0, type: "from" }}
        className="header3 home-page-wrapper"
      >
        <div className={`home-page${phoneOpen ? " open" : ""}`}>
          <TweenOne
            animation={{ x: -30, type: "from", ease: "easeOutQuad" }}
            className="header3-logo"
          >
            <img
              width="100%"
              src="https://gw.alipayobjects.com/zos/basement_prod/b30cdc2a-d91c-4c78-be9c-7c63b308d4b3.svg"
              alt="img"
            />
          </TweenOne>
          {isMobile && (
            <div
              className="header3-mobile-menu"
              onClick={() => {
                this.phoneClick();
              }}
            >
              <em />
              <em />
              <em />
            </div>
          )}
          <TweenOne
            className="header3-menu"
            animation={
              isMobile
                ? {
                    x: 0,
                    height: 0,
                    duration: 300,
                    onComplete: (e) => {
                      if (this.state.phoneOpen) {
                        e.target.style.height = "auto";
                      }
                    },
                    ease: "easeInOutQuad",
                  }
                : null
            }
            moment={moment}
            reverse={!!phoneOpen}
          >
            <Menu
              mode={isMobile ? "inline" : "horizontal"}
              theme="light"
              // selectedKeys={[selectKey]}
              // onSelect={({ key }) => {
              //   if (key === "language") {
              //     this.setState({ selectKey: "home" });
              //   } else {
              //     this.setState({ selectKey: key });
              //   }
              // }}
            >
              <Item key="home">
                <Link to="/">首页</Link>
              </Item>
              <SubMenu key="sub1" title="产品资料">
                {categories
                  .filter((item) => item.level === "1")
                  .map((item, index) => {
                    return (
                      <SubMenu key={`sub1-${index}`} title={item.name}>
                        {categories
                          .filter((child) => child.parent_name === item.name)
                          .map((element, childIndex) => {
                            return (
                              <Item key={`sub1-${index}-${childIndex}`}>
                                <Link
                                  to={`/product?id=${item.code}&vId=${element.code}`}
                                >
                                  {element.name}
                                </Link>
                              </Item>
                            );
                          })}
                      </SubMenu>
                    );
                  })}
              </SubMenu>
              <Item key="language">
                <Select defaultValue="zh" style={{ width: 120 }}>
                  <Option value="en">English</Option>
                  <Option value="zh">中文</Option>
                </Select>
              </Item>
            </Menu>
          </TweenOne>
        </div>
      </TweenOne>
    );
  }
}

export default connect(({ productCategory }) => ({ productCategory }))(Header);

// TODO 1. 其它页面路由时菜单选中问题(查看更多)
