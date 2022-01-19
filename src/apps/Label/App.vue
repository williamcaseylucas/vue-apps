<template>
  <div> 
  <div id="room" class="darkwall">
  <div class="spacer-side">
  <br>
<!--<Title v-bind:msg="title" />-->
	<div class="squareoff labelTitle ">{{ title }}</div> 
	<div class="squareoff">{{ body }}</div> 
<br>
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
var title = params && params.parameter1 ? params.parameter1 : " "
var body = params && params.parameter2 ? params.parameter2 : " "

</script>

<style scoped>

</style>
