<script setup lang="ts">
import { usePageStore } from '@/stores/page'
import { projectsQuery } from '@/utils/supaQueries'
import { columns } from '@/utils/tableColumns/projectsColumns'
import type { Projects } from '@/utils/supaQueries'

usePageStore().pageData.title = 'Projects'

const projects = ref<Projects | null>(null)

const { setError } = useErrorStore()

const fetchProjects = async () => {
  const { data, error, status } = await projectsQuery
  if (error) setError({ error, customCode: status })
  projects.value = data
}

await fetchProjects()
</script>

<template>
  <DataTable v-if="projects?.length" :columns="columns" :data="projects" />
</template>

<style scoped></style>
