<template>
  <div id="top">
      <img alt="Vue logo" src="../assets/logo.png" />
      <HelloWorld msg="Hello World, From the HelloWorld Component" />
  </div>
</template>

<script setup>
import HelloWorld from '../components/HelloWorld.vue'

// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/script-setup-2/active-rfcs/0000-script-setup.md
</script>

<style>
#top {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #50312c;
  margin-top: 30px;

  width: 400px; height: 500px;
  position: absolute;
}
</style>
