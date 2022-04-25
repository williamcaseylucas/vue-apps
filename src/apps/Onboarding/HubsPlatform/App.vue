<template>
  <div> 
  <div id="room" class="darkwall">
  <div class="spacer">
  <Title msg="The Hubs Platform" />
  <br />
	<div class="squareoff"><em>Realitymedia</em> is built on top of Mozilla's open-source platform. An extensive guide to using Mozilla Hubs is available <a xr-layer href="https://hubs.mozilla.com/docs/intro-hubs.html" target="_blank" class="alink">in the Hubs user documentation.</a><br><br>
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
.fakeButton {
  color: #fdfd96;
  background: #a78e06;
  /* transition: color 1s; */
}
.fakeButton{
  color: #fdfd96;
}
.fakeButton a{
    text-decoration: underline;
}

.fakeButton:hover {
  color: white;
  background:#78cfa8;
}
<style scoped>

</style>
