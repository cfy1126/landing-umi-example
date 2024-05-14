import React, { useState, useEffect, useMemo } from 'react';
import { connect, useLocation } from 'umi';
import { Tabs, Card, Input, Radio } from 'antd';
import ProductList from '../components/ProductList';

const { Search } = Input;

const Product = ({ productCategory, dispatch }) => {
  const location = useLocation();
  const { id, vId } = location.query;

  const { data } = productCategory;
  const [activeType, setActiveType] = useState(vId);
  const system = data.find((item) => item.code === id);
  const scenes = data.filter((item) => item.parent_name === system.name);
  const singularScene = scenes.find((item) => item.code === activeType) || {};
  const outputTypes = singularScene.hasOwnProperty('name')  && data.filter((item) => item.parent_name === singularScene.name);
  useEffect(() => {
    // 组件挂载时触发异步请求
    dispatch({ type: 'productCategory/fetchData' });
  }, []);
  
  useEffect(() => {
    setActiveType(vId);
  }, [vId]);
  return (
    <Card
      title={system && system.name}
      bordered={true}
      extra={
        <Search placeholder="input search text" enterButton="Search" size="smaill" />
      }
      style={{
        width: `92%`,
        margin: `0 auto`,
      }}
    >
      <div className="filter-container">
        <strong>应用场景：</strong>
        <Radio.Group
          value={activeType}
          onChange={(e) => { setActiveType(e.target.value); console.log(activeType); }}
          style={{
            marginTop: 16,
          }}
        >
          {/* <Radio.Button value="all">全部</Radio.Button> */}
          {
            scenes.map((item) => <Radio.Button key={item.code} value={item.code}>{item.name}</Radio.Button>)
          }
        </Radio.Group>
        <br />
        {
          outputTypes.length>0 &&
          <div>
            <strong>输出类型：</strong>
            <Radio.Group
              defaultValue="all"
              style={{
                marginTop: 16,
              }}
            >
              <Radio.Button value="all">全部</Radio.Button>
              {
                outputTypes.map((item) => <Radio.Button key={item.code} value={item.code}>{item.name}</Radio.Button>)
              }
            </Radio.Group>
          </div>
        }
      </div>
    </Card>
  );
};

export default connect(({ productCategory }) => ({ productCategory }))(Product);