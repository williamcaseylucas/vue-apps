<template>
  <span class="fade"><h1>{{ msg }}</h1></span>
  <p>
    <span><a href="https://vitejs.dev/guide/features.html" target="_blank">
      Vite Documentation and Then Some! 
    </a></span>
    <span><a href="https://v3.vuejs.org/" target="_blank">Vue 3 Documentation</a></span>
  </p>

  <button xr-layer @click="shared.increment">count is: {{ shared.state.count }}</button>
</template>

<script setup>
import { inject } from 'vue'

defineProps({
  msg: String
})

const shared = inject('shared')
</script>

<style scoped>
a {
  color: #b542b9;
}

button {
  width: 150px;
}

.fade {
  color: #9803a5;
  /* transition: color 1s; */
}

.fade:hover {
  color: #06a71b;
}
</style>

