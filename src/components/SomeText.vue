<template>
  <h1>{{ msg }}</h1>
  <p>
    Here's some more text just to make things not blank.
  </p>

  <button @click="state.count++">count is: {{ state.count }}</button>
</template>

<script setup>
import { defineProps, reactive } from 'vue'

defineProps({
  msg: String
})

const state = reactive({ count: 0 })
</script>

<style scoped>
a {
  color: #b542b9;
}
</style>
