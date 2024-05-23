import React, { useEffect } from "react";
import { Link, connect, useLocation, useIntl } from "umi";
import ProductCard from "./ProductCard";

/**
 *
 * @param {
 * id: 系统code
 * vId: 场景code
 * tId: 输出code
 * name: 场景name
 * }
 */

const ProductList = ({
  id = "",
  vId = "",
  tId = "",
  name = "",
  outputTypes = [],
  productInfo,
  dispatch,
}) => {
  const { formatMessage } = useIntl();
  const { data: products } = productInfo || { data: [] };
  const location = useLocation();
  const { pathname } = location;
  if(outputTypes && outputTypes.length === 0) {
    tId = '';
  }
  let currentProductList = [];
  if (tId) {
    currentProductList = products.filter(
      (item) => item.category_scene === vId && item.category_output === tId
    );
  } else {
    currentProductList = products.filter((item) => item.category_scene === vId);
  }
  useEffect(() => {
    dispatch({ type: "productInfo/fetchData" });
  }, []);
  return (
    <div className="scenes">
      <div
        className="list-title"
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 50,
        }}
      >
        <div
          data-v-c17bef0a=""
          className="left"
          style={{
            fontSize: 20,
            paddingLeft: 15,
            borderLeft: "4px solid #1890FF",
          }}
        >
          {name}
        </div>
        {pathname === "/" && (
          <div
            data-v-c17bef0a=""
            className="right"
            style={{
              fontSize: 16,
              cursor: "pointer",
            }}
          >
            <Link to={`/product?id=${id}&vId=${vId}`}>
              {formatMessage({ id: "page.home.more" })}
            </Link>
          </div>
        )}
      </div>
      <ProductCard id={id} vId={vId} products={currentProductList} />
    </div>
  );
};

export default connect(({ productInfo }) => ({ productInfo }))(ProductList);
