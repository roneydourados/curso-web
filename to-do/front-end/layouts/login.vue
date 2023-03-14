<template>
  <v-app dark>
    <v-app-bar fixed app elevation="0">
      <v-toolbar-title class="d-flex align-center">
        <v-icon class="mr-2">mdi-file-sign</v-icon>
        <span>
          {{ title }}
        </span>
      </v-toolbar-title>
      <v-spacer />
      <v-tooltip bottom color="grey darken-3">
        <template #activator="{ on, attrs }">
          <v-btn
            rounded
            icon
            v-bind="attrs"
            v-on="on"
            @click.stop="setTheme(!$vuetify.theme.dark)"
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
    </v-app-bar>
    <v-main style="margin: 0 auto" class="d-flex align-center">
      <v-container fluid>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import { theme } from '@/store'

export default Vue.extend({
  middleware: 'guest',

  data: () => ({
    title: 'Projetos',
  }),

  mounted() {
    this.$vuetify.theme.dark = theme.$single
  },

  methods: {
    setTheme(darkMode: boolean) {
      this.$vuetify.theme.dark = darkMode

      theme.setTheme(darkMode)
    },
  },
})
</script>

<style scoped></style>
