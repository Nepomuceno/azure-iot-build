<template>
  <ul>
    <li v-for="(space,i) in spaces" :key="space.id">
      <v-card mb-4>
        <v-card-title v-on:dblclick="expand(space,i)" primary-title>{{space.name}}</v-card-title>
        <v-card-text>
          <space-tree :spaces="space.children"></space-tree>
          <ul style="min-height:100px">
            <li>Devices</li>
            <li v-for="device in space.devices" :key="device.hardwareId">{{device.hardwareId}}</li>
          </ul>
        </v-card-text>
      </v-card>
    </li>
  </ul>
</template>


<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch, Emit } from "vue-property-decorator";
import { default as Axios, AxiosInstance } from "axios";
import * as DataModel from "../models/IotTwinsModel";

@Component({
  name: "space-tree"
})
export default class SpaceTree extends Vue {
  @Prop()
  private spaces!: DataModel.Space[];

  async created() {
    console.info(this.spaces);
  }

  async expand(space: DataModel.Space, i: number) {
    let instance = Vue.$twinApi;
    let newspace = (await instance.get<DataModel.Space[]>(
      `spaces?spaceId=${space.id}&includes=ChildSpaces,Devices`
    )).data;
    console.info(newspace);
    this.$set<DataModel.Space>(this.spaces, i, newspace[0]);
  }
}
</script>

<style lang="scss" scoped>
ul {
    list-style: none;
}
</style>
