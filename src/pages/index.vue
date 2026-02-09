<script setup lang="ts">
import { usePageStore } from '@/stores/page'

usePageStore().pageData.title = 'Homepage'
</script>

<template>
  <div>
    <div>Homepage content</div>
  </div>
</template>

<style scoped></style>
