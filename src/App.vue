<template>
   
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>MITIE</span>
        <span class="font-weight-light">Smart building</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat href="/" >
          <v-icon>dashboard</v-icon>
          <span>Home</span>
      </v-btn>
      <v-btn flat href="/spaces" >
          <v-icon>aspect_ratio</v-icon>
          <span>Spaces</span>
      </v-btn>
      <v-btn flat href="/devices" >
          <v-icon>memory</v-icon>
          <span>Devices</span>
      </v-btn>
    </v-toolbar>
    
    <v-content>
      <v-container>
       <router-view/>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      bottomNav: 3
    }
    return {
      //
    }
  },
  computed: {
    color () {
      switch (this.bottomNav) {
        case 0: return 'blue-grey'
        case 1: return 'teal'
        case 2: return 'brown'
        case 3: return 'indigo'
      }
    }
  }
}
</script>
