import React, { useEffect } from "react";
import Banner from "./Banner";
import { connect } from "umi";
import ProductSystem from "../components/ProductSystem";
import "./less/antMotionStyle.less";

const Home = ({ productCategory, dispatch }) => {
  const { data } = productCategory;
  const systems = data.filter((item) => item.level === "1");
  useEffect(() => {
    // 组件挂载时触发异步请求
    dispatch({ type: "productCategory/fetchData" });
  }, []);
  return (
    <div className="templates-wrapper">
      <Banner />
      {systems.length > 0 &&
        systems.map((item) => {
          return <ProductSystem id={item.code} title={item.name} />;
        })}
    </div>
  );
};

export default connect(({ productCategory }) => ({ productCategory }))(Home);
