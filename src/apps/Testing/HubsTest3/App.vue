<template>
<div>
  <div id="room" >
    <div class="titleStyle">{{ title }}</div>

    <div>{{ help }}</div>

    <div></div>
    <div>Click to swap objects: <button xr-layer @click="shared.nextObject">Swap Objects</button></div>
    <div>Current object is: {{ shared.getName() }}</div>

    <div></div>    
    
    <div xr-layer>Click to make larger: <span class="fakeButton"  @click="shared.larger">Larger</span></div>
    <div xr-layer>Click to make smaller: <span class="fakeButton"  @click="shared.smaller">Smaller</span></div>
  </div>
</div>
</template>

<script setup>
import { inject } from 'vue'
import "../../../assets/top.css"
import "../../../assets/room.css"

let params = inject("params")
var title = params && params.parameter1 ? params.parameter1 : "Example Control Panel"
var help = params && params.parameter2 ? params.parameter2 : "Click the buttons to switch objects or change the color of an object"
const shared = inject('shared')

</script>

<style scoped>
.fakeButton {
  color: #9803a5;
  background: #a78e06
  /* transition: color 1s; */
}

.fakeButton:hover {
  color: #a78e06;
  background: #9803a5;
}
</style>
