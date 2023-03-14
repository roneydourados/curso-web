import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { $cookies } from '@/utils/nuxt-instance'

@Module({ name: 'theme', stateFactory: true, namespaced: true })
export default class Theme extends VuexModule {
  private darkMode = false

  public get $single() {
    return this.darkMode
  }

  @Mutation
  private SET_SINGLE(data: boolean) {
    this.darkMode = data
  }

  @Action
  public setTheme(darkMode: boolean) {
    $cookies.set('theme', darkMode, { maxAge: 60 * 60 * 24 * 300000 })

    this.context.commit('SET_SINGLE', darkMode)
  }

  @Action
  public getTheme() {
    const darkMode = $cookies.get('theme')

    this.context.commit('SET_SINGLE', darkMode || false)
  }
}
