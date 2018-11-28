<template>
  <v-layout text-xs-justify wrap>
    <v-flex xs12 mb-5 >
    <space-tree v-for="space in spaces" :space="space" :key="space.id" recursive="true"/>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SpaceTree from "@/components/SpaceComponent.vue"; // @ is an alias to /src
import Axios, { AxiosInstance } from "axios";
import * as DataModel from "../models/IotTwinsModel";

@Component({
  components: {
    SpaceTree
  }
})
export default class Home extends Vue {
  private spaces: DataModel.Space[] = [];
  async load() {
    var instance = this.$twinApi as AxiosInstance;
    this.spaces = (await instance.get<Array<DataModel.Space>>("spaces?maxLevel=1&includes=ChildSpaces")).data
  }
  created() {
    this.load();
  }
}
</script>
