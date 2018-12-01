<template>
    <v-form @submit.prevent="createNew" xs-6 lazy-validation>
      <v-text-field type="text" v-model="sensor.hardwareId" solo :rules="hardwareIdRules" label="Hardware Id"/>
      <v-autocomplete :items="spaces" item-value="id" v-model="sensor.spaceId" solo
      hide-no-data
      hide-details
      label="Deployed Space"
      item-text="name"
    ></v-autocomplete>
    <v-autocomplete :items="devices" item-value="id" v-model="sensor.deviceId" solo
      hide-no-data
      hide-details
      label="Deployed Device"
      item-text="name"
    ></v-autocomplete>
    <v-divider></v-divider>
    <v-btn @click="createNew">Update Sensor</v-btn>
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
export default class Sensor extends Vue {
  
  private sensor: DataModel.Sensor = { id:"" };
  private spaces: DataModel.Space[] = [];
  private devices: DataModel.Device[] = [];
  hardwareIdRules = [
        (v:any) => !!v || 'Hardware id is required',
  ];
  async created() {
    console.info(router.currentRoute);
    
    var instance = this.$twinApi as AxiosInstance;
    this.spaces = (await instance.get<Array<DataModel.Space>>("spaces")).data;
    this.devices = (await instance.get<Array<DataModel.Space>>("devices")).data;
    let result = await instance.get<DataModel.Sensor>(`sensors/${router.currentRoute.params.id}`)
    console.info(result);
    this.sensor = result.data;
  }
  async createNew() {
    var instance = this.$twinApi as AxiosInstance;
    console.log(JSON.stringify(this.sensor,null,2))
    instance.patch(`sensors/${this.sensor.id}`,this.sensor);
  }
}
</script>
