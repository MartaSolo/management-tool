<script setup lang="ts">
import { usePageStore } from '@/stores/page'
import { columns } from '@/utils/tableColumns/projectsColumns'

usePageStore().pageData.title = 'Projects'

const projectsLoader = useProjectsStore()
const { projects } = storeToRefs(projectsLoader)
const { getProjects } = projectsLoader

await getProjects()
</script>

<template>
  <DataTable v-if="projects?.length" :columns="columns" :data="projects" />
</template>

<style scoped></style>
