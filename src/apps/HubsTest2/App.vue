<template>
  <div id="top">
      <img alt="Vue logo" src="../../assets/logo.png" />
      <HelloWorld msg="Vue Component with Local Button Count" />
      <p id="edit" v-bind:class="{ upclose: shared.state.close }" xr-layer>
        Edit code in <code>src/apps</code> to test hot module replacement while running project as "npm run dev".
      </p>

  </div>
</template>

<script setup>
import HelloWorld from '../../components/HelloWorld.vue'
import "../../assets/top.css"

import { inject } from 'vue'

const shared = inject('shared')
</script>

<style scoped>
#edit {
  color: #000000;
}

#edit.upclose {
  color: #c00303;
}
</style>
