import { supabase } from '@/lib/supabaseClient'
import type { QueryData } from '@supabase/supabase-js'

// Tasks with Projects
export const tasksWithProjectsQuery = supabase.from('tasks').select('*, projects(id, name, slug)')

export type TaskWithProject = QueryData<typeof tasksWithProjectsQuery>

// Projects
export const projectsQuery = supabase.from('projects').select()

export type Projects = QueryData<typeof projectsQuery>
