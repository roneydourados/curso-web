<template>
  <TasksList :project="$project" />
</template>

<script lang="ts">
import Vue from 'vue'

import { projects, tasks } from '@/store'

export default Vue.extend({
  async asyncData({ error, route }) {
    try {
      const id = route.params.id as string

      await tasks.index(id)
    } catch {
      return error({ statusCode: 404 })
    }
  },

  computed: {
    $project() {
      return projects.$single
    },
  },
})
</script>
