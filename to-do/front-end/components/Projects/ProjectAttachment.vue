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
      <v-card-title>
        <span>Anexos</span>
        <v-spacer />
        <v-btn text color="green" @click="$refs.uploader.click()">
          <v-icon>mdi-attachment</v-icon>
          novo anexo
        </v-btn>
        <input
          ref="uploader"
          type="file"
          class="d-none"
          accept=".jpg,.jpeg,.png,.pdf,.pdf,.xlsx,.docx,.txt"
          @input="sendFile"
        />
      </v-card-title>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="$files"
          :items-per-page="15"
          no-data-text="sem dados!"
        >
          <template #[`item.actions`]="{ item }">
            <v-btn icon @click="destroy(item)">
              <v-icon color="red">mdi-delete-outline</v-icon>
            </v-btn>

            <v-btn icon @click="downFile(item)">
              <v-icon color="green">mdi-file</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-card-text>
      <v-card-actions>
        <v-btn text color="error" @click="$emit('close')">fechar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import { files, projects } from '@/store'
import { FilesProps } from '~/data'

export default Vue.extend({
  props: {
    show: { type: Boolean, default: false },
    projectId: { type: Number, default: 0 },
  },

  data: () => ({
    headers: [
      {
        text: 'Arquivo',
        align: 'start',
        value: 'attachementName',
      },
      { text: 'Ações', value: 'actions', sortable: false },
    ],
  }),

  computed: {
    $files() {
      return files.$all
    },
  },

  methods: {
    async sendFile(event: any) {
      const file = event.target.files[0] as File

      await files.create({ file, ownerId: this.projectId, type: 'project' })
      await files.index({ projectId: this.projectId, type: 'project' })
      await projects.index('')
    },

    async downFile(file: FilesProps) {
      await files.downFile(file)
    },

    async destroy(file: FilesProps) {
      await files.destroy(file)
      await files.index({ projectId: this.projectId, type: 'project' })
      await projects.index('')
    },
  },
})
</script>
