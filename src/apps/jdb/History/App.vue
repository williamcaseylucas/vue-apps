<template>
  <div id="top">
    <Title msg="The History of Reality Media" />
    <img src="../../assets/pano.jpg" height=100px width=500px >
    <div class="displaytext">Each reality medium mediates and remediates. It offers a new representation of the world that we implicitly compare to our experience of the world in itself, but also through other media.</div> 
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
    max-width: 400px;
        display: inline;
}
</style>
