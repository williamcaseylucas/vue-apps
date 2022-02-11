<template>
  <h1 xr-layer class="fade">{{ msg }}</h1>
  <p>
    Here's some more text just to make things not blank.
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
  color: #a78e06;
}
</style>
