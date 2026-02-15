import type { Projects } from '@/utils/supaQueries'
import { useMemoize } from '@vueuse/core'
import { projectsQuery } from '@/utils/supaQueries'

export const useProjectsStore = defineStore('projects-store', () => {
  const { setError } = useErrorStore()

  const projects = ref<Projects>([])

  const loadProjects = useMemoize(async (_key: string) => await projectsQuery)

  const validateCache = () => {
    if (projects.value?.length) {
      projectsQuery.then(({ data, error }) => {
        if (JSON.stringify(projects.value) === JSON.stringify(data)) {
          console.log('Cached and fresh data matched')
          return
        } else {
          console.log('Cached and fresh data did not match')
          loadProjects.delete('projects')
          if (!error && data) projects.value = data
        }
      })
    }
  }

  const getProjects = async () => {
    const { data, error, status } = await loadProjects('projects')
    if (error) setError({ error, customCode: status })
    if (data) projects.value = data

    validateCache()
  }

  return { projects, getProjects }
})
