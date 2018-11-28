<template>
<v-card>
    <v-card-title class="headline">
      {{this.space.name}}
    </v-card-title>
    <v-layout
      justify-space-between
      pa-3
    >
      <v-flex xs5>
        <v-treeview
          :active.sync="active"
          :items="space.children"
          :load-children="fetchSpaces"
          :open.sync="open"
          :value="selectedSpace"
          activatable
          active-class="primary--text"
          hoverable
          open-on-click
          item-key="id"
          transition
        >
          <v-icon
            v-if="!item.children"
            slot="prepend"
            slot-scope="{ item, active }"
            :color="active ? 'primary' : ''"
          >mdi-account</v-icon>
        </v-treeview>
      </v-flex>
      <v-flex
        d-flex
        text-xs-center
      >
        <v-scroll-y-transition mode="out-in">
          <div
            v-if="!selected"
            class="title grey--text text--lighten-1 font-weight-light"
            style="align-self: center;"
          >
          </div>
          <v-card
            v-else
            :key="selected.id"
            class="pt-4 mx-auto"
            flat
            max-width="400"
          >
            <v-card-text>
              <h3 class="headline mb-2">
                {{ selected.name }}
              </h3>
            </v-card-text>
            <v-divider></v-divider>
            <v-layout
              tag="v-card-text"
              text-xs-left
              wrap
            >

              
            </v-layout>
          </v-card>
        </v-scroll-y-transition>
      </v-flex>
    </v-layout>
  </v-card>
      
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from "vue-property-decorator";
import Axios from "axios";
import {AxiosInstance} from "axios";
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
  private space!: DataModel.Space;
  private active: any[] = [];
  private open: any[] = [];
  private selectedSpace: string | null = null;
  private datas: DataModel.Space[] = [];
  private allspaces: DataModel.Space[] = []
  private devices?: DataModel.Device[] = [];
  private selected: DataModel.Space | null = null;
  /*  console.log("Selected");
        if (!this.active.length) return undefined;
        const id = this.active[0];
        return this.allspaces.find(x => x.id === id);

  }*/
  @Watch("active")
  private changeActive(value: any, oldValue: any){
    console.log("active")
    console.info(value.length);
    console.info(value[0]);
    console.info(oldValue.length);
  }
  async created() {
    var instance = this.$twinApi as AxiosInstance;
    if (this.space) {
      if(this.space.children)
      {
        this.space.children.map(c => c.children = []);
      } 
      console.info(this.space.children);
      this.devices = this.space.devices;
    }
    this.allspaces = (await instance.get<Array<DataModel.Space>>(`spaces?includes=Devices,Properties`)).data;
    
  }
  async fetchSpaces(item: DataModel.Space) {
    let space = await this.loadSpace(item.id);
    if(space.children && item.children)
    {
      item.children.push(...space.children);
    }
  }
  private async loadSpace  (id:string) : Promise<DataModel.Space> {
    var instance = this.$twinApi as AxiosInstance;
    let response = await instance.get<Array<DataModel.Space>>(`spaces?includes=ChildSpaces&spaceId=${id}`)
    let space = response.data[0];
    if(space.children && space.children.length > 0)
    {
      let childrenp = space.children.map(c => this.loadSpace(c.id))
      let children = await Promise.all(childrenp);
      space.children = children;
    } else {
      space.children = undefined;
    }
    return space;

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

