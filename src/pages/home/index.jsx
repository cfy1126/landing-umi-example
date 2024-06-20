import React, { useState, useEffect } from "react";
import { connect } from "umi";
import { Typography } from "antd";
import useMobile from "@/hooks/useMobile";
import Banner from "./Banner";
import ProductSystem from "../../components/ProductSystem";
import "./less/antMotionStyle.less";

const { Text, Link } = Typography;

const Home = ({ productCategory, dispatch }) => {
  const isMobile = useMobile();
  const [selected, setSelected] = useState("RESIDENTIAL");
  const { data: categories } = productCategory || { data: [] };
  const handleClick = (section) => {
    setSelected(section);
  };
  const getLinkStyle = (section) => ({
    textDecoration: selected === section ? "underline" : "none",
    color: selected === section ? "#1890ff" : "black",
    cursor: "pointer",
  });
  useEffect(() => {
    dispatch({
      type: "menu/saveMenuSelectKey",
      payload: "home",
    });
  }, []);
  return (
    <div className="templates-wrapper" style={{ backgroundColor: "#f1f3f5" }}>
      <Banner />
      {isMobile && (
        <div style={{ textAlign: "center", marginTop: 24 }}>
          <Typography>
            <a
              href="#RESIDENTIAL"
              style={getLinkStyle("RESIDENTIAL")}
              onClick={() => handleClick("RESIDENTIAL")}
            >
              <span>RESIDENTIAL</span>
            </a>
            <br />
            <a
              href="#COMMERCIAL & INDUSTRY"
              style={getLinkStyle("COMMERCIAL")}
              onClick={() => handleClick("COMMERCIAL")}
            >
              <span>COMMERCIAL & INDUSTRY</span>
            </a>
          </Typography>
        </div>
      )}
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
