import { supabase } from '@/lib/supabaseClient'
import type { QueryData } from '@supabase/supabase-js'
import type { CreateNewTask } from '@/types/CreateNewForm'

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

export const updateProjectQuery = (updatedProject = {}, id: number) =>
  supabase.from('projects').update(updatedProject).eq('id', id).select()

// Single task with project
export const taskQuery = (id: string) =>
  supabase.from('tasks').select('*, projects(id, name, slug)').eq('id', id).single()

export type Task = QueryData<ReturnType<typeof taskQuery>>

export const updateTaskQuery = (updatedTask = {}, id: number) => {
  return supabase.from('tasks').update(updatedTask).eq('id', id)
}

// profile
export const profileQuery = ({ column, value }: { column: string; value: string }) =>
  supabase.from('profiles').select('*').eq(column, value).single()

export const profilesQuery = supabase.from('profiles').select('id, full_name')

// profiles by ids
export const groupedProfilesQuery = (ids: string[]) =>
  supabase.from('profiles').select('id, username, full_name, avatar_url').in('id', ids)

export type Collabs = QueryData<ReturnType<typeof groupedProfilesQuery>>

export const createNewTaskQuery = (newTask: CreateNewTask) => {
  return supabase.from('tasks').insert(newTask)
}
