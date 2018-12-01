<template>
  <v-form @submit.prevent="createNew" xs-6 lazy-validation>
    <v-text-field
      type="text"
      v-model="hardwareId"
      solo
      :rules="hardwareIdRules"
      label="Hardware Id"
    />
    <v-autocomplete
      :items="devices"
      item-value="id"
      v-model="deviceId"
      solo
      hide-no-data
      hide-details
      label="Device"
      item-text="name"
    ></v-autocomplete>
    <v-divider></v-divider>
    <v-radio-group v-model="sensorTypeId" row>
      <div slot="label">Sensor type</div>
      <v-radio v-for="n in sensorTypes" :key="n.id" :label="`${n.name}`" :value="n.id"></v-radio>
    </v-radio-group>
    <v-btn @click="createNew">Create new Sensor</v-btn>
  </v-form>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from "vue-property-decorator";
import { default as Axios, AxiosInstance } from "axios";
import * as DataModel from "../models/IotTwinsModel";

@Component
export default class CreateSensor extends Vue {
  sensorTypes = [
    { id: 314, name: "Sensor ENL ZN" },
    { id: 315, name: "Sensor ENL ZN VC" },
    { id: 317, name: "Sensor ENL AQN" },
    { id: 318, name: "ELSYS" },
  ];
  sensorTypeId: number = 314;
  devices: DataModel.Device[] = [];
  deviceId: string | null = null;
  hardwareId: string = "";
  hardwareIdRules = [(v: any) => !!v || "Hardware id is required"];

  createNew(): void {
    var instance = this.$twinApi as AxiosInstance;
    var newSensor = {} as DataModel.Sensor;
    newSensor.hardwareId = this.hardwareId;
    newSensor.deviceId = this.deviceId ? this.deviceId : this.devices[0].id;
    newSensor.typeId = 9;
    newSensor.dataTypeId = this.sensorTypeId;
    newSensor.dataSubtypeId = 5;
    newSensor.portTypeId = 8;
    console.log(newSensor);
    instance
      .post("sensors", newSensor)
      .then(r => {
        this.$emit("entityCreated", r.data);
      })
      .catch(err => {
        console.info(err);
      });
  }
  created() {
    var instance = this.$twinApi as AxiosInstance;
    instance
      .get<Array<DataModel.Device>>("devices")
      .then(response => {
        this.devices = response.data;
      })
      .catch(err => {
        console.info(err);
      });
  }
}
</script>
