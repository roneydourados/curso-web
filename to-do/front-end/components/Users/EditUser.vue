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
      <v-card-title> Editar usuário </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field
            v-model="name"
            label="Nome"
            placeholder="Digite seu nome"
          />
          <v-text-field
            v-model="email"
            label="Email"
            placeholder="Digite seu email"
          />

          <v-text-field
            v-model="password"
            type="password"
            label="Senha"
            placeholder="Digite sua senha"
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn text color="primary">Salvar</v-btn>
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

  data: () => ({
    name: '',
    email: '',
    password: '',
  }),

  watch: {
    user() {
      this.name = this.user.name!
      this.email = this.user.email!
    },
  },

  methods: {
    cancel() {
      this.$emit('close')
      this.name = ''
      this.email = ''
      this.password = ''
    },
  },
})
</script>
