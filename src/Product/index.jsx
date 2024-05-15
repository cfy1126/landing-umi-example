import React, { useState, useEffect, useMemo } from "react";
import { connect, useLocation } from "umi";
import { Tabs, Card, Input, Radio } from "antd";
import ProductList from "../components/ProductList";

const { Search } = Input;

const Product = ({ productCategory, dispatch }) => {
  const location = useLocation();
  let { id, vId } = location.query;

  const { data } = productCategory;
  const [activeScene, setActiveScene] = useState(vId);
  const [activeType, setActiveType] = useState("all");
  const system = data.find((item) => item.code === id);
  const scenes = data.filter((item) => item.parent_name === system.name);
  const singularScene = scenes.find((item) => item.code === activeScene) || {};
  const outputTypes = data.filter(
    (item) => item.parent_name === singularScene.name
  );
  useEffect(() => {
    // 组件挂载时触发异步请求
    dispatch({ type: "productCategory/fetchData" });
  }, []);

  useEffect(() => {
    setActiveScene(vId);
  }, [vId]);
  return (
    <Card
      title={system && system.name}
      bordered={true}
      extra={
        <Search
          placeholder="input search text"
          enterButton="Search"
          size="smaill"
        />
      }
      style={{
        width: `92%`,
        margin: `0 auto`,
      }}
    >
      <div className="filter-container">
        <strong>应用场景：</strong>
        <Radio.Group
          value={activeScene}
          onChange={(e) => {
            setActiveScene(e.target.value);
          }}
          style={{
            marginTop: 16,
          }}
        >
          {/* <Radio.Button value="all">全部</Radio.Button> */}
          {scenes.map((item) => (
            <Radio.Button key={item.code} value={item.code}>
              {item.name}
            </Radio.Button>
          ))}
        </Radio.Group>
        <br />
        {outputTypes.length > 0 && (
          <div>
            <strong>输出类型：</strong>
            <Radio.Group
              value={activeType}
              onChange={(e) => {
                if (e.target.value === "all") {
                  setActiveType("");
                } else {
                  setActiveType(e.target.value);
                }
              }}
              style={{
                marginTop: 16,
              }}
            >
              <Radio.Button value="all">全部</Radio.Button>
              {outputTypes.map((item) => (
                <Radio.Button key={item.code} value={item.code}>
                  {item.name}
                </Radio.Button>
              ))}
            </Radio.Group>
          </div>
        )}
      </div>
      <div className="home-page-wrapper content0-wrapper">
        <div className="home-page content0">
          <ProductList
            level={2}
            id={id}
            vId={activeScene}
            name={singularScene.name}
            tId={activeType}
          />
        </div>
      </div>
    </Card>
  );
};

export default connect(({ productCategory }) => ({ productCategory }))(Product);
