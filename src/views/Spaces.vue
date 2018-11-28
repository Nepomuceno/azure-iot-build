<template>
  <div class="spaces">
    <CreateData v-on:entityCreated="load" />
    <h1>This is an about spaces</h1>
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
