<template>
  <div> 
  <div id="room">
  <div class="spacer">
<Title v-bind:msg="title" />
<br><br>
	<div class="squareoff">Standing on the Audio Pads will {{ body }}</div> 
  </div>
  </div>
  </div> 
</template>

<script setup>
import { inject } from 'vue'


import Title from '../../components/CenterTitle.vue'

import "../../assets/top.css"
import "../../assets/room.css"


let params = inject("params")
var title = params && params.parameter1 ? params.parameter1 : "How to Use the Audio Pads"
var body = params && params.parameter2 ? params.parameter2 : "start the narrations about the room you are currently in"

</script>

<style scoped>

</style>
