import Vue from "vue";
import App from "./App.vue";
import "element-ui/lib/theme-chalk/index.css";
import axios from "axios";
import Element from "element-ui";
Vue.use(Element, { size: "small", zIndex: 3000 });
Vue.config.productionTip = false;
// 封装axios
axios.defaults.baseURL = "http://www.liulongbin.top:3006";
Vue.prototype.$axios = axios;

// 封装axios
new Vue({
  render: (h) => h(App),
}).$mount("#app");
