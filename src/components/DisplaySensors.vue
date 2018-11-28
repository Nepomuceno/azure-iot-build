<template>
    <v-container fluid grid-list-md>
    <v-data-iterator
      :items="devices"
      :pagination.sync="pagination"
      content-tag="v-layout"
      row
      wrap
    >
      <v-flex  slot="item" slot-scope="props"  xs12 sm6 md4 lg3>
        <v-card>
          <v-card-title><h4>{{ props.item.hardwareId }}</h4></v-card-title>
          <v-divider></v-divider>
          <span v-if="props.item.value">{{props.item.value.value }}</span>
        </v-card>
      </v-flex>
    </v-data-iterator>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from "vue-property-decorator";
import * as DataModel from "../models/IotTwinsModel";

@Component
export default class DisplaySensors extends Vue {
  @Prop()
  private sensors!: DataModel.Sensor[];

  created() {
    console.info(this.sensors);
  }
}
</script>
