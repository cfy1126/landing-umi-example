import React from 'react';
import TweenOne from 'rc-tween-one';
import { Menu } from 'antd';
// import NavLink from 'umi';
import { getChildrenToRender } from '../utils/utils';

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

  render() {
    const { dataSource, isMobile } = this.props;
    const { phoneOpen } = this.state;
    const navChildren = dataSource.Menu.children.map((item) => {
      const { children: a, subItem } = item;
      if (subItem) {
        return (
          <SubMenu
            key={item.name}
            title={
              <div
                className={`header3-item-block`}
              >
                {a.children[0].children}
              </div>
            }
            popupClassName="header3-item-child"
          >
            {subItem.map(($item, ii) => {
              const { children: childItem } = $item;
              const child =
                <div className='item-sub-item'>
                  {childItem.children.map(getChildrenToRender)}
                </div>
              return (
                <Item key={$item.name || ii.toString()} {...$item}>
                  {child}
                </Item>
              );
            })}
          </SubMenu>
        );
      }
      return (
        <Item key={item.name}>
          <a {...a} className={`header3-item-block`}>
            {a.children[0].children}
          </a>
        </Item>
      );
    });
    const moment = phoneOpen === undefined ? 300 : null;
    return (
      <TweenOne
        component="header"
        animation={{ opacity: 0, type: 'from' }}
        className='header3 home-page-wrapper'
      >
        <div
          className={`home-page${phoneOpen ? ' open' : ''}`}
        >
          <TweenOne
            animation={{ x: -30, type: 'from', ease: 'easeOutQuad' }}
            className='header3-logo'
          >
            <img width="100%" src='https://gw.alipayobjects.com/zos/basement_prod/b30cdc2a-d91c-4c78-be9c-7c63b308d4b3.svg' alt="img" />
          </TweenOne>
          {isMobile && (
            <div
              {...dataSource.mobileMenu}
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
            className='header3-menu'
            animation={
              isMobile
                ? {
                  x: 0,
                  height: 0,
                  duration: 300,
                  onComplete: (e) => {
                    if (this.state.phoneOpen) {
                      e.target.style.height = 'auto';
                    }
                  },
                  ease: 'easeInOutQuad',
                }
                : null
            }
            moment={moment}
            reverse={!!phoneOpen}
          >
            <Menu
              mode={isMobile ? 'inline' : 'horizontal'}
              defaultSelectedKeys={['item0']}
              theme="light"
            >
              {navChildren}
            </Menu>
          </TweenOne>
        </div>
      </TweenOne>
    );
  }
}

export default Header;
