import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { UserProps, users } from '@/data'
import { $cookies } from '~/utils/nuxt-instance'

@Module({ name: 'users', stateFactory: true, namespaced: true })
export default class Users extends VuexModule {
  private users = [] as UserProps[]
  private user = {} as UserProps
  private userLogged = {} as UserProps

  public get $single() {
    return this.user
  }

  public get $loggedUser() {
    return this.userLogged
  }

  public get $all() {
    return this.users
  }

  @Mutation
  private SET_SINGLE(data: UserProps) {
    this.user = data
  }

  @Mutation
  private SET_LOGGED_USER(data: UserProps) {
    this.userLogged = data
  }

  @Mutation
  private SET_ALL(data: UserProps[]) {
    this.users = data
  }

  @Action
  public index() {
    this.context.commit('SET_ALL', users)
  }

  @Action
  public create(data: UserProps) {
    this.context.commit('SET_SINGLE', data)
  }

  @Action
  public update(data: UserProps) {
    this.context.commit('SET_SINGLE', data)
  }

  @Action
  public destroy(id: number) {
    console.log(id)
    this.context.commit('SET_SINGLE', null)
  }

  @Action
  public verify() {
    // se não tiver um token então sair fora
    if (!$cookies.get('token')) {
      this.context.commit('SET_LOGGED_USER', null)

      return
    }

    const userData = $cookies.get('user')

    this.context.commit('SET_LOGGED_USER', userData)
  }
}
