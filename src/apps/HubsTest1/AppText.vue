<template>
  <div id="top">
      <img alt="Vue logo" src="../../assets/logo.png" />
      <SomeText msg="Some Text We passed to the SomeText Component" />
  </div>
</template>

<script setup>
import SomeText from '../../components/SomeText.vue'

</script>

<style scoped>
#top {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #50312c;
  margin-top: 30px;
  border: 5;
  border-radius: 10px;
  border-color: red;
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
