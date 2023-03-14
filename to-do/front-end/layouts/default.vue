<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <!--<v-app-bar-nav-icon @click.stop="drawer = !drawer" />-->
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>

      <!--
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      -->

      <v-toolbar-title class="d-flex align-center">
        <v-icon class="mr-2">mdi-file-sign</v-icon>
        <span>
          {{ title }}
        </span>
      </v-toolbar-title>
      <v-spacer />

      <div class="d-flex align-center" style="gap: 1rem; width: 30rem">
        <v-tooltip bottom color="grey darken-3">
          <template #activator="{ on, attrs }">
            <v-btn
              fab
              small
              color="grey darken-3"
              v-bind="attrs"
              v-on="on"
              @click="dialogNew = true"
            >
              <v-icon color="white">mdi-plus</v-icon>
            </v-btn>
          </template>
          <span>Novo Projeto</span>
        </v-tooltip>

        <v-text-field
          v-model="search"
          placeholder="Pesquisar..."
          filled
          rounded
          dense
          class="mt-6"
          @input="filterProject"
        />
      </div>

      <div class="ml-8">
        <h3>Olá, {{ $user }}</h3>
      </div>
      <v-spacer />

      <v-tooltip bottom>
        <template #activator="{ on, attrs }">
          <v-btn
            icon
            rounded
            v-bind="attrs"
            v-on="on"
            @click="setTheme(!$vuetify.theme.dark)"
          >
            <v-icon
              :color="$vuetify.theme.dark ? 'grey lighten-2' : 'grey darken-4'"
            >
              {{
                $vuetify.theme.dark ? 'mdi-brightness-6' : 'mdi-brightness-4'
              }}
            </v-icon>
          </v-btn>
        </template>
        <span>Alterar tema Light/Dark</span>
      </v-tooltip>

      <v-tooltip bottom>
        <template #activator="{ on, attrs }">
          <v-btn
            icon
            rounded
            class="mr-6"
            v-bind="attrs"
            v-on="on"
            @click="logout"
          >
            <v-icon
              :color="$vuetify.theme.dark ? 'grey lighten-2' : 'grey darken-4'"
            >
              mdi-logout
            </v-icon>
          </v-btn>
        </template>
        <span>Logout</span>
      </v-tooltip>
      <!--
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      -->
    </v-app-bar>
    <v-main style="margin: 0 auto">
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>

    <!--
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light> mdi-repeat </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    -->
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>

    <NewProject :show="dialogNew" @close="dialogNew = false" />
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'

import { auth, theme, users, projects } from '@/store'

export default Vue.extend({
  middleware: 'auth',
  data: () => ({
    dialogNew: false,
    clipped: false,
    drawer: true,
    fixed: false,
    search: '',

    items: [
      {
        icon: 'mdi-projector-screen-outline',
        title: 'Dashboard',
        to: '/dashboard',
      },
      {
        icon: 'mdi-account-supervisor-outline',
        title: 'Usuários',
        to: '/users',
      },
    ],
    miniVariant: false,
    right: true,
    rightDrawer: false,
    title: 'Projetos',
  }),

  computed: {
    $user() {
      return users.$loggedUser ? users.$loggedUser?.name : ''
    },
  },

  mounted() {
    this.$vuetify.theme.dark = theme.$single
  },

  methods: {
    setTheme(darkMode: boolean) {
      this.$vuetify.theme.dark = darkMode

      theme.setTheme(darkMode)
    },

    async logout() {
      await this.$router.push('/')

      auth.destroy()
    },

    filterProject() {
      projects.index(this.search)
    },
  },
})
</script>
