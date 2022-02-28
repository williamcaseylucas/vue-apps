<template>
  <div> 
  <div id="room">
  <div class="spacer">
<Title v-bind:msg="title" />
<br><br>
  <a href="{{link}}"></a>
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
var link = params && params.parameter2 ? params.parameter2 : "www.google.com"

</script>

<style scoped>

</style>
