<template>
  <div> 
  <div id="room" class="darkwall" :style="color">
<!--<Title v-bind:msg="title" />-->
	<div class="squareoff titleStyle ">{{ title }}</div> 
  </div>
  </div> 
</template>

<script setup>
import { inject } from 'vue'


import Title from '../../components/CenterTitle.vue'

import "../../assets/top.css"
import "../../assets/room.css"


let params = inject("params")
var title = params && params.text ? params.text : "Text not set for GraphLabel"
var color = params && params.color ? "color: " + params.color + ";" : "color: red;"
</script>

<style scoped>

</style>
