<template>
    <form @submit.prevent="createNew">
      <select v-model="entity">
        <option value="space">Space</option>
        <option value="device">Device</option>
        <option value="sensor">Sensor</option>
      </select>
      <input type="text" v-model="name" placeholder="Name"/>
      <select v-model="spaceId">
        <option v-for="option in spaces" :key="option.id" :value="option.id">{{option.name}}</option>
      </select>
      <select v-model="spacetype">
        <option v-for="option in spaceTypes" :key="option.id" :value="option.id">{{option.name}}</option>
      </select>
      <button >Insert new {{entity}}</button>
    </form>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from "vue-property-decorator";
import Axios from "axios";
import * as DataModel from "../models/IotTwinsModel";

@Component
export default class CreateData extends Vue {
  spaces: DataModel.Space[] = [];
  defaultTypes: DataModel.Type[] = [];
  spaceTypes: DataModel.Type[] = [];
  entity: string = "";
  spaceId: string = "";
  spacetype: number = 0;
  name: string = "";

  @Watch("entity")
  onEntityChange(val: any) {
    Axios.get<Array<DataModel.Space>>(
      "spaces"
    )
      .then(response => {
        this.spaceId = "";
        console.info(response.data);
        this.spaces = response.data;
      })
      .catch(err => {
        console.info(err);
      });
  }
  createNew(): void {
    switch (this.entity) {
      case "space":
        var newSpace = {} as DataModel.Space;
        newSpace.name = this.name;
        newSpace.typeId = this.spacetype;
        if (this.spaceId) newSpace.parentSpaceId = this.spaceId;
        console.info(newSpace);
        Axios.post("spaces", newSpace)
          .then(r => {
            console.info(r)
            this.$emit("entityCreated",r.data);
          })
          .catch((err) => {
            console.info(err);
          });
        break;
      case "device":
        break;
      case "sensor":
      default:
        break;
    }
  }
  created() {
    Axios.get<Array<DataModel.Ontology>>("Ontologies?includes=Types").then(
      r => {
        let defaultOntologies = r.data[1].types as DataModel.Type[];
        this.defaultTypes = defaultOntologies;
        this.spaceTypes = defaultOntologies
          .filter(t => t.category == "SpaceType")
          .sort(t => (t.logicalOrder ? t.logicalOrder : 0));

        console.info();
      }
    );
    this.entity = "space";

    Axios.get<Array<DataModel.Space>>(
      "spaces"
    )
      .then(response => {
        this.spaceId = "";
        console.info(response.data);
        this.spaces = response.data;
      })
      .catch(err => {
        console.info(err);
      });
  }
}
</script>
