import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'

import { FilesProps, files } from '@/data'

@Module({ name: 'files', stateFactory: true, namespaced: true })
export default class Files extends VuexModule {
  private files = [] as FilesProps[]
  private file = {} as FilesProps

  public get $all() {
    return this.files
  }

  public get $single() {
    return this.file
  }

  @Mutation
  private SET_ALL(data: FilesProps[]) {
    this.files = data
  }

  @Mutation
  private SET_SINGLE(data: FilesProps) {
    this.file = data
  }

  @Action
  public index(projectId: string) {
    // eslint-disable-next-line array-callback-return
    const filterFiles = files.filter((file) => {
      if (file.ownerId === Number(projectId)) {
        return file
      }
    })

    this.context.commit('SET_ALL', filterFiles)
  }

  @Action
  public create(payload: FilesProps) {
    this.context.commit('SET_SINGLE', payload)
  }

  @Action
  public update(payload: FilesProps) {
    this.context.commit('SET_SINGLE', payload)
  }

  @Action
  public destroy(id: number) {
    console.log(id)

    this.context.commit('SET_SINGLE', null)
  }
}
