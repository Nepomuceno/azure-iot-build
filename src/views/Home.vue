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
import Axios from "axios";
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
    console.log("reloading");
    Axios.get<Array<DataModel.Space>>("spaces?maxLevel=1")
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
