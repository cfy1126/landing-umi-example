import React, { useState } from "react";
import { Modal, Tabs, Input } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { connect } from "umi";
import styles from "./ProductSearch.less";
const { Search } = Input;

function ProductSearch({ productCategory, productInfo }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: categories } = productCategory || { data: [] };
  const { data: products } = productInfo || { data: [] };

  const CategoryContent = ({ item }) => {
    return (
      <>
        <h3>{item.name}</h3>
        {categories
          .filter(
            (_item) =>
              _item.parent_code !== null &&
              _item.parent_code.split(",").includes(item.code)
          )
          .map((element) => {
            return (
              <React.Fragment key={element.id}>
                <div className={styles.second_title}>{element.name}</div>
                <ul className={styles.product_list}>
                  {products
                    .filter(
                      (product) =>
                        product.category_system === item.code &&
                        product.category_scene === element.code
                    )
                    .map((product) => {
                      return (
                        <li key={product.id}>
                          <a href={`/productDetail?id=${product.code}`}>
                            {product.name}
                          </a>
                        </li>
                      );
                    })}
                </ul>
              </React.Fragment>
            );
          })}
      </>
    );
  };

  const TabsItems = categories
    .filter((item) => item.level === "1")
    .map((item) => {
      return (
        <Tabs.TabPane tab={item.name} key={item.id}>
          <CategoryContent item={item} />
        </Tabs.TabPane>
      );
    });

  return (
    <>
      <MenuOutlined onClick={() => setIsModalOpen(true)} />
      <Modal
        height={500}
        style={{
          top: 80,
        }}
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        bodyStyle={{
          height: "540px",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          padding: 16,
        }}
      >
        <Search placeholder="input search text" enterButton />
        <Tabs tabPosition="left" style={{ flexGrow: 1 }}>
          <Tabs.TabPane tab="ALL" key="all">
            {categories
              .filter((object) => object.level === "1")
              .map((item) => {
                return <CategoryContent key={item.id} item={item} />;
              })}
          </Tabs.TabPane>
          {TabsItems}
        </Tabs>
      </Modal>
    </>
  );
}

export default connect(
  ({ productInfo, productCategory }) => ({
    productInfo,
    productCategory,
  })
)(ProductSearch);
