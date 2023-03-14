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
          accept=".jpg,.jpeg,.png,.pdf"
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
            <v-btn icon @click="deleteAttachment(item)">
              <v-icon color="red">mdi-delete-outline</v-icon>
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
import { files } from '@/store'
import { FilesProps } from '@/data'

export default Vue.extend({
  props: {
    show: { type: Boolean, default: false },
  },

  data: () => ({
    headers: [
      {
        text: 'Arquivo',
        align: 'start',
        value: 'fileName',
      },
      { text: 'Ações', value: 'actions', sortable: false },
    ],
  }),

  computed: {
    $files() {
      console.log(files.$all)
      return files.$all
    },
  },

  methods: {
    deleteAttachment(item: FilesProps) {
      console.log('🚀 ~ file: ProjectAttachment.vue ~ line 75 ~ item', item)
    },
  },
})
</script>
