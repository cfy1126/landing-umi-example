import React from 'react';
import QueueAnim from 'rc-queue-anim';
import { Row, Col } from 'antd';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import { getChildrenToRender } from './utils';

class ProductList extends React.PureComponent {
  render() {
    const { dataSource, isMobile, level, ...props } = this.props;
    const {
      wrapper,
      titleWrapper,
      page,
      OverPack: overPackData,
      childWrapper,
    } = dataSource;
    return (
      <div {...props} {...wrapper}>
        <div {...page}>
          {level !== 2 && <div {...titleWrapper}>
            {titleWrapper.children.map(getChildrenToRender)}
          </div>}
          <div class="list-title" style={{ display: 'flex', justifyContent: 'space-between', marginTop: 50 }}>
            <div data-v-c17bef0a="" class="left" style={{ fontSize: 20, paddingLeft: 15, borderLeft: "4px solid #ff8f33" }}>二级分类</div>
            {level !== 2 && <div data-v-c17bef0a="" class="right" style={{
              fontSize: 16,
              cursor: "pointer",
              color: "#fb930d"
            }}>查看更多</div>}
          </div>
          <OverPack {...overPackData}>
            <QueueAnim
              type="bottom"
              key="block"
              leaveReverse
              component={Row}
              componentProps={childWrapper}
            >
              {childWrapper.children.map((block, i) => {
                const { children: item, ...blockProps } = block;
                return (
                  <Col key={i.toString()} {...blockProps}>
                    <div {...item}>
                      {item.children.map(getChildrenToRender)}
                    </div>
                  </Col>
                );
              })}
            </QueueAnim>
          </OverPack>
        </div>
      </div>
    );
  }
}

export default ProductList;
