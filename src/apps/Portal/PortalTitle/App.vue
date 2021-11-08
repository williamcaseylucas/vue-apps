<template>
  <div id="room" class="darkwall">
  <Title v-bind:msg="mesg" />
  </div>
</template>

<script setup>
import { inject } from 'vue'
import Title from '../../../components/CenterTitle.vue'

import "../../../assets/top.css"
import "../../../assets/room.css"

let params = inject("params")
var mesg = params && params.message ? params.message : "PORTAL TITLE"
</script>
