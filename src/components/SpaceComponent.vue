<template>

      <div class="space-tree">
        <h2>{{this.space.name}}</h2>
        <space-tree  v-for="data in spaceData" :key="data.id" :space="data" :recursive="recursive"></space-tree>
        <div v-for="device in devices" :key="device.id" class="space-device">
            {{device.name}}
        </div>
      </div>      
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from "vue-property-decorator";
import Axios from "axios";
import * as DataModel from "../models/IotTwinsModel";
import SpaceTree from "./SpaceComponent.vue";

@Component({
  name: "SpaceTree",
  components: {
    SpaceTree
  }
})
export default class SpaceComponent extends Vue {
  private spaceData: DataModel.Space[] = [];
  @Prop()
  private recursive!: boolean;
  @Prop()
  private space!: DataModel.Space;
  private i: number = 1;
  private datas: DataModel.Space[] = [];
  private devices?: DataModel.Device[] = [];
  created() {
    if (this.space) {
      this.devices = this.space.devices;
      Axios.get<Array<DataModel.Space>>(`spaces?includes=Devices&spaceId=${this.space.id}&minLevel=1&minRelative=true&maxLevel=1&maxRelative=true&traverse=Down`)
        .then(response => {
          this.spaceData = response.data;
        })
        .catch(err => {
          console.info(err);
        });
    }
  }
}
</script>

<style scoped>
.space-tree {
  padding: 1em;
  border: 2px solid black;
  float: left;
}
.space-device {
  padding: 0.1em;
  border: 1px solid gray;
}
</style>