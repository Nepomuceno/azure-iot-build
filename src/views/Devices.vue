<template>
  <div class="devices">
    <h1>This is an about devices</h1>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CreateData from "@/components/CreateSpace.vue"; // @ is an alias to /src
import Axios, { AxiosInstance } from "axios";
import * as DataModel from "@/models/IotTwinsModel";

@Component({
  components: {
    CreateData
  }
})
export default class Devices extends Vue {

  private spaces: DataModel.Space[] = [];
  load(): void {
    var instance = this.$twinApi as AxiosInstance;
    console.log("reloading");

    instance
      .get<Array<DataModel.Space>>("spaces?maxLevel=1&includes=ChildSpaces")
      .then(response => {
        this.spaces = response.data;
      })
      .catch(err => {
        console.info(err);
      });
  }
  created() {
    this.load();
  }
}
</script>
