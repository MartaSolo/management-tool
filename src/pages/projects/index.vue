<script setup lang="ts">
import { supabase } from '@/lib/supabaseClient'
import type { Tables } from '../../../database/types'
import { ref } from 'vue'

const projects = ref<Tables<'projects'>[] | null>(null)

;(async () => {
  const { data, error } = await supabase.from('projects').select()
  if (error) console.error(error)
  projects.value = data
})()
</script>

<template>
  <h1>Projects Page</h1>
  <RouterLink to="/">Home Page</RouterLink>
  <ul>
    <li v-for="project in projects" :key="project.id">
      <RouterLink :to="{ name: '/projects/[id]', params: { id: project.id } }">
        {{ project.name }}
      </RouterLink>
    </li>
  </ul>
</template>

<style scoped></style>
