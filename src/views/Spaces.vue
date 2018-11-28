<template>
<v-card>
  <v-card-title class="headline font-weight-regular">Spaces</v-card-title>
    <CreateData v-on:entityCreated="load" />
  <v-card-text>
  </v-card-text>
</v-card>
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
export default class Spaces extends Vue {

  private spaces: DataModel.Space[] = [];
  
  load(): void {
    var instance = this.$twinApi as AxiosInstance;
  }
  created() {
    this.load();
  }
}
</script>
