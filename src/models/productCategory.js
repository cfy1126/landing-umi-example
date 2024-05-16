import { getLocale } from "umi";
import { fetchProductCategories } from "../services/api";

export default {
  namespace: "productCategory",
  state: {
    data: [],
  },
  effects: {
    *fetchData(_, { call, put }) {
      try {
        const response = yield call(fetchProductCategories);
        let locale = getLocale();
        if (locale.indexOf("zh") !== -1) {
          locale = "zh";
        } else if (locale.indexOf("en") !== -1) {
          locale = "en";
        } else {
          locale = "zh";
        }
        let result = response.data.filter((item) => item.language === locale);
        yield put({ type: "saveData", payload: result }); // 将数据保存到状态中
      } catch (error) {
        // 处理异常
        console.log(error);
      }
    },
  },
  reducers: {
    saveData(state, action) {
      return { ...state, data: action.payload };
    },
  },
};
