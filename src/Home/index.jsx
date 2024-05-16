import React, { useEffect } from "react";
import { connect } from "umi";
import Banner from "./Banner";
import ProductSystem from "../components/ProductSystem";
import "./less/antMotionStyle.less";

const Home = ({ productCategory, dispatch }) => {
  const { data: categories } = productCategory;
  useEffect(() => {
    dispatch({ type: "productCategory/fetchData" });
  }, []);
  return (
    <div className="templates-wrapper">
      <Banner />
      {categories
        .filter((item) => item.level === "1")
        .map((item, index) => {
          return <ProductSystem key={`system-${index}`} id={item.code} />;
        })}
    </div>
  );
};

export default connect(({ productCategory }) => ({ productCategory }))(Home);
