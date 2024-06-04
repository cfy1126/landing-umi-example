import React, { useEffect, useMemo, memo } from "react";
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
  const currentProductList = useMemo(
    () =>
      products.filter(
        (item) => item.category_scene === vId && item.category_system === id
      ),
    [id, vId, products]
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
          marginTop: 25,
          paddingLeft: 8,
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
            <Link to={{ pathname: "/product", query: { id, vId } }}>
              {formatMessage({ id: "page.home.more" })}
            </Link>
          </div>
        )}
      </div>
      <ProductCard products={currentProductList} />
    </div>
  );
};

export default memo(
  connect(({ productInfo }) => ({ productInfo }))(ProductList)
);
