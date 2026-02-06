<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute('/projects/[slug]')
const slug = computed(() => route.params?.slug as string)
</script>

<template>
  <h1>Project slug:</h1>
  <h1>{{ slug }}</h1>
</template>
