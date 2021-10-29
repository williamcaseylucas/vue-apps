<template>
  <div> 
  <div id="room">
  <div class="spacer">
  <img src="../../../assets/images/Onboarding/MozillaHubs.jpg" width="400" >
  <br><br>
  <Title msg="The Hubs Platform" />
	<div class="squareoff">*Realitymedia* is built on top of Mozilla's open-source platform. An extensive guide to using Mozilla Hubs is available at <a href="https://hubs.mozilla.com/docs/intro-hubs.html" target="blank">in the Hubs user documentation</a>. Here are the highlights:
  <br><br>
Before entering, you are in the room's lobby. From here, you can see and hear what's going on inside the room, but you can only interact with others using text chat. 
<br><br>
<div class="keyPoint">To enter the room:</div>
<br>
- on a desktop or mobile device, follow the prompts to select a name/avatar and enable the mic.
<br>
- on a VR headset, if you opened the URL on your desktop or smartphone, choose "Enter on Standalone VR" to create a code that makes it easy to open on your standalone headset. Open the browser in your VR headset, navigate to hubs.link and enter the code.
<br><br>
<div class="keyPoint">To navigate in Hubs:</div>  
<br>
-On desktop use your WASD or arrow keys to move around. You can also press your right mouse button to teleport to a different location. Rotate your view using the Q and E keys, or hold down your left mouse button and drag.
-For VR and mobile controls, see the list of <a href="https://hubs.mozilla.com/docs/hubs-controls.html" target="blank">Hubs controls.</a>
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

</style>
