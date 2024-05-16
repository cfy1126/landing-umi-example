import React, { useState, useEffect } from "react";
import { connect, useLocation,useIntl } from "umi";
import { Card, Input, Radio } from "antd";
import ProductList from "../components/ProductList";

const { Search } = Input;

const Product = ({ productCategory, dispatch }) => {
  const { formatMessage } = useIntl();
  const location = useLocation();
  let { id, vId } = location.query;
  
  const [activeScene, setActiveScene] = useState(vId);
  const [activeType, setActiveType] = useState("all");
  
  const { data: categories } = productCategory;
  const system = categories.find((item) => item.code === id) || {};
  const scenes = categories.filter((item) => item.parent_name === system.name);
  const singularScene = scenes.find((item) => item.code === activeScene) || {};
  const outputTypes = categories.filter(
    (item) => item.parent_name === singularScene.name
  );
  useEffect(() => {
    dispatch({ type: "productCategory/fetchData" });
  }, []);

  useEffect(() => {
    setActiveScene(vId);
  }, [vId]);
  return (
    <Card
      title={system.name}
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
        <strong>{formatMessage({ id: "page.product.scene" })}: </strong>
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
            <strong>{formatMessage({ id: "page.product.type" })}: </strong>
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
              <Radio.Button value="all">{formatMessage({ id: "page.product.all" })}</Radio.Button>
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
            id={id}
            vId={activeScene}
            tId={activeType}
            name={singularScene.name}
          />
        </div>
      </div>
    </Card>
  );
};

export default connect(({ productCategory }) => ({ productCategory }))(Product);
