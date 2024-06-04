export default {
  namespace: "menu",
  state: {
    menuSelectKey: 'home',
  },
  reducers: {
    saveMenuSelectKey(state, { payload }) {
      return { ...state, menuSelectKey: payload };
    }
  },
  // ...
};
