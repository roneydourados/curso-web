/* eslint-disable import/no-mutable-exports */
import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'

import Files from '@/store/files'
import Projects from '@/store/projects'
import Tasks from '@/store/tasks'
import Users from '@/store/users'
import Theme from '@/store/theme'
import Auth from '@/store/auth'

let files: Files
let projects: Projects
let tasks: Tasks
let users: Users
let theme: Theme
let auth: Auth

function initializeStores(store: Store<any>): void {
  files = getModule(Files, store)
  projects = getModule(Projects, store)
  tasks = getModule(Tasks, store)
  users = getModule(Users, store)
  theme = getModule(Theme, store)
  auth = getModule(Auth, store)
}

export { initializeStores, files, projects, tasks, users, theme, auth }
