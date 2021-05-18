<template>
  <div id="top" class="reset-this">
      <img alt="Vue logo" src="../../assets/logo.png" />
      <SomeText msg="Some Text We passed to the SomeText Component" />
  </div>
</template>

<script setup>
import SomeText from '../../components/SomeText.vue'

// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/script-setup-2/active-rfcs/0000-script-setup.md
</script>

<style scoped>
#top {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #50312c;
  margin-top: 30px;

  width: 400px; height: 450px;
  position: absolute;

  display: block;
  background-color: white;
}

* {
    box-sizing: content-box;
}

img {
    max-width: none;
    display: inline;
}
</style>
