import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import FullpageModal from "vue-fullpage-modal";
// Vue.use(FullpageModal);
createApp(App).use(store).use(router).mount("#app");
