import React, { Component } from 'react';
import { Tabs, Card, Input } from 'antd';
import ProductList from '../components/ProductList';
// import { Feature00DataSource } from '../Home/data.source';

const { Search } = Input;

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile: false,
    };
  }
  render() {
    const { isMobile } = this.state;

    return (
      <Card
        title="分类名称"
        bordered={true}
        extra={<Search placeholder="input search text" enterButton="Search" size="large" />
        }
        style={{
          width: `92%`,
          margin: `0 auto`,
        }}
      >
        <Tabs items={[
          {
            label: `Tab 1`,
            key: '1',
            children: <ProductList
              level={2}
            />,
          },
          {
            label: `Tab 2`,
            key: '2',
            children: <ProductList
              level={2}
            />,
          },
          {
            label: `Tab 3`,
            key: '3',
            children: <ProductList
              level={2}
            />,
          },
        ]}
        tabBarExtraContent={{left: <strong>应用场景：</strong>}}
        tabBarGutter={40}
        tabBarStyle={{border:  'none'}}
        >
          {/* <SurveyComponent /> */}
        </Tabs>
      </Card>
    );
  }
}

export default Product;