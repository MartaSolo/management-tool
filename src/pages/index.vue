<script setup lang="ts">

</script>

<template>
  <h1>Home Page</h1>
  <RouterLink :to="{ name: '/projects/[id]', params: { id: 1 } }">Project 1 Page</RouterLink>
</template>

<style scoped></style>
