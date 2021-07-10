<template>
  <div id="top">
      <img alt="Vue logo" src="../../assets/logo.png" />
      <SomeText msg="Networked Vue Component with Shared Button Count" />
  </div>
</template>

<script setup>
import SomeText from '../../components/NetworkedHelloWorld.vue'
import "../../assets/top.css"
</script>

<style scoped>
</style>
