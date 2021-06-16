<template>
  <div id="top">
  <Title msg="The LaCiotat Effect" />
	<img src="../../assets/train.jpg" width="300" >
	<div>Film became one of the most important reality media of 
	the twentieth century, and in some ways, it is a forerunner of virtual reality.</div>
	  <div class="displaytext">AR allows us to extend our physical reality; VR creates for us a different reality.</div>
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
  text-align: center;
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
