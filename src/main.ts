import Vue, { PluginObject } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Axios from "axios";
import { default as Adal, AxiosAuthHttp } from "vue-adal";
Vue.config.productionTip = false;

const DigitalTwinsAppId = "0b07f429-9f4b-4714-9392-cc5e8e80c8b0";
const url = `https://${process.env.VUE_APP_DIGITAL_TWIN_NAME}.${
  process.env.VUE_APP_DIGITAL_TWIN_LOCATION
}.azuresmartspaces.net/management/api/v1.0/`;
Axios.defaults.baseURL = url;
if (process.env.VUE_APP_AUTH_TOKEN) {
  Axios.defaults.headers.common.Authorization = `Bearer ${
    process.env.VUE_APP_AUTH_TOKEN
  }`;
}

Vue.prototype.$twinApi = AxiosAuthHttp.createNewClient({
  // Required Params
  axios: Axios,
  resourceId: DigitalTwinsAppId, // Resource id to get a token against

  // Optional Params
  router, // Enables a router hook to auto-acquire a token for the specific resource

  baseUrl: url, // Base url to configure the client with

  onTokenSuccess (http : any, context: any, token: any) { // Token success hook
    // When an attempt to retrieve a token is successful, this will get called.
    // This enables modification of the client after a successful call.
    //if (context.user) {
      // Setup the client to talk with the Microsoft Graph API
    //  http.defaults.baseURL = `${graphApiBase}/${context.user.profile.tid}`
    //}
  },

  onTokenFailure (error: any) { // Token failure hook
    // When an attempt to retrieve a token is not successful, this will get called.
    console.log(error)
  }
})
const adal = Adal as PluginObject<any>;
Vue.use(adal, {
  config: {
    tenant: process.env.VUE_APP_TENANT_ID,
    clientId: process.env.VUE_APP_CLIENT_ID,
    redirectUri: process.env.BASE_URI,
    cacheLocation: 'localStorage',
  },
  requireAuthOnInitialize: true,
  router,
});

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
