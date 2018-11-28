<template>
    <v-form @submit.prevent="createNew" lazy-validation>
      <v-text-field type="text" v-model="name" solo label="Name"/>
      <v-text-field type="text" 
       v-model="hardwareId"
       solo
       :rules="hardwareIdRules" 
       label="Hardware Id"/>
      
      <v-autocomplete
      :items="spaces"
      item-value="id"
      v-model="spaceId"
      solo
      hide-no-data
      hide-details
      label="Deployed Space"
      item-text="name"
    ></v-autocomplete>
    <v-divider></v-divider>
    <v-btn @click="createNew">Create new Device</v-btn>
    </v-form>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from "vue-property-decorator";
import { default as Axios, AxiosInstance } from "axios";
import * as DataModel from "../models/IotTwinsModel";

@Component
export default class CreateDevice extends Vue {
  spaces: DataModel.Space[] = [];
  spaceId: string | null = null;
  hardwareId?: string;
  defaultTypes: DataModel.Type[] = [];
  deviceTypes: DataModel.Type[] = [];
  deviceType: DataModel.Type | null = null;
  name: string = "";
  newSpaceId : string = "";
  hardwareIdRules = [
        (v:any) => !!v || 'Hardware id is required',
  ];

  createNew(): void {
    var instance = this.$twinApi as AxiosInstance;
    var newDevice = {} as DataModel.Device;
    newDevice.name = this.name;
    newDevice.hardwareId = this.hardwareId;
    newDevice.typeId = this.deviceType ? this.deviceType.id : 2;
    if (this.spaceId) newDevice.spaceId = this.spaceId;
    console.log(newDevice);
    console.log(this.spaceId)
    instance
      .post("devices", newDevice)
      .then(r => {
        this.newSpaceId = r.data;
        this.$emit("entityCreated", r.data);
      })
      .catch(err => {
        console.info(err);
      });
  }
  created() {
    var instance = this.$twinApi as AxiosInstance;
    instance
      .get<Array<DataModel.Ontology>>("Ontologies?includes=Types")
      .then(r => {
        let defaultOntologies = r.data[2].types as DataModel.Type[];
        this.defaultTypes = defaultOntologies;
        this.defaultTypes = defaultOntologies
          .filter(t => t.category == "DeviceType")
          .sort(t => (t.logicalOrder ? t.logicalOrder : 0));
      });

    instance
      .get<Array<DataModel.Space>>("spaces")
      .then(response => {
        this.spaceId = "";
        this.spaces = response.data;
      })
      .catch(err => {
        console.info(err);
      });
    /* */
  }
}
</script>
