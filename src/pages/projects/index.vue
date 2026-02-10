<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { usePageStore } from '@/stores/page'
import { projectsQuery } from '@/utils/supaQueries'
import type { ColumnDef } from '@tanstack/vue-table'
import type { Projects } from '@/utils/supaQueries'

usePageStore().pageData.title = 'Projects'

const projects = ref<Projects | null>(null)

const fetchProjects = async () => {
  const { data, error } = await projectsQuery
  if (error) console.error(error)
  projects.value = data
}

await fetchProjects()

const columns: ColumnDef<Projects[0]>[] = [
  {
    accessorKey: 'name',
    header: () => h('div', { class: 'text-left' }, 'Name'),
    cell: ({ row }) => {
      return h(
        RouterLink,
        {
          to: `projects/${row.original.slug}`,
          class: 'text-left font-medium hover:bg-muted block w-full',
        },
        () => h('span', row.getValue('name')),
      )
    },
  },
  {
    accessorKey: 'status',
    header: () => h('div', { class: 'text-left' }, 'Status'),
    cell: ({ row }) => {
      return h('div', { class: 'text-left font-medium' }, row.getValue('status'))
    },
  },
  {
    accessorKey: 'collaborators',
    header: () => h('div', { class: 'text-left' }, 'Collaborators'),
    cell: ({ row }) => {
      return h(
        'div',
        { class: 'text-left font-medium' },
        JSON.stringify(row.getValue('collaborators')),
      )
    },
  },
]
</script>

<template>
  <DataTable v-if="projects?.length" :columns="columns" :data="projects" />
</template>

<style scoped></style>
