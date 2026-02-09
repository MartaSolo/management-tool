<script setup lang="ts">
const route = useRoute('/tasks/[id]')
</script>

<template>
  <h1>Task {{ route.params.id }}</h1>
</template>

<style scoped></style>
