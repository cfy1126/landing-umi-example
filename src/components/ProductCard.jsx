import React from "react";
import { history } from "umi";
import { Row, Col } from "antd";

/**
 *
 * @param {
 * id: 系统code
 * vId: 场景code
 * tId: 输出code
 * pId: 产品code
 * }
 */

const ProductCard = ({ id = "", vId = "", products = [] }) => {
  const handleClick = (code) => {
    history.push(`/productDetail?id=${id}&vId=${vId}&pId=${code}`);
  };
  return (
    <Row>
      {products.map((product) => {
        return (
          <Col
            md={6}
            xs={24}
            className="content0-block"
            onClick={() => handleClick(product.code)}
          >
            <div className="content0-block-item jzjgrrupf2c-editor_css">
              <img
                src={product.product_url}
                alt=""
                className="content0-block-icon jzjncn210ql-editor_css"
              />
              <h1 className="content0-block-title jzj8xt5kgv7-editor_css">
                {product.name}
              </h1>
            </div>
          </Col>
        );
      })}
    </Row>
  );
};

export default ProductCard;
