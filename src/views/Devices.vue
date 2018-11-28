<template>
<v-card>
  <v-card-title class="headline font-weight-regular">Devices</v-card-title>
  <CreateData v-on:entityCreated="load" />
  <v-card-text>
  </v-card-text>
</v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CreateData from "@/components/CreateDevice.vue"; // @ is an alias to /src
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
