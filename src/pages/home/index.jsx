import React, { useEffect } from "react";
import { connect, setLocale } from "umi";
import Banner from "./Banner";
import ProductSystem from "../../components/ProductSystem";
import "./less/antMotionStyle.less";

const Home = ({ productCategory, dispatch }) => {
  const { data: categories } = productCategory || { data: [] };
  useEffect(() => {
    // setLocale("en-US", true);
    // dispatch({ type: "productCategory/fetchData" });
  }, []);
  useEffect(() => {
    dispatch({
      type: "menu/saveMenuSelectKey",
      payload: "home",
    });
  }, []);
  return (
    <div className="templates-wrapper" style={{ backgroundColor: "#f1f3f5" }}>
      <Banner />
      {categories
        .filter((item) => item.level === "1")
        .map((item, index) => {
          return <ProductSystem key={`system-${index}`} id={item.code} />;
        })}
    </div>
  );
};

export default connect(({ productCategory, menu }) => ({
  productCategory,
  menuSelectKey: menu ? menu.menuSelectKey : undefined,
}))(Home);
