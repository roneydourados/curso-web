import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { ProjectProps } from '@/data'

import { $axios } from '@/utils/nuxt-instance'

@Module({ name: 'projects', stateFactory: true, namespaced: true })
export default class Projects extends VuexModule {
  private projects = [] as ProjectProps[]
  private project = {} as ProjectProps

  public get $single() {
    return this.project
  }

  public get $all() {
    return this.projects
  }

  @Mutation
  private SET_SINGLE(data: ProjectProps) {
    this.project = data
  }

  @Mutation
  private SET_ALL(data: ProjectProps[]) {
    this.projects = data
  }

  @Action
  public async index(projectName: string) {
    const config = {
      params: {
        projectName,
      },
    }

    const resp = await $axios.$get('/projects', config)

    this.context.commit('SET_ALL', resp)
  }

  @Action
  public async create(data: ProjectProps) {
    const resp = await $axios.$post('/projects', data)

    this.context.commit('SET_SINGLE', resp)
  }

  @Action
  public async show(id: number) {
    const resp = await $axios.$get(`/projects/${id}`)

    this.context.commit('SET_SINGLE', resp)
  }

  @Action
  public async update(data: ProjectProps) {
    const resp = await $axios.$put(`/projects/${data.id}`, data)

    this.context.commit('SET_SINGLE', resp)
  }

  @Action
  public async destroy(id: number) {
    await $axios.$delete(`/projects/${id}`)

    this.context.commit('SET_SINGLE', null)
  }
}
