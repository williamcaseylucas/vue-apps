<template>
  <div id="top">
    <Title msg="What are AR & VR" />
    <img src="../../assets/milgram.jpg" height=100px width=400px>
    <div class="displaytext" >Some of the key differences between “classic” VR and AR. Extended reality (XR) and the immersive web. Where AR and VR fit on Milgram and Kishino’s virtuality continuum.</div>
  </div>
</template>

<script setup>
import Title from '../../components/CenterTitle.vue'

// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/script-setup-2/active-rfcs/0000-script-setup.md
</script>

<style scoped>
#top {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: justify;
  color: #50312c;
  margin-top: 30px;

  width: 300px; height: 200px;
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
