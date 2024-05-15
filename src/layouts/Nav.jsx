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
      productCategories: [],
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
    const { isMobile, productCategory } = this.props;
    const { data } = productCategory;
    const { phoneOpen } = this.state;
    const moment = phoneOpen === undefined ? 300 : null;
    const menuDataOne = data.filter((item) => item.level === "1");
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
              defaultSelectedKeys={["item0"]}
              theme="light"
            >
              <Item key="sub">
                <Link to="/">首页</Link>
              </Item>
              <SubMenu key="sub1" title="产品资料">
                {menuDataOne.map((item, index) => {
                  return (
                    <SubMenu key={`sub1-${index}`} title={item.name}>
                      {data
                        .filter((child) => child.parent_name === item.name)
                        .map((child, childIndex) => {
                          return (
                            <Item key={`sub1-${index}-${childIndex}`}>
                              <Link
                                to={`/product?id=${item.code}&vId=${child.code}`}
                              >
                                {child.name}
                              </Link>
                            </Item>
                          );
                        })}
                    </SubMenu>
                  );
                })}
              </SubMenu>
              <Item key="language" style={{ float: "right" }}>
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
