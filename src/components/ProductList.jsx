import React, { useEffect } from "react";
import { Link, connect, useLocation, useIntl } from "umi";
import ProductCard from "./ProductCard";
import { Button } from "antd";

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
  productInfo,
  dispatch,
}) => {
  const { formatMessage } = useIntl();
  const { data: products } = productInfo || { data: [] };
  const location = useLocation();
  const { pathname } = location;
  const currentProductList = products.filter(
    (item) => item.category_scene === vId && item.category_system === id
  );
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
          paddingLeft: 20,
        }}
      >
        <Button
          type="primary"
          shape="round"
          size="large"
          style={{
            backgroundColor: "#E8E8E8",
            border: "none",
            color: "#000",
          }}
        >
          {name}
        </Button>
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
