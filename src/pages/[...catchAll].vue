<script setup lang="ts">
const { setError } = useErrorStore()

setError({
  error: 'Page not found',
  customCode: 404,
})
</script>

<template>
  <div></div>
</template>
