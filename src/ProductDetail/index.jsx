import React, { Component } from 'react';
import { Tabs, Card, Input, Breadcrumb, Typography, Select, Space, List, Skeleton, Avatar } from 'antd';
import ProductList from '../Home/ProductList';

const { Title, Text } = Typography;
const list =
  [
    {
      "gender": "male",
      "name": {
        "title": "Monsieur",
        "first": "Rosario",
        "last": "Hubert"
      },
      "email": "rosario.hubert@example.com",
      "picture": {
        "large": "https://randomuser.me/api/portraits/men/84.jpg",
        "medium": "https://randomuser.me/api/portraits/med/men/84.jpg",
        "thumbnail": "https://randomuser.me/api/portraits/thumb/men/84.jpg"
      },
      "nat": "CH"
    },
    {
      "gender": "female",
      "name": {
        "title": "Ms",
        "first": "Amelie",
        "last": "Soltvedt"
      },
      "email": "amelie.soltvedt@example.com",
      "picture": {
        "large": "https://randomuser.me/api/portraits/women/36.jpg",
        "medium": "https://randomuser.me/api/portraits/med/women/36.jpg",
        "thumbnail": "https://randomuser.me/api/portraits/thumb/women/36.jpg"
      },
      "nat": "NO"
    },
    {
      "gender": "female",
      "name": {
        "title": "Ms",
        "first": "Ruža",
        "last": "Rašić"
      },
      "email": "ruza.rasic@example.com",
      "picture": {
        "large": "https://randomuser.me/api/portraits/women/8.jpg",
        "medium": "https://randomuser.me/api/portraits/med/women/8.jpg",
        "thumbnail": "https://randomuser.me/api/portraits/thumb/women/8.jpg"
      },
      "nat": "RS"
    }
  ];

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
        title={<Breadcrumb separator=">">
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item href="">Application Center</Breadcrumb.Item>
          <Breadcrumb.Item href="">Application List</Breadcrumb.Item>
          <Breadcrumb.Item>An Application</Breadcrumb.Item>
        </Breadcrumb>}
        bordered={true}
        style={{
          width: `92%`,
          margin: `0 auto`,
        }}
      >
        <Title level={2}>产品型号</Title>
        <div className="select-group" style={{ textAlign: `right` }}>
          <Space>
            <Select
              defaultValue="lucy"
              style={{ width: 120 }}
              // onChange={handleChange}
              options={[
                {
                  value: 'jack',
                  label: 'Jack',
                },
                {
                  value: 'lucy',
                  label: 'Lucy',
                }
              ]}
            />
            <Select
              defaultValue="lucy"
              style={{ width: 120 }}
              // onChange={handleChange}
              options={[
                {
                  value: 'jack',
                  label: 'Jack',
                },
                {
                  value: 'lucy',
                  label: 'Lucy',
                }
              ]}
            />
          </Space>
        </div>
        <div className="card-group" style={{ marginTop: 24 }}>
          <Card type="inner" title="产品文档类型">
            <List
              className="demo-loadmore-list"
              itemLayout="horizontal"
              dataSource={list}
              renderItem={(item) => (
                <List.Item
                  actions={[<a key="list-loadmore-edit">下载</a>]}
                >
                  <Skeleton avatar title={false} loading={item.loading} active>
                    <List.Item.Meta
                      title={<a href="https://ant.design">产品文件名称</a>}
                      description={<Space>
                        <Text strong>资料类型：</Text>
                        <Text>法规符合性声明</Text>
                        <Text>|</Text>
                        <Text strong>语言：</Text>
                        <Text>English</Text>
                        <Text>|</Text>
                        <Text strong>文件大小：</Text>
                        <Text>0.40MB</Text>
                        <Text>|</Text>
                        <Text strong>版本：</Text>
                        <Text>Ver11</Text>
                        <Text>|</Text>
                        <Text strong>更新时间：</Text>
                        <Text>2023/08/21</Text>
                      </Space>}
                    />
                  </Skeleton>
                </List.Item>
              )}
            />
          </Card>
          <Card
            style={{
              marginTop: 16,
            }}
            type="inner"
            title="产品文档类型"
          >
            <List
              className="demo-loadmore-list"
              itemLayout="horizontal"
              dataSource={list}
              renderItem={(item) => (
                <List.Item
                  actions={[<a key="list-loadmore-edit">下载</a>]}
                >
                  <Skeleton avatar title={false} loading={item.loading} active>
                    <List.Item.Meta
                      title={<a href="https://ant.design">产品文件名称</a>}
                      description={<Space>
                        <Text strong>资料类型：</Text>
                        <Text>法规符合性声明</Text>
                        <Text>|</Text>
                        <Text strong>语言：</Text>
                        <Text>English</Text>
                        <Text>|</Text>
                        <Text strong>文件大小：</Text>
                        <Text>0.40MB</Text>
                        <Text>|</Text>
                        <Text strong>版本：</Text>
                        <Text>Ver11</Text>
                        <Text>|</Text>
                        <Text strong>更新时间：</Text>
                        <Text>2023/08/21</Text>
                      </Space>}
                    />
                  </Skeleton>
                </List.Item>
              )}
            />
          </Card>
        </div>
      </Card>
    );
  }
}

export default Product;