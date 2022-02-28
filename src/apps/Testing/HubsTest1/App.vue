<template>
  <div id="room">
      <img xr-layer alt="Vue logo" src="../../../assets/logo.png" />
      <SomeText v-bind:msg="mesg" />
      <!-- <SomeText msg="Networked Vue Component with Shared Button Count" /> -->
  </div>
</template>

<script setup>
import { inject } from 'vue'
import SomeText from '../../../components/NetworkedHelloWorld.vue'
import "../../../assets/top.css"
import "../../../assets/room.css"

let params = inject("params")
var mesg = params && params.mesg ? params.mesg : "Networked Vue Component with Shared Button Count"
</script>

<style scoped>
</style>
