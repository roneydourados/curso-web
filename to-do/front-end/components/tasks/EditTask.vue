<template>
  <v-dialog
    :value="show"
    retain-focus
    persistent
    overlay-color="#121212"
    max-width="600px"
  >
    <v-card>
      <v-card-title>Editando tarefa Nº: {{ task.id }}</v-card-title>
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
import { TasksProps } from '@/data'
import { tasks } from '@/store'

export default Vue.extend({
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    task: {
      type: Object,
      required: true,
    } as PropOptions<TasksProps>,
  },
  data: () => ({
    title: '',
    content: '',
  }),
  watch: {
    show() {
      this.title = this.task.title!
      this.content = this.task.content!
    },
  },
  methods: {
    async create() {
      const taskData = {
        id: this.task.id,
        title: this.title,
        content: this.content,
        projectId: this.task.projectId,
        userId: 1,
      }

      await tasks.update(taskData)

      this.title = ''
      this.content = ''

      await tasks.index(this.task.projectId!.toString())

      this.$emit('close')
    },
  },
})
</script>

<style scoped></style>
