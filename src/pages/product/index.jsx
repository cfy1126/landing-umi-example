import React, { useState, useEffect, useMemo } from "react";
import { connect, useLocation, useIntl, Link } from "umi";
import { Card, Input, Radio, Divider } from "antd";
import ProductList from "../../components/ProductList";
import { HomeOutlined } from "@ant-design/icons";
import styles from "./index.less";

const { Search } = Input;

const Product = ({ productCategory, dispatch }) => {
  const { formatMessage } = useIntl();
  const location = useLocation();
  let { id, vId } = location.query;

  const [activeScene, setActiveScene] = useState(vId);

  const { data: categories } = productCategory || { data: [] };
  const system =
    useMemo(() => categories.find((item) => item.code === id), [
      id,
      categories,
    ]) || {};
  const scenes = categories.filter(
    (item) =>
      item.parent_code !== null &&
      item.parent_code.split(",").includes(system.code)
  );
  const singularScene =
    useMemo(() => scenes.find((item) => item.code === activeScene), [
      activeScene,
      categories,
    ]) || {};
  useEffect(() => {
    if (vId === undefined) {
      dispatch({
        type: "menu/saveMenuSelectKey",
        payload: system.name,
      });
      return;
    }
    dispatch({
      type: "menu/saveMenuSelectKey",
      payload: `${id}-${vId}`,
    });
  }, []);

  useEffect(() => {
    if (vId === undefined) {
      setActiveScene("all");
    } else {
      setActiveScene(vId);
    }
  }, [vId]);
  return (
    <Card
      title={
        <>
          <Link to="/">
            <HomeOutlined
              style={{
                fontSize: 24,
                marginRight: 10,
                cursor: "pointer",
                color: "#40A9FF",
              }}
            />
            <span style={{ color: "#000" }}>{system.name}</span>
          </Link>
          <Divider />
          <div className="filter-container" style={{ background: "#fff" }}>
            <span>{formatMessage({ id: "page.product.scene" })}: </span>
            <Radio.Group
              value={activeScene}
              onChange={(e) => {
                setActiveScene(e.target.value);
                if (e.target.value === "all") {
                  dispatch({
                    type: "menu/saveMenuSelectKey",
                    payload: system.name,
                  });
                  return;
                }
                dispatch({
                  type: "menu/saveMenuSelectKey",
                  payload: `${id}-${e.target.value}`,
                });
              }}
              style={{
                marginTop: 16,
              }}
            >
              <Radio.Button value="all">ALL</Radio.Button>
              {scenes.map((item) => (
                <Radio.Button key={item.code} value={item.code}>
                  {item.name}
                </Radio.Button>
              ))}
            </Radio.Group>
            <br />
          </div>
        </>
      }
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
      <div className="home-page-wrapper content0-wrapper">
        <div className="home-page content0">
          {activeScene === "all" ? (
            scenes.map((item) => (
              <ProductList
                key={item.code}
                id={id}
                vId={item.code}
                name={item.name}
              />
            ))
          ) : (
            <ProductList id={id} vId={activeScene} name={singularScene.name} />
          )}
        </div>
      </div>
    </Card>
  );
};

export default connect(({ productCategory, menu }) => ({
  productCategory,
  menuSelectKey: menu ? menu.menuSelectKey : undefined,
}))(Product);
