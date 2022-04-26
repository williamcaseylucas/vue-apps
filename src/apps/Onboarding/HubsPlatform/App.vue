<template>
  <div>
  <div id="room" class="darkwall">
  <div class="spacer">
  <Title msg="The Hubs Platform" />
  <br />
  <div class="squareoff"><em>Realitymedia</em> is built on top of Mozilla's open-source platform. An extensive guide to using Mozilla Hubs is available <a xr-layer href="https://hubs.mozilla.com/docs/intro-hubs.html" target="_blank"><span class="test4">in the Hubs user documentation.</span></a><br><br>
  Here are the highlights:
  <br><br>
Before entering, you are in the room's lobby. From here, you can see and hear what's going on inside the room, but you can only interact with others using text chat.
<br><br>
</div>
  </div>
  </div>
  </div>
</template>
 
<script setup>
import Title from '../../../components/CenterTitle.vue'
 
import "../../../assets/top.css"
import "../../../assets/room.css"
</script>
 
<style scoped>
 .test4{
  color: #fdfd96;
  text-decoration: underline;
 }
  .test4:hover{
  color: white;
  background:#78cfa8;
 }
</style>
 

