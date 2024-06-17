import React from "react";
import { Link, connect, setLocale, injectIntl, getLocale } from "umi";
import TweenOne from "rc-tween-one";
import { Menu, Select } from "antd";
// 取别名用 as 代替

const { Item, SubMenu } = Menu;

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneOpen: false,
    };
  }

  phoneClick = () => {
    const phoneOpen = !this.state.phoneOpen;
    this.setState({
      phoneOpen,
    });
  };

  componentDidMount() {
    // this.props.dispatch({ type: "productCategory/fetchData" });
    this.props.dispatch({
      type: "productCategory/changeLanguage",
      payload: getLocale(),
    });
  }

  render() {
    const { phoneOpen } = this.state;
    const {
      isMobile,
      productCategory,
      dispatch,
      menuSelectKey,
      intl,
    } = this.props;
    // 取别名
    const { data: categories } = productCategory || { data: [] };
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
            <Link to="/">
              <img width="100%" src={require("@/assets/logo.png")} alt="img" />
            </Link>
          </TweenOne>
          {/* {isMobile && (
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
          )} */}
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
              selectedKeys={[menuSelectKey]}
              onSelect={({ key }) => {
                if (key === "language") {
                  dispatch({
                    type: "menu/saveMenuSelectKey",
                    payload: "home",
                  });
                } else {
                  dispatch({
                    type: "menu/saveMenuSelectKey",
                    payload: key,
                  });
                }
              }}
            >
              <Item key="home">
                <Link to="/">
                  {intl.formatMessage({
                    id: "menu.home",
                  })}
                </Link>
              </Item>
              <SubMenu
                key="sub1"
                title={intl.formatMessage({
                  id: "menu.products.information",
                })}
              >
                {categories
                  .filter((item) => item.level === "1")
                  .map((item, index) => {
                    return (
                      <SubMenu
                        key={item.name}
                        title={
                          <Link to={`/product?id=${item.code}`}>
                            {item.name}
                          </Link>
                        }
                      >
                        {categories
                          .filter(
                            (child) =>
                              child.parent_code !== null &&
                              child.parent_code.split(",").includes(item.code)
                          )
                          .map((element) => {
                            return (
                              <Item key={`${item.code}-${element.code}`}>
                                <Link
                                  to={{
                                    pathname: "/product",
                                    query: {
                                      id: item.code,
                                      vId: element.code,
                                    },
                                  }}
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
              {/* <Item key="language">
                <Select
                  value={getLocale()}
                  style={{ width: 120 }}
                  onChange={(value) => {
                    setLocale(value, true);
                  }}
                >
                  <Option value="zh-CN">简体中文</Option>
                  <Option value="en-US">English</Option>
                </Select>
              </Item> */}
            </Menu>
          </TweenOne>
        </div>
      </TweenOne>
    );
  }
}

export default injectIntl(
  connect(({ productCategory, menu }) => ({
    productCategory,
    menuSelectKey: menu ? menu.menuSelectKey : undefined,
  }))(Header)
);
