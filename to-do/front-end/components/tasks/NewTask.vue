<template>
  <v-dialog
    :value="show"
    retain-focus
    persistent
    overlay-color="#121212"
    max-width="600px"
  >
    <v-card>
      <v-card-title>Nova tarefa</v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field v-model="title" label="Título" />
          <v-textarea v-model="content" label="Conteúdo" />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn text color="primary" @click="create">salvar</v-btn>
        <v-btn text color="error" @click="$emit('close')">cancelar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { tasks } from '@/store'
import { ProjectProps } from '@/data'

export default Vue.extend({
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    project: {
      type: Object,
      required: true,
    } as PropOptions<ProjectProps>,
  },
  data: () => ({
    title: '',
    content: '',
  }),
  methods: {
    async create() {
      const taskData = {
        title: this.title,
        content: this.content,
        projectId: this.project.id,
        userId: 1,
      }

      await tasks.create(taskData)

      this.title = ''
      this.content = ''

      await tasks.index(this.project.id!.toString())

      this.$emit('close')
    },
  },
})
</script>
