<template>
  <v-container class="d-flex flex-wrap" style="gap: 1rem; width: 100%" fluid>
    <div v-for="project in $projects" :key="project.id">
      <CardProject :project="project" />
    </div>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'

import { projects } from '@/store'

export default Vue.extend({
  computed: {
    $projects() {
      return projects.$all
    },
  },
})
</script>
