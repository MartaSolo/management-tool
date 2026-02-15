import { supabase } from '@/lib/supabaseClient'
import type { QueryData } from '@supabase/supabase-js'

// Tasks with Projects
export const tasksWithProjectsQuery = supabase.from('tasks').select('*, projects(id, name, slug)')

export type TaskWithProject = QueryData<typeof tasksWithProjectsQuery>

// Projects
export const projectsQuery = supabase.from('projects').select()

export type Projects = QueryData<typeof projectsQuery>

// Single project with tasks
export const projectQuery = (slug: string) =>
  supabase.from('projects').select('*, tasks(id, name, status, due_date)').eq('slug', slug).single()

export type Project = QueryData<ReturnType<typeof projectQuery>>

// Single task with project
export const taskQuery = (id: string) =>
  supabase.from('tasks').select('*, projects(id, name, slug)').eq('id', id).single()

export type Task = QueryData<ReturnType<typeof taskQuery>>

// profile
export const profileQuery = ({ column, value }: { column: string; value: string }) =>
  supabase.from('profiles').select('*').eq(column, value).single()

// profiles by ids
export const groupedProfilesQuery = (ids: string[]) =>
  supabase.from('profiles').select('id, username, full_name, avatar_url').in('id', ids)

export type Collabs = QueryData<ReturnType<typeof groupedProfilesQuery>>
