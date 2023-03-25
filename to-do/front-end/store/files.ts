import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { FilesProps } from '@/data'
import { $axios } from '@/utils/nuxt-instance'

interface fileIndexProps {
  projectId: number
  type: string
}

@Module({ name: 'files', stateFactory: true, namespaced: true })
export default class Files extends VuexModule {
  private files = [] as FilesProps[]
  private file = {} as FilesProps

  public get $single() {
    return this.file
  }

  public get $all() {
    return this.files
  }

  @Mutation
  private SET_SINGLE(data: FilesProps) {
    this.file = data
  }

  @Mutation
  private SET_ALL(data: FilesProps[]) {
    this.files = data
  }

  @Action
  public async index({ projectId, type }: fileIndexProps) {
    const config = {
      params: {
        projectId,
        type,
      },
    }

    const resp = await $axios.$get('/files', config)

    this.context.commit('SET_ALL', resp)
  }

  @Action
  public async create({ file, ownerId, type }: FilesProps) {
    const fileData = new FormData()

    fileData.append('file', file!)
    fileData.append('ownerId', ownerId!.toString())
    fileData.append('type', type!)

    await $axios.$post('/files', fileData)
  }

  @Action
  public async destroy(file: FilesProps) {
    await $axios.$delete(`/files/${file.id}`)
  }

  @Action
  public async downFile(file: FilesProps) {
    await $axios({
      url: file.url!,
      method: 'GET',
      responseType: 'blob',
    }).then((response) => {
      const fileURL = window.URL.createObjectURL(new Blob([response.data]))
      const fileLink = document.createElement('a')

      fileLink.href = fileURL
      fileLink.setAttribute('download', `${file.attachementName}`)
      document.body.appendChild(fileLink)

      fileLink.click()
    })
  }
}
