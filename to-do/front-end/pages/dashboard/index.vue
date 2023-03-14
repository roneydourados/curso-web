<template>
  <ProjectList />
</template>

<script lang="ts">
import Vue from 'vue'

import { projects } from '@/store'

export default Vue.extend({
  async asyncData({ error }) {
    try {
      await projects.index('')
    } catch {
      return error({ statusCode: 404 })
    }
  },
})
</script>
