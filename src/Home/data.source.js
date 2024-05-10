import React from 'react';
export const Nav30DataSource = {
  wrapper: { className: 'header3 home-page-wrapper' },
  page: { className: 'home-page' },
  logo: {
    className: 'header3-logo',
    children:
      'https://gw.alipayobjects.com/zos/basement_prod/b30cdc2a-d91c-4c78-be9c-7c63b308d4b3.svg',
  },
  Menu: {
    className: 'header3-menu',
    children: [
      {
        name: 'item0',
        className: 'header3-item',
        children: {
          href: '#',
          children: [{ children: '首页', name: 'text' }],
        },
      },
      {
        name: 'item1',
        className: 'header3-item',
        children: {
          href: '#',
          children: [{ children: '产品资料', name: 'text' }],
        },
        subItem: [
          {
            name: 'sub0',
            className: 'item-sub',
            children: {
              className: 'item-sub-item',
              children: [
                {
                  name: 'content',
                  className: 'item-content',
                  children: '系统一',
                },
              ],
            },
          },
          {
            name: 'sub1',
            className: 'item-sub',
            children: {
              className: 'item-sub-item',
              children: [
                {
                  name: 'content',
                  className: 'item-content',
                  children: '系统二',
                },
              ],
            },
          },
        ],
      }
    ],
  },
  mobileMenu: { className: 'header3-mobile-menu' },
};
export const Content130DataSource = {
  OverPack: {
    className: 'home-page-wrapper content13-wrapper',
    playScale: 0.3,
  },
  titleWrapper: {
    className: 'title-wrapper',
    children: [
      {
        name: 'image',
        children:
          'https://gw.alipayobjects.com/zos/rmsportal/PiqyziYmvbgAudYfhuBr.svg',
        className: 'title-image',
      },
      { name: 'title', children: '阳光电源资料平台', className: 'title-h1' },
      {
        name: 'content',
        children:
          '特色展台包括 Ant Design 、AntV、AntG、Egg 等明星产品，更有产品专家',
        className: 'title-content',
      },
      {
        name: 'content2',
        children: '现场问诊，为你答疑解难',
        className: 'title-content',
      },
    ],
  },
};
export const Feature00DataSource = {
  wrapper: { className: 'home-page-wrapper content0-wrapper' },
  page: { className: 'home-page content0' },
  OverPack: { playScale: 0.3, className: '' },
  titleWrapper: {
    className: 'title-wrapper',
    children: [{ name: 'title', children: '一级分类' }],
  },
  childWrapper: {
    className: 'content0-block-wrapper',
    children: [
      {
        name: 'block0',
        className: 'jzjn8afnsxb-editor_css content0-block',
        md: 6,
        xs: 24,
        children: {
          className: 'content0-block-item jzjgrrupf2c-editor_css',
          children: [
            {
              name: 'image',
              className: 'content0-block-icon jzjgrlz134-editor_css',
              children:
                'https://gw.alipayobjects.com/mdn/rms_ae7ad9/afts/img/A*CTp8T7RT-VkAAAAAAAAAAABkARQnAQ',
            },
            {
              name: 'title',
              className: 'content0-block-title jzj8xt5kgv7-editor_css',
              children: '一站式业务接入',
            },
            {
              name: 'content',
              children: '',
              className: 'jzj8z9sya9-editor_css',
            },
          ],
        },
      },
      {
        name: 'block1',
        className: 'content0-block',
        md: 6,
        xs: 24,
        children: {
          className: 'content0-block-item',
          children: [
            {
              name: 'image',
              className: 'content0-block-icon jzjncn210ql-editor_css',
              children:
                'https://gw.alipayobjects.com/mdn/rms_ae7ad9/afts/img/A*CTp8T7RT-VkAAAAAAAAAAABkARQnAQ',
            },
            {
              name: 'title',
              className: 'content0-block-title jzjne54fwqm-editor_css',
              children: '一站式事中风险监控',
            },
            {
              name: 'content',
              children: '',
            },
          ],
        },
      },
      {
        name: 'block2',
        className: 'content0-block',
        md: 6,
        xs: 24,
        children: {
          className: 'content0-block-item',
          children: [
            {
              name: 'image',
              className: 'content0-block-icon jzjndq0dueg-editor_css',
              children:
                'https://gw.alipayobjects.com/mdn/rms_ae7ad9/afts/img/A*CTp8T7RT-VkAAAAAAAAAAABkARQnAQ',
            },
            {
              name: 'title',
              className: 'content0-block-title jzjne24af8c-editor_css',
              children: '一站式数据运营',
            },
            {
              name: 'content',
              children: '',
            },
          ],
        },
      },
      {
        name: 'block~jzjn87bmyc7',
        className: 'content0-block',
        md: 6,
        xs: 24,
        children: {
          className: 'content0-block-item',
          children: [
            {
              name: 'image',
              className: 'content0-block-icon jzjndsyw8sf-editor_css',
              children:
                'https://gw.alipayobjects.com/mdn/rms_ae7ad9/afts/img/A*CTp8T7RT-VkAAAAAAAAAAABkARQnAQ',
            },
            {
              name: 'title',
              className: 'content0-block-title jzjndw5oerk-editor_css',
              children: '一站式数据运营',
            },
            {
              name: 'content',
              children: '',
            },
          ],
        },
      },
    ],
  },
};
export const Content50DataSource = {
  wrapper: { className: 'home-page-wrapper content5-wrapper' },
  page: { className: 'home-page content5' },
  OverPack: { playScale: 0.3, className: '' },
  titleWrapper: {
    className: 'title-wrapper',
    children: [
      { name: 'title', children: '客户案例', className: 'title-h1' },
      {
        name: 'content',
        className: 'title-content',
        children: '在这里用一段话介绍服务的案例情况',
      },
    ],
  },
  block: {
    className: 'content5-img-wrapper',
    gutter: 16,
    children: [
      {
        name: 'block0',
        className: 'block',
        md: 6,
        xs: 24,
        children: {
          wrapper: { className: 'content5-block-content' },
          img: {
            children:
              'https://t.alipayobjects.com/images/rmsweb/T11aVgXc4eXXXXXXXX.svg',
          },
          content: { children: 'Ant Design' },
        },
      },
      {
        name: 'block1',
        className: 'block',
        md: 6,
        xs: 24,
        children: {
          wrapper: { className: 'content5-block-content' },
          img: {
            children:
              'https://zos.alipayobjects.com/rmsportal/faKjZtrmIbwJvVR.svg',
          },
          content: { children: 'Ant Motion' },
        },
      },
      {
        name: 'block2',
        className: 'block',
        md: 6,
        xs: 24,
        children: {
          wrapper: { className: 'content5-block-content' },
          img: {
            children:
              'https://t.alipayobjects.com/images/rmsweb/T11aVgXc4eXXXXXXXX.svg',
          },
          content: { children: 'Ant Design' },
        },
      },
      {
        name: 'block3',
        className: 'block',
        md: 6,
        xs: 24,
        children: {
          wrapper: { className: 'content5-block-content' },
          img: {
            children:
              'https://zos.alipayobjects.com/rmsportal/faKjZtrmIbwJvVR.svg',
          },
          content: { children: 'Ant Motion' },
        },
      },
      {
        name: 'block4',
        className: 'block',
        md: 6,
        xs: 24,
        children: {
          wrapper: { className: 'content5-block-content' },
          img: {
            children:
              'https://t.alipayobjects.com/images/rmsweb/T11aVgXc4eXXXXXXXX.svg',
          },
          content: { children: 'Ant Design' },
        },
      },
      {
        name: 'block5',
        className: 'block',
        md: 6,
        xs: 24,
        children: {
          wrapper: { className: 'content5-block-content' },
          img: {
            children:
              'https://zos.alipayobjects.com/rmsportal/faKjZtrmIbwJvVR.svg',
          },
          content: { children: 'Ant Motion' },
        },
      },
      {
        name: 'block6',
        className: 'block',
        md: 6,
        xs: 24,
        children: {
          wrapper: { className: 'content5-block-content' },
          img: {
            children:
              'https://t.alipayobjects.com/images/rmsweb/T11aVgXc4eXXXXXXXX.svg',
          },
          content: { children: 'Ant Design' },
        },
      },
      {
        name: 'block7',
        className: 'block',
        md: 6,
        xs: 24,
        children: {
          wrapper: { className: 'content5-block-content' },
          img: {
            children:
              'https://zos.alipayobjects.com/rmsportal/faKjZtrmIbwJvVR.svg',
          },
          content: { children: 'Ant Motion' },
        },
      },
    ],
  },
};
export const Footer10DataSource = {
  wrapper: { className: 'home-page-wrapper footer1-wrapper' },
  OverPack: { className: 'footer1', playScale: 0.2 },
  block: {
    className: 'home-page',
    gutter: 0,
    children: [
      {
        name: 'block0',
        xs: 24,
        md: 8,
        className: 'block',
        title: {
          className: 'logo jzl0qcpyjra-editor_css',
          children:
            'https://gw.alipayobjects.com/mdn/rms_ae7ad9/afts/img/A*GzZ-QqkpH4AAAAAAAAAAAABkARQnAQ',
        },
        childWrapper: {
          className: 'slogan',
          children: [
            { name: 'content0', children: <p>蚂蚁金服计算机视觉平台</p> },
          ],
        },
      },
      {
        name: 'block2',
        xs: 24,
        md: 8,
        className: 'block',
        title: { children: <p>联系我们</p> },
        childWrapper: {
          children: [
            {
              name: 'image~jzl0tcm4f1d',
              className: '',
              children:
                'https://gw.alipayobjects.com/mdn/rms_ae7ad9/afts/img/A*NoENTI5uyn4AAAAAAAAAAABkARQnAQ',
            },
            {
              href: '#',
              name: 'link0',
              children: <p>图鹰对接答疑钉钉群</p>,
              className: 'jzl0u1bko6-editor_css',
            },
            { href: '#', name: 'link1', children: '联系我们' },
          ],
        },
      },
      {
        name: 'block3',
        xs: 24,
        md: 8,
        className: 'block',
        title: { children: '资源' },
        childWrapper: {
          children: [
            { href: '#', name: 'link0', children: 'Ant Design' },
            { href: '#', name: 'link1', children: 'Ant Motion' },
          ],
        },
      },
    ],
  },
  copyrightWrapper: { className: 'copyright-wrapper' },
  copyrightPage: { className: 'home-page' },
  copyright: {
    className: 'copyright',
    children: (
      <span>
        <a href="http://abc.alipay.com">隐私权政策</a>&nbsp; &nbsp; &nbsp;
        |&nbsp; &nbsp; &nbsp; <a href="http://abc.alipay.com">权益保障承诺书</a>&nbsp;
        &nbsp; &nbsp;&nbsp;ICP证:浙B2-20100257&nbsp; &nbsp;
        &nbsp;&nbsp;Copyright © 2019 蚂蚁金融服务集团<br />
      </span>
    ),
  },
};
