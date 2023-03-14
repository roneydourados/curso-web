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
      <v-card-title> Apagar {{ user.name }} ? </v-card-title>

      <v-card-actions>
        <v-btn text color="primary">Apagar</v-btn>
        <v-btn text color="error" @click="cancel">cancelar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'

import { UserProps } from '@/data'

export default Vue.extend({
  props: {
    show: { type: Boolean, default: false },
    user: { type: Object, required: true } as PropOptions<UserProps>,
  },

  methods: {
    cancel() {
      this.$emit('close')
    },
  },
})
</script>
