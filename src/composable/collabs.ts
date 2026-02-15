import { groupedProfilesQuery } from '@/utils/supaQueries'
import type { Collabs, Projects, TaskWithProject } from '@/utils/supaQueries'
import type { GroupedCollabs } from '@/types/groupedCollabs'

export const useCollabs = () => {
  const groupedCollabs = ref<GroupedCollabs>({})

  const getProfilesByIds = async (userIds: string[]) => {
    const { data, error } = await groupedProfilesQuery(userIds)
    if (error || !data) return []
    return data
  }

  const getGroupedCollabs = async (items: Projects | TaskWithProject) => {
    const filteredItems = items.filter((item) => item.collaborators.length)

    const promises = filteredItems.map((item) => getProfilesByIds(item.collaborators))

    const result = await Promise.all(promises)

    filteredItems.forEach((item, index) => {
      groupedCollabs.value[item.id] = result[index] as Collabs
    })
  }

  return {
    getProfilesByIds,
    getGroupedCollabs,
    groupedCollabs,
  }
}
