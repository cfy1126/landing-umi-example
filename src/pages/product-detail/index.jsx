import React, { useState, useEffect, useMemo } from "react";
import { connect, useLocation, useIntl, Link, getLocale } from "umi";
import {
  Card,
  Breadcrumb,
  Typography,
  Select,
  Space,
  List,
  Skeleton,
  Descriptions,
  Divider,
  Checkbox,
  message,
} from "antd";
import { DownloadOutlined, HomeOutlined } from "@ant-design/icons";
// import _ from "lodash";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { getMobileOperatingSystem } from "@/utils/utils";
import useMobile from "@/hooks/useMobile";
import android from "@/assets/android.png";
import ios from "@/assets/ios.png";
import QR from "@/assets/livoltek-QRcode.png";
import install from "@/assets/install-btn.png";
import styles from "./index.less";

const { Title, Text } = Typography;

/**
 *
 * @param {
 * systemDict: 系统字典
 * productInfo: 产品信息
 * productCategory: 产品分类
 * productAttach: 产品附件
 * } param0
 */

function ProductDetail({
  systemDict,
  productInfo,
  productCategory,
  productAttach,
  dispatch,
}) {
  const { formatMessage } = useIntl();
  const location = useLocation();
  let { id } = location.query;
  const { data: categories } = productCategory || { data: [] };
  const { data: products } = productInfo || { data: [] };
  const { data: attachs } = productAttach || { data: [] };
  const { data: types } = systemDict || { data: [] };

  // useEffect(() => {
  //   dispatch({
  //     type: "systemDict/changeLanguage",
  //   });
  // }, [types]);

  // 选择文档类型
  const [activeType, setActiveType] = useState("");

  const singularProduct = products.find((item) => item.code === id) || {};
  const singularSys =
    categories.find((item) => item.code === singularProduct.category_system) ||
    {};
  const singularScene =
    categories.find((item) => item.code === singularProduct.category_scene) ||
    {};

  const currentAttachs = useMemo(
    () => attachs.filter((item) => item.product_code.split(",").includes(id)),
    [attachs, id]
  );
  const groupedData = currentAttachs.reduce((acc, curr) => {
    const category = curr.attach_category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(curr);
    return acc;
  }, {});

  const isMobile = useMobile();

  // const handleAttachType = (id) => {
  //   let data =
  //     types.find((item) => item.code === id && item.type === "2") || {};
  //   return data.name || "";
  // };
  // 复选框选中文件
  const [CheckedArr, setCheckedArr] = useState([]);
  const fileIdArr = useMemo(() => currentAttachs.map((item) => item.id), [
    attachs,
  ]);
  const handleChecked = (checkedValue) => {
    if (Array.isArray(checkedValue)) {
      setCheckedArr(checkedValue);
    } else {
      if (checkedValue.target.checked) {
        setCheckedArr(fileIdArr);
      } else {
        setCheckedArr([]);
      }
    }
  };

  const handleAllDownload = () => {
    if (CheckedArr.length === 0) {
      message.error("Please select the material to be downloaded.");
      return;
    }

    let downloadArr = currentAttachs.filter((item) =>
      CheckedArr.includes(item.id)
    );

    // 去掉URL中的域名部分，只保留路径
    const downloadUrl = downloadArr.map((item) => {
      const url = new URL(item.attach_url);
      let path = `/api${url.pathname}`;
      if (process.env.NODE_ENV === "production") {
        path = item.attach_url;
      }
      return { path, name: item.attach_name }; // 通过代理服务器发送请求
    });

    const zip = new JSZip();
    const folder = zip.folder("attachments");

    message.loading("Starting download, please wait...", 0);
    // 使用 Promise.all 处理所有异步操作
    Promise.all(
      downloadUrl.map((file, index) =>
        fetch(file.path)
          .then((response) => {
            if (!response.ok) {
              throw new Error(`Failed to fetch ${file.path}`);
            }
            return response.blob();
          })
          .then((blob) => {
            folder.file(`${file.name}.pdf`, blob); // 保证文件名为 PDF 格式
          })
      )
    )
      .then(() => {
        // 所有文件都已添加到 ZIP 文件中，生成并下载 ZIP 文件
        zip.generateAsync({ type: "blob" }).then((content) => {
          saveAs(content, "attachments.zip");
          message.destroy();
          message.success("Download completed");
        });
      })
      .catch((error) => {
        console.error("Error downloading files: ", error);
        message.destroy();
        message.error("Download failed");
      });
  };

  const renderAttach = () => {
    let arr = [];
    for (let i in groupedData) {
      let singularType = types.find((item) => item.code === i) || {};
      let filteredObj = {};
      if (activeType) {
        const filteredKeys = Object.keys(groupedData);
        filteredKeys.forEach((key) => {
          if (key === activeType) {
            filteredObj[key] = JSON.parse(JSON.stringify(groupedData[key]));
          }
        });
      } else {
        filteredObj = JSON.parse(JSON.stringify(groupedData));
      }
      if (filteredObj[i] && filteredObj[i].length > 0) {
        arr.push(
          <Card
            type="inner"
            title={singularType.name}
            key={singularType.name}
            style={{ marginBottom: 20 }}
          >
            <List
              className="demo-loadmore-list"
              itemLayout="horizontal"
              dataSource={filteredObj[i]}
              renderItem={(item) => (
                <List.Item
                  key={item.attach_name}
                  actions={[
                    <a
                      href={item.attach_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <DownloadOutlined
                        style={{ fontSize: 24, marginRight: 10 }}
                      />
                      {/* Download */}
                      {/* {formatMessage({ id: "page.productDetail.download" })} */}
                    </a>,
                  ]}
                >
                  <Skeleton avatar title={false} loading={false} active>
                    <Checkbox value={item.id}> </Checkbox>
                    <List.Item.Meta
                      title={<div>{item.attach_name}</div>}
                      description={
                        <Space>
                          <Descriptions
                            labelStyle={{ fontWeight: 550 }}
                            layout={"horizontal"}
                          >
                            <Descriptions.Item
                              label={formatMessage({
                                id: "page.productDetail.type",
                              })}
                            >
                              {singularType.name}
                            </Descriptions.Item>
                            <Descriptions.Item
                              label={formatMessage({
                                id: "page.productDetail.language",
                              })}
                            >
                              {item.attach_language}
                            </Descriptions.Item>
                          </Descriptions>
                        </Space>
                      }
                    />
                  </Skeleton>
                </List.Item>
              )}
            />
          </Card>
        );
      }
    }
    return arr;
  };

  useEffect(() => {
    dispatch({
      type: "menu/saveMenuSelectKey",
      payload: `${singularProduct.category_system}-${singularProduct.category_scene}`,
    });
  }, [products]);
  const keyTypeArr = Object.keys(groupedData) || [];

  const ORcode = useMemo(() => {
    let mark = getMobileOperatingSystem();
    if (mark === "iOS") {
      return ios;
    } else if (mark === "Android") {
      return android;
    } else {
      return QR;
    }
  }, []);
  return (
    <div style={{ paddingBottom: 20 }}>
      {isMobile && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 16,
            margin: 20,
          }}
        >
          <img style={{ width: 80 }} src={ORcode} alt="" />
          {formatMessage({ id: "page.productDetail.prompt.QRcode" })}
          <span></span>
        </div>
      )}
      <Card
        title={
          !isMobile && (
            <Breadcrumb separator=">">
              <Link to="/">
                <HomeOutlined
                  style={{
                    fontSize: 24,
                    marginRight: 10,
                    cursor: "pointer",
                    color: "#40A9FF",
                  }}
                />
              </Link>
              <Breadcrumb.Item>
                {" "}
                {formatMessage({ id: "menu.products.information" })}
              </Breadcrumb.Item>
              <Breadcrumb.Item href="">
                <Link
                  to={`/product?id=${singularSys.code}&vId=${singularScene.code}`}
                >
                  {singularSys.name}
                </Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>{singularProduct.name}</Breadcrumb.Item>
            </Breadcrumb>
          )
        }
        bordered={true}
        style={{
          maxWidth: `1440px`,
          margin: `20px auto`,
        }}
      >
        <Title level={2}>{singularProduct.name}</Title>
        <Divider />
        <div className="select-group" style={{ textAlign: `right` }}>
          <Space>
            <Select
              placeholder={formatMessage({
                id: "page.productDetail.prompt.type",
              })}
              style={{ width: 160, textAlign: "left" }}
              allowClear
              onChange={(value) => setActiveType(value)}
              options={[
                {
                  value: "",
                  label: "All",
                },
                ...keyTypeArr.map((item) => {
                  let singularType =
                    types.find(
                      (element) => element.code === item && element.type === "1"
                    ) || {};
                  return {
                    value: item,
                    label: singularType.name,
                  };
                }),
              ]}
            />
            {/* <Select
              placeholder={formatMessage({
                id: "page.productDetail.prompt.language",
              })}
              style={{ width: 120 }}
              // onChange={handleChange}
              options={[
                {
                  value: "zh",
                  label: "简体中文",
                },
                {
                  value: "en",
                  label: "English",
                },
              ]}
            /> */}
          </Space>
        </div>
        <div
          className="card-group"
          style={{
            marginTop: 24,
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <Checkbox.Group onChange={handleChecked} value={CheckedArr}>
            {renderAttach()}
          </Checkbox.Group>
          {singularProduct.youtube_link && (
            <a
              href={singularProduct.youtube_link}
              style={{ textAlign: "center" }}
            >
              <img width={200} src={install} />
            </a>
          )}
          <Space size={32}>
            <Checkbox
              value={"all"}
              onChange={handleChecked}
              indeterminate={
                CheckedArr.length > 0 && CheckedArr.length < fileIdArr.length
              }
              checked={CheckedArr.length === fileIdArr.length}
            >
              {formatMessage({ id: "page.productDetail.select.all" })}
            </Checkbox>
            <div
              style={{ color: "#40A9FF", cursor: "pointer" }}
              onClick={handleAllDownload}
            >
              <DownloadOutlined style={{ fontSize: 24, marginRight: 10 }} />
              <span>
                {formatMessage({ id: "page.productDetail.download.all" })}
              </span>
            </div>
          </Space>
        </div>
      </Card>
    </div>
  );
}

export default connect(
  ({ systemDict, productInfo, productCategory, productAttach, menu }) => ({
    systemDict,
    productInfo,
    productCategory,
    productAttach,
    menuSelectKey: menu ? menu.menuSelectKey : undefined,
  })
)(ProductDetail);

/**
 * 对象常用方法
 * 1. Object.hasOwnProperty(key) 判断对象是否有某个属性
 * 2. Object.keys(obj) 返回对象的属性数组
 * 3. Object.values(obj) 返回对象的值数组
 * 4. Object.entries(obj) 返回对象的键值对数组
 */
