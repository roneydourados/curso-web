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
      <v-card-title>Editar projeto</v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field v-model="projectName" label="Nome" />
          <v-text-field v-model="projectSubtitle" label="Subtitulo" />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn text color="primary">Salvar</v-btn>
        <v-btn text color="error" @click="$emit('close')">cancelar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'

import { ProjectProps } from '@/data'

export default Vue.extend({
  props: {
    show: { type: Boolean, default: false },
    project: { type: Object, required: true } as PropOptions<ProjectProps>,
  },

  data: () => ({
    projectName: '',
    projectSubtitle: '',
  }),

  watch: {
    show() {
      this.projectName = this.project.projectName!
      this.projectSubtitle = this.project.projectSubTitle!
    },
  },
})
</script>
