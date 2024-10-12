import React, { useState } from "react";
import { Modal, Tabs, Input } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import styles from './ProductSearch.less';
const { Search } = Input;


export default function ProductSearch() {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
            <h3>RESIDENTIAL</h3>
            <div
              className={styles.second_title}
            >
              Grid-Tied
            </div>
            <ul className={styles.product_list}>
                <li><a href="/productDetail?id=1">GT1-2K5/3K/3K3/3K6/4K/5K/6K-D2</a></li>
                <li><a href="/productDetail?id=1">GT1-2K5/3K/3K3/3K6/4K/5K/6K-D2</a></li>
                <li><a href="/productDetail?id=1">GT1-2K5/3K/3K3/3K6/4K/5K/6K-D2</a></li>
                <li><a href="/productDetail?id=1">GT1-2K5/3K/3K3/3K6/4K/5K/6K-D2</a></li>
                <li><a href="/productDetail?id=1">GT1-2K5/3K/3K3/3K6/4K/5K/6K-D2</a></li>
                <li><a href="/productDetail?id=1">GT1-2K5/3K/3K3/3K6/4K/5K/6K-D2</a></li>
                <li><a href="/productDetail?id=1">GT1-2K5/3K/3K3/3K6/4K/5K/6K-D2</a></li>
                <li><a href="/productDetail?id=1">GT1-2K5/3K/3K3/3K6/4K/5K/6K-D2</a></li>
                <li><a href="/productDetail?id=1">GT1-2K5/3K/3K3/3K6/4K/5K/6K-D2</a></li>
                <li><a href="/productDetail?id=1">GT1-2K5/3K/3K3/3K6/4K/5K/6K-D2</a></li>
                <li><a href="/productDetail?id=1">GT1-2K5/3K/3K3/3K6/4K/5K/6K-D2</a></li>
                <li><a href="/productDetail?id=1">GT1-2K5/3K/3K3/3K6/4K/5K/6K-D2</a></li>
            </ul>
          </Tabs.TabPane>
          <Tabs.TabPane tab="RESIDENTIAL" key="residential">
            Content of Tab 1
          </Tabs.TabPane>
          <Tabs.TabPane tab="COMMERCIAL & INDUSTRY" key="commercial_industry">
            Content of Tab 2
          </Tabs.TabPane>
        </Tabs>
      </Modal>
    </>
  );
}
