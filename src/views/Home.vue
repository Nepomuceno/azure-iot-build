<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <CreateData v-on:entityCreated="load" />
    <space-tree v-for="space in spaces" :space="space" :key="space.id" recursive="true"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CreateData from '@/components/CreateData.vue'; // @ is an alias to /src
import SpaceTree from '@/components/SpaceComponent.vue'; // @ is an alias to /src
import Axios,{ AxiosInstance } from "axios";
import * as DataModel from "../models/IotTwinsModel";

@Component({
  components: {
    CreateData,
    SpaceTree
  },
})
export default class Home extends Vue {
  private spaces: DataModel.Space[] = [];
  load(): void {
    var instance = this.$twinApi as AxiosInstance;
    console.log("reloading");
    instance.get<Array<DataModel.Space>>("spaces?maxLevel=1")
      .then(response => {
        console.log("home success");
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
