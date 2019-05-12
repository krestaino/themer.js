import Vue from "vue";
import App from "./App.vue";

// Themer.js setup
import Themer from "themer.js";
import { light, dark } from "./themes/index.js";

Vue.prototype.$themer = new Themer({
  light,
  dark,
  debug: true
});

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
