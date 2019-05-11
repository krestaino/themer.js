import Vue from "vue";
import App from "./App.vue";

// Themer.js setup
import Themer from "themer.js";
import { light, dark, custom } from "./themes/index.js";

Vue.prototype.$themer = new Themer({
  themes: { light, dark, custom },
  debug: true
});

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
