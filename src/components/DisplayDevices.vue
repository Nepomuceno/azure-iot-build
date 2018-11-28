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
          <v-card-title><h4>{{ props.item.name }}</h4></v-card-title>
          <v-divider></v-divider>
          <v-list dense>
            <v-list-tile v-for="sensor in props.item.sensors" :key="sensor.id">
              <v-list-tile-content>{{ sensor.hardwareId}}:</v-list-tile-content>
              <v-list-tile-content v-if="sensor.value" class="align-end">{{ sensor.value.value }}</v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
    </v-data-iterator>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from "vue-property-decorator";
import * as DataModel from "../models/IotTwinsModel";

@Component
export default class DisplayDevices extends Vue {
  @Prop()
  private devices!: DataModel.Device[];

  created() {
    console.info(this.devices);
  }
}
</script>
