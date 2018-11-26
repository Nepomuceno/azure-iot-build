import Vue, { PluginObject } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Axios from "axios";
import { default as Adal, AxiosAuthHttp } from "vue-adal";
Vue.config.productionTip = false;

const DigitalTwinsAppId = "0b07f429-9f4b-4714-9392-cc5e8e80c8b0";

Axios.defaults.baseURL = `https://${process.env.VUE_APP_DIGITAL_TWIN_NAME}.${
  process.env.VUE_APP_DIGITAL_TWIN_LOCATION
}.azuresmartspaces.net/management/api/v1.0/`;
if (process.env.VUE_APP_AUTH_TOKEN) {
  Axios.defaults.headers.common.Authorization = `Bearer ${
    process.env.VUE_APP_AUTH_TOKEN
  }`;
}
const adal = Adal as PluginObject<any>;
Vue.use(adal, {
  config: {
    tenant: process.env.VUE_APP_TENANT_ID,
    clientId: process.env.VUE_APP_CLIENT_ID,
    redirectUri: process.env.BASE_URI,
    cacheLocation: 'localStorage',
  },
  requireAuthOnInitialize: false,
  router,
});

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
