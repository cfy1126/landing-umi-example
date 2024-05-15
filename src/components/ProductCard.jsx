import React from "react";
import { history } from "umi";
import QueueAnim from "rc-queue-anim";
import { Row, Col } from "antd";
import OverPack from "rc-scroll-anim/lib/ScrollOverPack";

const ProductCard = ({ products = [], id = "", vId = "" }) => {
  const handleClick = (code) => {
    history.push(`/productDetail?id=${id}&vId=${vId}&pId=${code}`);
  };
  return (
    <OverPack playScale={0}>
      <QueueAnim type="bottom" key="block" leaveReverse component={Row}>
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
      </QueueAnim>
    </OverPack>
  );
};

export default ProductCard;
