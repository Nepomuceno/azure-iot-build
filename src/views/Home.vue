<template>
  <v-layout text-xs-justify wrap>
    <v-flex xs12 mb-10 >
      <div v-drag-and-drop:options="options" class="drag-wrapper">
        <space-tree :spaces="spaces"/>
      </div>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SpaceTree from "@/components/SpacesTree.vue"; // @ is an alias to /src
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
    this.spaces = (await instance.get<Array<DataModel.Space>>(
      "spaces?maxLevel=1&includes=ChildSpaces"
    )).data;
  }
  created() {
    this.load();
  }
  private options = {
    dropzoneSelector: "ul",
    draggableSelector: "li",
    // excludeOlderBrowsers: true,
    // showDropzoneAreas: true,
    multipleDropzonesItemsDraggingEnabled: true,
    onDrop(event:any) {
      console.log("drop");
      console.info(event);
    }
  };
}
</script>
