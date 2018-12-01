<template>
<div>
  <v-card>
    <v-card-title class="headline font-weight-regular">Sensors</v-card-title>
    <DisplaySensors :sensors="sensors" />
    <v-card-text>
    </v-card-text>
  </v-card>
  <v-card>
    <v-card-title class="headline font-weight-regular">Sensors</v-card-title>
    <CreateData v-on:entityCreated="load" />
    <v-card-text>
    </v-card-text>
  </v-card>
</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CreateData from "@/components/CreateSensor.vue"; // @ is an alias to /src
import DisplaySensors from "@/components/DisplaySensors.vue"; // @ is an alias to /src
import Axios, { AxiosInstance } from "axios";
import * as DataModel from "@/models/IotTwinsModel";


@Component({
  components: {
    CreateData,
    DisplaySensors
  }
})
export default class Devices extends Vue {
  
  private sensors: DataModel.Sensor[] = [];
  async load(): Promise<void> {
    var instance = this.$twinApi as AxiosInstance;
    instance.get<DataModel.Sensor[]>("sensors?includes=value,properties")
      .then(response => {
        this.sensors = response.data;
        console.info(this.sensors)
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
