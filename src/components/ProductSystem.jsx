import React, { useEffect } from "react";
import { connect } from "umi";
import ProductList from "./ProductList";

const ProductSystem = ({ id = "", productCategory, dispatch }) => {
  const { data: categories } = productCategory || { data: [] };
  const singularSystem = categories.find((item) => item.code === id);
  const scenes = categories.filter(
    (item) =>
      item.parent_code !== null &&
      item.parent_code.includes(singularSystem.code)
  );
  useEffect(() => {
    dispatch({ type: "productCatetory/fetchData" });
  }, []);
  if (scenes.length === 0) return null;
  return (
    <div className="home-page-wrapper content0-wrapper">
      <div className="home-page content0">
        <div className="title-wrapper">
          <h1>{singularSystem.name}</h1>
        </div>
        {scenes.map((item, index) => {
          return (
            <ProductList
              key={`scene-${index}`}
              id={id}
              vId={item.code}
              name={item.name}
            />
          );
        })}
      </div>
    </div>
  );
};

export default connect(({ productCategory }) => ({ productCategory }))(
  ProductSystem
);
