<template>
<ul>

    <li v-for="space in spaces" :key="space.id">
        <v-card>
            <v-card-title v-on:dblclick="expand(space)" primary-title>
                {{space.name}}
            </v-card-title>
            <v-card-text>
                <space-tree :spaces="space.children"></space-tree>
            </v-card-text>
        </v-card>
    </li>    
</ul>
</template>


<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from "vue-property-decorator";
import * as DataModel from "../models/IotTwinsModel";

@Component({
  name: "space-tree",
})
export default class SpaceTree extends Vue {
    @Prop()
    private spaces!: DataModel.Space[];
    
    async created() {
        console.info(this.spaces)
    }
    async expand(space:DataModel.Space) {
        console.info(space);
    }
}
</script>