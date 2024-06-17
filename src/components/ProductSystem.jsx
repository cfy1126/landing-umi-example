import React, { useEffect, useMemo, memo } from "react";
import { connect } from "umi";
import ProductList from "./ProductList";

const ProductSystem = ({ id = "", productCategory, dispatch }) => {
  const { data: categories } = productCategory || { data: [] };
  const singularSystem =
    useMemo(() => categories.find((item) => item.code === id), [
      id,
      categories,
    ]) || {};
  const scenes = categories.filter(
    (item) =>
      item.parent_code !== null &&
      item.parent_code.split(",").includes(singularSystem.code)
  );
  useEffect(() => {
    dispatch({ type: "productCatetory/fetchData" });
  }, []);
  if (scenes.length === 0) return null;
  return (
    <div className="home-page-wrapper content0-wrapper">
      <div className="home-page content0">
        <div className="title-wrapper">
          <h1 id={singularSystem.name} style={{ paddingTop: 80 }}>
            {singularSystem.name}
          </h1>
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

export default memo(
  connect(({ productCategory }) => ({ productCategory }))(ProductSystem)
);

/**
 * 转boolean类型
 *
 * 0 false
 * "" false
 * null false
 * undefined false
 * {} true
 * [] true
 *
 */

/**
 * 对象
 * 1. 对象是否存在
 * 2. 对象是否为undefined
 * 3. 对象是否为{}
 *
 * 数组
 * 1. 数组是否存在
 * 2. 数组是否为[]
 */
