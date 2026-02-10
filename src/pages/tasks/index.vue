<script setup lang="ts">
import { tasksWithProjectsQuery } from '@/utils/supaQueries'
import { columns } from '@/utils/tableColumns/tasksColumns'
import type { TaskWithProject } from '@/utils/supaQueries'

usePageStore().pageData.title = 'My Tasks'

const tasks = ref<TaskWithProject | null>(null)

const getTasks = async () => {
  const { data, error } = await tasksWithProjectsQuery
  if (error) console.error(error)
  tasks.value = data
}

await getTasks()
</script>

<template>
  <DataTable v-if="tasks?.length" :columns="columns" :data="tasks" />
</template>

<style scoped></style>
