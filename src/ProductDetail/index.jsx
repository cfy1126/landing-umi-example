import React, { useEffect } from 'react';
import { connect, useLocation } from 'umi';
import { Card, Breadcrumb, Typography, Select, Space, List, Skeleton } from 'antd';

const { Title, Text } = Typography;

function ProductDetail({ systemDict, productInfo, productCategory, productAttach, dispatch }) {
  const location = useLocation();
  let { id, vId, pId } = location.query;
  const { data: categories } = productCategory;
  const { data: products } = productInfo;
  const { data: attachs } = productAttach;
  const { data: types } = systemDict;

  const currentAttachs = attachs.filter(item => item.product_code === pId);
  const groupedData = currentAttachs.reduce((acc, curr) => {
    const category = curr.attach_category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(curr);
    return acc;
  }, {});
  const singularSys = categories.find(item => item.code === id) || {};
  const singularProduct = products.find(item => item.code === pId) || {};
  useEffect(() => {
    dispatch({ type: 'productCategory/fetchData' });
    dispatch({ type: 'productInfo/fetchData' });
    dispatch({ type: 'productAttach/fetchData' });
    dispatch({ type: 'systemDict/fetchData' });
  }, [])
  const handleAttachType = (id)=>{
    let data = types.find(item=>item.code === id && item.type === '2');
    return data.name;
  }
  const renderAttach = () => {
    let arr = [];
    for (let i in groupedData) {
      let singularType = types.find(item => item.code === i);
      let category = singularType.hasOwnProperty('name') && singularType.name;
      if(groupedData && groupedData[i].length>0){
      arr.push(<Card type="inner" title={category}>
        <List
          className="demo-loadmore-list"
          itemLayout="horizontal"
          dataSource={groupedData[i]}
          renderItem={(item) => (
              <List.Item
                actions={[<a key="list-loadmore-edit" href={item.attach_url}>下载</a>]}
              >
                <Skeleton avatar title={false} loading={item.loading} active>
                  <List.Item.Meta
                    title={<div>{item.attach_name}</div>}
                    description={<Space>
                      <Text strong>资料类型：</Text>
                      <Text>{handleAttachType(item.attach_type)}</Text>
                      <Text>|</Text>
                      <Text strong>语言：</Text>
                      <Text>{item.attach_language}</Text>
                      <Text>|</Text>
                      <Text strong>文件大小：</Text>
                      <Text>{item.attach_size}</Text>
                      <Text>|</Text>
                      <Text strong>版本：</Text>
                      <Text>{item.attach_version}</Text>
                      <Text>|</Text>
                      <Text strong>更新时间：</Text>
                      <Text>{item.update_time}</Text>
                    </Space>}
                  />
                </Skeleton>
              </List.Item>            
          )
          }
        />
      </Card>)
      }
    }
    return arr;
  }
  return (
    <Card
      title={<Breadcrumb separator=">">
        <Breadcrumb.Item>产品资料</Breadcrumb.Item>
        <Breadcrumb.Item href="">{singularSys.name}</Breadcrumb.Item>
        <Breadcrumb.Item href="">{singularProduct.name}</Breadcrumb.Item>
      </Breadcrumb>}
      bordered={true}
      style={{
        width: `92%`,
        margin: `0 auto`,
      }}
    >
      <Title level={2}>{singularProduct.name}</Title>
      <div className="select-group" style={{ textAlign: `right` }}>
        <Space>
          <Select
            placeholder='请选择资料类型'
            style={{ width: 160 }}
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
            placeholder='请选择语言'
            style={{ width: 120 }}
            // onChange={handleChange}
            options={[
              {
                value: 'zh',
                label: '简体中文',
              },
              {
                value: 'en',
                label: 'English',
              }
            ]}
          />
        </Space>
      </div>
      <div className="card-group" style={{ marginTop: 24,display: 'flex', flexDirection: 'column', gap: 24 }}>
        {
          renderAttach()
        }
      </div>
    </Card>
  );
}

export default connect(({ systemDict, productInfo, productCategory, productAttach }) => ({ systemDict, productInfo, productCategory, productAttach }))(ProductDetail);
