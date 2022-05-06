<template>
<div>
  <div id="room">
      <img xr-layer alt="Vue logo" src="../../../assets/logo.png" />
      <HelloWorld msg="Vue Component with Local Button Count" />
      <p id="edit" v-bind:class="{ upclose: shared.state.close }">
        Edit code in <code>src/apps</code> to test hot module replacement while running project as "npm run dev".
      </p>

  </div>
</div>
</template>

<script setup>
import HelloWorld from '../../../components/HelloWorld.vue'
import "../../../assets/top.css"
import "../../../assets/room.css"

import { inject } from 'vue'

const shared = inject('shared')
</script>

<style scoped>
#edit {
  color: #bea7d1;
}

#edit.upclose {
  color: #cc0a0a;
}
</style>
