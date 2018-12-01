<template>
    <v-container fluid grid-list-md>
    <v-data-iterator
      :items="sensors"
      content-tag="v-layout"
      row
      wrap
    >
    <v-flex  slot="item" slot-scope="props"  xs12 sm6 md4 lg3>
      <v-card>
        <v-card-title @click="navigateTo(props.item)"><h4>{{ props.item.hardwareId }}</h4></v-card-title>
        <v-divider></v-divider>
        <span v-if="props.item.value">{{props.item.value.value }}</span>
        <v-card-actions>
          <v-btn color="error" @click="deletesensor(props.item)">Delete Sensor</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
    </v-data-iterator>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from "vue-property-decorator";
import * as DataModel from "../models/IotTwinsModel";
import { default as Axios, AxiosInstance } from "axios";
import router from '@/router';

@Component
export default class DisplaySensors extends Vue {
  @Prop()
  private sensors!: DataModel.Sensor[];
  
  navigateTo(sensor: DataModel.Sensor) {
    console.info(sensor)
    router.push(`/sensors/${sensor.id}`);
  }
  async deletesensor(sensor: DataModel.Sensor) {
    console.info(sensor);
    var instance = this.$twinApi as AxiosInstance;
    await instance.delete(`/sensors/${sensor.id}`)
  }
  created() {
    console.log("created");
    console.info(this.sensors);
  }
}
</script>
