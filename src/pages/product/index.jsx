import React, { useState, useEffect, useMemo } from "react";
import { connect, useLocation, useIntl } from "umi";
import { Card, Input, Radio } from "antd";
import ProductList from "../../components/ProductList";
import styles from "./index.less";

const { Search } = Input;

const Product = ({ productCategory, dispatch }) => {
  const { formatMessage } = useIntl();
  const location = useLocation();
  let { id, vId } = location.query;

  const [activeScene, setActiveScene] = useState(vId);
  // const [activeType, setActiveType] = useState("all");

  const { data: categories } = productCategory || { data: [] };
  const system =
    useMemo(() => categories.find((item) => item.code === id), [
      id,
      categories,
    ]) || {};
  const scenes = categories.filter(
    (item) =>
      item.parent_code !== null &&
      item.parent_code.split(",").includes(system.code) &&
      system.code === id
  );
  const singularScene =
    useMemo(() => scenes.find((item) => item.code === activeScene), [
      activeScene,
      categories,
    ]) || {};
  useEffect(() => {
    dispatch({ type: "productCategory/fetchData" });
  }, []);
  useEffect(() => {
    dispatch({
      type: "menu/saveMenuSelectKey",
      payload: `${id}-${vId}`,
    });
  }, []);

  useEffect(() => {
    setActiveScene(vId);
  }, [vId]);
  return (
    <Card
      title={system.name}
      bordered={true}
      // extra={
      //   <Search
      //     placeholder="input search text"
      //     enterButton="Search"
      //     size="smaill"
      //   />
      // }
      style={{
        maxWidth: `1440px`,
        margin: `20px auto`,
        backgroundColor: "#F9F9F9",
      }}
    >
      <div className="filter-container">
        <strong>{formatMessage({ id: "page.product.scene" })}: </strong>
        <Radio.Group
          value={activeScene}
          onChange={(e) => {
            setActiveScene(e.target.value);
            dispatch({
              type: "menu/saveMenuSelectKey",
              payload: `${id}-${e.target.value}`,
            });
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
      </div>
      <div className="home-page-wrapper content0-wrapper">
        <div className="home-page content0">
          <ProductList
            id={id}
            vId={activeScene}
            // tId={activeType === "all" ? "" : activeType}
            name={singularScene.name}
          />
        </div>
      </div>
    </Card>
  );
};

export default connect(({ productCategory, menu }) => ({
  productCategory,
  menuSelectKey: menu ? menu.menuSelectKey : undefined,
}))(Product);
