declare module '*.vue' {
  export default Vue;
}

import Vue from 'vue'
import Axios, { AxiosInstance } from "axios";
declare module 'vue/types/vue' {

  // Global properties can be declared
  // on the `VueConstructor` interface
  interface VueConstructor {
    $myGlobal: string
    $twinApi: AxiosInstance
  }
}

declare module 'vue-adal';