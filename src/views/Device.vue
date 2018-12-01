<template>
    <v-form @submit.prevent="createNew" xs-6 lazy-validation>
      <v-text-field type="text" v-model="device.name" solo label="Name"/>
      <v-text-field type="text" v-model="device.hardwareId" solo :rules="hardwareIdRules" label="Hardware Id"/>
      <v-autocomplete :items="spaces" item-value="id" v-model="device.spaceId" solo
      hide-no-data
      hide-details
      label="Deployed Space"
      item-text="name"
    ></v-autocomplete>
    <v-divider></v-divider>
    <v-btn @click="createNew">Update Device</v-btn>
    </v-form>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CreateData from "@/components/CreateDevice.vue"; // @ is an alias to /src
import DisplayDevices from "@/components/DisplayDevices.vue"; // @ is an alias to /src
import Axios, { AxiosInstance } from "axios";
import * as DataModel from "@/models/IotTwinsModel";
import {Route} from 'vue-router';
import router from '@/router';

@Component({
  components: {
    CreateData,
    DisplayDevices
  }
})
export default class Devices extends Vue {
  
  private device: DataModel.Device = { id:"" };
  private spaces: DataModel.Space[] = [];
  hardwareIdRules = [
        (v:any) => !!v || 'Hardware id is required',
  ];
  async created() {
    console.info(router.currentRoute);
    
    var instance = this.$twinApi as AxiosInstance;
    this.spaces = (await instance.get<Array<DataModel.Space>>("spaces")).data;
    let result = await instance.get<DataModel.Device>(`devices/${router.currentRoute.params.id}`)
    console.info(result);
    this.device = result.data;
  }
  async createNew() {
    var instance = this.$twinApi as AxiosInstance;
    console.log(JSON.stringify(this.device,null,2))
    instance.patch(`devices/${this.device.id}`,this.device);
  }
}
</script>
