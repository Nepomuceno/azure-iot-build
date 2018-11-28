<template>
<v-form @submit.prevent="createNew">
  <v-text-field type="text" v-model="name" solo label="Name"/>
  <v-autocomplete
  :items="spaces"
  item-value="id"
  v-model="parentSpaceId"
  solo
  hide-no-data
  hide-details
  label="Parent Space"
  item-text="name"
  ></v-autocomplete>
  <v-radio-group v-model="spaceType">
    <div slot="label"> Property type</div>
    <v-radio
      v-for="n in spaceTypes"
      :key="n.id"
      :label="`${n.name}`"
      :value="n"
    ></v-radio>
  </v-radio-group>      
  <v-btn @click="createNew">Create new Space</v-btn>
</v-form>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from "vue-property-decorator";
import { default as Axios, AxiosInstance } from "axios";
import * as DataModel from "../models/IotTwinsModel";

@Component
export default class CreateSpace extends Vue {
  spaces: DataModel.Space[] = [];
  parentSpaceId: string | null = null;
  defaultTypes: DataModel.Type[] = [];
  spaceTypes: DataModel.Type[] = [];
  spaceType: DataModel.Type | null = null;
  name: string = "";
  newSpaceId : string = "";

  async createNew(): Promise<void> {
    var instance = this.$twinApi as AxiosInstance;
    var newSpace = {} as DataModel.Space;
    newSpace.name = this.name;
    newSpace.typeId = this.spaceType ? this.spaceType.id : 12;
    if (this.parentSpaceId) newSpace.parentSpaceId = this.parentSpaceId;
    console.log(newSpace);
    console.log(this.parentSpaceId)
    this.newSpaceId = (await instance.post<string>("spaces", newSpace)).data;
    this.$emit("entityCreated", this.newSpaceId);
  }
  created() {
    var instance = this.$twinApi as AxiosInstance;
    instance
      .get<Array<DataModel.Ontology>>("Ontologies?includes=Types")
      .then(r => {
        let defaultOntologies = r.data[1].types as DataModel.Type[];
        this.defaultTypes = defaultOntologies;
        this.spaceTypes = defaultOntologies
          .filter(t => t.category == "SpaceType")
          .sort(t => (t.logicalOrder ? t.logicalOrder : 0));
      });

    instance
      .get<Array<DataModel.Space>>("spaces")
      .then(response => {
        this.spaceId = "";
        console.info(response.data);
        this.spaces = response.data;
      })
      .catch(err => {
        console.info(err);
      });
    /* */
  }
}
</script>
