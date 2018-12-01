<template>
<v-card>
    <v-card-title class="headline">
      {{this.space.name}}
    </v-card-title>
    <v-layout
      justify-space-between
      pa-3
    >
    <v-flex xs12>
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
import Vue from 'vue';
import { Component, Prop, Watch, Emit } from "vue-property-decorator";
import Axios from "axios";
import { AxiosInstance } from "axios";
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
  private selectedSpace = [];
  private datas: DataModel.Space[] = [];
  private allspaces: DataModel.Space[] = [];
  private devices?: DataModel.Device[] = [];
  private selected: DataModel.Space | null = null;
  private selection = [];
  private display(item: any) {
    return item.label;
  }
  private onSelect = (element: any) => {
    console.info(element);
  };
  private model = [
    {
      label: "Click me, I'm a node with two children.",

      children: [
        { label: "I am a childless leaf." },
        { label: "I am a also a childless leaf." }
      ]
    },
    { label: "I'm a leaf, I do not have children." },
    {
      label: "I am an asynchronous node, click me and wait one second."
      /*children: new Promise(resolve =>
          setTimeout(
            () =>
              resolve([
                {
                  label:
                    "It took exactly one second to fetch me the first time, I am cached afterwards."
                }
              ]),
            1000
          )
        )
        */
    }
  ];
  /*  console.log("Selected");
        if (!this.active.length) return undefined;
        const id = this.active[0];
        return this.allspaces.find(x => x.id === id);

  }*/
  @Watch("active")
  private changeActive(value: any, oldValue: any) {
    console.log("active");
    console.info(value.length);

    console.info(value[0]);
    console.info(oldValue.length);
  }
  async created() {
    var instance = this.$twinApi as AxiosInstance;
    console.info("tree");

    if (this.space) {
      if (this.space.children) {
        this.space.children.map(c => (c.children = []));
      }
      console.info(this.space.children);
      this.devices = this.space.devices;
    }
    this.allspaces = (await instance.get<DataModel.Space[]>(
      `spaces?includes=Devices,Properties`
    )).data;
  }
  async fetchSpaces(item: DataModel.Space) {
    let space = await this.loadSpace(item.id);
    if (space.children && item.children) {
      item.children.push(...space.children);
    }
  }
  private async loadSpace(id: string): Promise<DataModel.Space> {
    var instance = this.$twinApi as AxiosInstance;
    let response = await instance.get<DataModel.Space[]>(
      `spaces?includes=ChildSpaces&spaceId=${id}`
    );
    let space = response.data[0];
    if (space.children && space.children.length > 0) {
      let childrenp = space.children.map(c => this.loadSpace(c.id));
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
.TreeViewDemo > input[type="search"] {
  width: 100%;
  background: rgba(0, 0, 0, 0.05);
  height: 3em;
  border-width: 2px;
  transition: border 0.5s;
}

/* Elements */

.TreeViewDemo {
  box-shadow: 0px 0px 10px #dadada;
  white-space: nowrap;
}

.TreeViewDemo ul {
  list-style: none;
}

.TreeViewDemo li {
  min-width: 100px;
  transition: all 0.25s ease-in-out;
}

.TreeViewDemo ul li a {
  color: #222;
}

.TreeViewDemo ul li > .item > a {
  display: inline-block;
  vertical-align: middle;
  width: calc(100% - 55px);
  margin-right: 30px;
  padding: 10px 5px;
  text-decoration: none;
  transition: all 0.25s;
}

.TreeViewDemo ul li:not(.disabled) {
  cursor: pointer;
}

.TreeViewDemo ul li.selected > .item > a {
  color: crimson;
}

.TreeViewDemo ul li.selected > .item > a:hover {
  color: #aaa;
}

.TreeViewDemo ul li:not(.disabled) > .item > a:hover {
  color: #e26f6f;
}

/* Root elements */

.TreeViewDemo ul.depth-0 {
  padding: 20px;
  margin: 0;
  background-color: rgba(255, 255, 255, 0.4);
  user-select: none;
  transition: all 0.25s;
}

/* Categories : Nodes with children */

.TreeViewDemo li.category > .item {
  display: block;
  margin-bottom: 5px;
  transition: all 0.25s ease-in-out;
}

.TreeViewDemo li.category:not(.folded) > .item {
  border-bottom: 1px solid crimson;
}

/* Category opener */

.TreeViewDemo .opener {
  display: inline-block;
  vertical-align: middle;
  font-size: 20px;
  cursor: pointer;
}

.TreeViewDemo .opener::after {
  content: "+";
  display: block;
  transition: all 0.25s;
  font-family: monospace;
}

.TreeViewDemo li.category.async > .item > .opener::after {
  content: "!";
}

.TreeViewDemo .opener:hover {
  color: #e26f6f;
}

.TreeViewDemo li.category:not(.folded) > .item > .opener::after {
  color: crimson;
  transform: rotate(45deg);
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.TreeViewDemo li.category.loading > .item > .opener::after {
  animation: spin 1s infinite;
}

/* Animations on fold / unfold */

.TreeViewDemoTransition-enter,
.TreeViewDemoTransition-leave-to {
  opacity: 0;
  transform: translateX(-50px);
}

.TreeViewDemoTransition-enter-active,
.TreeViewDemoTransition-leave-active {
  transition: all 0.3s ease-in-out;
}

/* Drag'n'drop */

.TreeViewDemo li.dragover,
.TreeViewDemo ul.dragover {
  box-shadow: 0px 0px 5px #ccc;
}

.TreeViewDemo ul.dragover {
  background-color: rgba(200, 200, 200, 0.3);
}

.TreeViewDemo li.dragover {
  background-color: rgba(100, 100, 100, 0.05);
  padding: 0px 5px;
}

.TreeViewDemo li.dragover > span.item {
  border-color: transparent;
}

.TreeViewDemo li.nodrop {
  box-shadow: 0px 0px 5px crimson;
  background-color: rgba(255, 20, 60, 0.1);
  padding: 0px 5px;
}
</style>

