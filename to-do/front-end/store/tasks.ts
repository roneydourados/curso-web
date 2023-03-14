import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'

import { TasksProps } from '@/data'

import { $axios } from '@/utils/nuxt-instance'

@Module({ name: 'tasks', stateFactory: true, namespaced: true })
export default class Tasks extends VuexModule {
  private tasks = [] as TasksProps[]
  private task = {} as TasksProps

  public get $all() {
    return this.tasks
  }

  public get $single() {
    return this.task
  }

  @Mutation
  private SET_ALL(data: TasksProps[]) {
    this.tasks = data
  }

  @Mutation
  private SET_SINGLE(data: TasksProps) {
    this.task = data
  }

  @Action
  public async index(projectId: string) {
    const config = {
      params: {
        projectId,
      },
    }

    const resp = await $axios.$get('/tasks', config)

    this.context.commit('SET_ALL', resp)
  }

  @Action
  public async create(payload: TasksProps) {
    const resp = await $axios.$post('/tasks', payload)

    this.context.commit('SET_SINGLE', resp)
  }

  @Action
  public async update(payload: TasksProps) {
    const resp = await $axios.$put(`/tasks/${payload.id}`, payload)

    this.context.commit('SET_SINGLE', resp)
  }

  @Action
  public async destroy(id: number) {
    await $axios.$delete(`/tasks/${id}`)

    this.context.commit('SET_SINGLE', null)
  }
}
