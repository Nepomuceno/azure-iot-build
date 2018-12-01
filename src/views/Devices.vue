<template>
<v-flex>
  <v-card>
    <v-card-title class="headline font-weight-regular">Devices</v-card-title>
    <DisplayDevices :devices="devices" />
    <v-card-text>
    </v-card-text>
  </v-card>
  <v-card>
    <v-card-title class="headline font-weight-regular">Devices</v-card-title>
    <CreateData v-on:entityCreated="load" />
    <v-card-text>
    </v-card-text>
  </v-card>
</v-flex>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CreateData from "@/components/CreateDevice.vue"; // @ is an alias to /src
import DisplayDevices from "@/components/DisplayDevices.vue"; // @ is an alias to /src
import Axios, { AxiosInstance } from "axios";
import * as DataModel from "@/models/IotTwinsModel";

@Component({
  components: {
    CreateData,
    DisplayDevices
  }
})
export default class Devices extends Vue {
  
  private devices: DataModel.Device[] = [];
  spaces: DataModel.Space[] = [];
  async load(): Promise<void> {
    var instance = this.$twinApi as AxiosInstance;
    instance.get<DataModel.Device[]>("devices?includes=sensors,sensorsValues")
      .then(response => {
        console.log("devices");
        this.devices = response.data;
        console.info(this.devices);
      })
      .catch(err => {
        console.info(err);
      });
  }
  async created() {
    await this.load();
  }
}
</script>
