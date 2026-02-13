import type { Session, User } from '@supabase/supabase-js'
import type { Tables } from '../../database/types'
import { profileQuery } from '@/utils/supaQueries'
import { supabase } from '@/lib/supabaseClient'

export const useAuthStore = defineStore('auth-state', () => {
  const user = ref<User | null>(null)
  const profile = ref<Tables<'profiles'> | null>(null)
  const isTrackingAuthChanges = ref(false)

  const setProfile = async () => {
    if (!user.value) {
      profile.value = null
      return
    }

    if (!profile.value || profile.value.id !== user.value.id) {
      const { data, error } = await profileQuery(user.value.id)
      if (error) return console.error(error)
      profile.value = data || null
    }
  }

  const setAuth = async (userSession: Session | null = null) => {
    if (!userSession) {
      user.value = null
      profile.value = null
      return
    }

    user.value = userSession.user
    await setProfile()
  }

  const getSession = async () => {
    const { data, error } = await supabase.auth.getSession()
    if (error) return console.error(error)
    if (data.session?.user) await setAuth(data.session)
  }

  const trackAuthChanges = () => {
    if (isTrackingAuthChanges.value) return

    isTrackingAuthChanges.value = true
    supabase.auth.onAuthStateChange((event, session) => {
      setTimeout(async () => {
        await setAuth(session)
      }, 0)
    })
  }

  return {
    user,
    profile,
    setAuth,
    setProfile,
    getSession,
    trackAuthChanges,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
