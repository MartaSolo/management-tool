<script setup lang="ts">
import { tasksWithProjectsQuery } from '@/utils/supaQueries'
import { columns } from '@/utils/tableColumns/tasksColumns'
import type { TaskWithProject } from '@/utils/supaQueries'

usePageStore().pageData.title = 'My Tasks'

const { setError } = useErrorStore()

const tasks = ref<TaskWithProject | null>(null)

const getTasks = async () => {
  const { data, error, status } = await tasksWithProjectsQuery
  if (error) setError({ error, customCode: status })
  tasks.value = data
}

await getTasks()
</script>

<template>
  <DataTable v-if="tasks?.length" :columns="columns" :data="tasks" />
</template>

<style scoped></style>
