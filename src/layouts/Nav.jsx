import React from "react";
import { Link, connect, setLocale, injectIntl, getLocale } from "umi";
import TweenOne from "rc-tween-one";
import { Menu, Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
// 取别名用 as 代替

const items = [
  {
    key: "1",
    label: (
      <div
        onClick={(e) => {
          setLocale("zh-CN", true);
        }}
      >
        zh-CN
      </div>
    ),
  },
  {
    key: "2",
    label: (
      <div
        onClick={(e) => {
          setLocale("en-US", true);
        }}
      >
        en-US
      </div>
    ),
  },
];

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
        <div className="header-top">
          <div className="header-top-content">
            <Dropdown menu={{ items }}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="header-top-icon"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
                    />
                  </svg>
                  {getLocale()}
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </div>
        </div>
        <div className={`home-page${phoneOpen ? " open" : ""}`}>
          <TweenOne
            animation={{ x: -30, type: "from", ease: "easeOutQuad" }}
            className="header3-logo"
          >
            <Link to="/">
              <img width="100%" src={require("@/assets/logo.png")} alt="img" />
            </Link>
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
