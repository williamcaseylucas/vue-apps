<template>
<div>
  <div id="room" >
    <div class="titleStyle">{{ title }}</div>

    <div>{{ help }}</div>

    <div></div>
    <div><span xr-layer @click="linkClick"><a href="https://blairmacintyre.me">Click</a></span> to swap objects: <button xr-layer @click="shared.nextObject">Swap Objects</button></div>
    <div>Current object is: {{ shared.getName() }}</div>

    <div></div>    
    
    <div>Click to make larger: <span xr-layer class="fakeButton"  @click="shared.larger">Larger</span></div>
    <div>Click to make smaller: <span xr-layer class="fakeButton"  @click="shared.smaller">Smaller</span></div>
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

const linkClick = inject('linkClick')
</script>

<style scoped>

button {
    width: 120px;
    color: -internal-light-dark(black, white);
    text-indent: 0px;
    text-align: center;
    background-color: -internal-light-dark(rgb(239, 239, 239), rgb(59, 59, 59));
    margin: 0em;
    border-color: -internal-light-dark(rgb(118, 118, 118), rgb(133, 133, 133));
    border-radius: 2px;
}
  
.fakeButton {
  color: #9803a5;
  background: #a78e06;
  /* transition: color 1s; */
}

.fakeButton:hover {
  color: #a78e06;
  background: #9803a5;
}
</style>
