<template>
  <v-dialog
    :value="show"
    retain-focus
    persistent
    overlay-color="#121212"
    max-width="600px"
    @input="$emit('close')"
  >
    <v-card class="pa-6" rounded="xl">
      <v-card-title> Apagar tarefa Nº: {{ task.id }} ? </v-card-title>

      <v-card-actions>
        <v-btn text color="primary" @click="destroy">Apagar</v-btn>
        <v-btn text color="error" @click="cancel">cancelar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { TasksProps } from '@/data'
import { tasks } from '@/store'

export default Vue.extend({
  props: {
    show: { type: Boolean, default: false },
    task: { type: Object, required: true } as PropOptions<TasksProps>,
  },

  methods: {
    cancel() {
      this.$emit('close')
    },

    async destroy() {
      await tasks.destroy(this.task.id!)
      await tasks.index(this.task.projectId!.toString())
      this.$emit('close')
    },
  },
})
</script>
