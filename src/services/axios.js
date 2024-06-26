import axios from "axios";

const http = axios.create({
  // baseURL: "", // 设置你的 API 地址
  timeout: 5000, // 设置请求超时时间
});

const request = (method, url, dataOrParams = {}, config = {}) => {
  return new Promise((resolve, reject) => {
    const requestConfig = {
      method,
      url,
      ...config,
    };

    // 如果是 GET 请求，将参数放在 params 中
    if (method.toLowerCase() === "get") {
      requestConfig.params = dataOrParams;
    } else {
      requestConfig.data = dataOrParams;
    }

    http(requestConfig)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export { request };
