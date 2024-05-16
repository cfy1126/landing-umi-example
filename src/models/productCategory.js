import { getLocale } from "umi";
import { fetchProductCategories } from "../services/api";
import { getLaguage } from "../utils/utils";

export default {
  namespace: "productCategory",
  state: {
    data: [],
  },
  effects: {
    *fetchData(_, { call, put }) {
      try {
        const response = yield call(fetchProductCategories);
        const locale = getLaguage(getLocale());
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
