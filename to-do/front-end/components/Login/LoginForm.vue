<template>
  <v-card rounded="xl" class="pa-8" min-width="500">
    <v-card-title>Faça seu login</v-card-title>
    <v-card-text>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        @submit.prevent="sigIn"
      >
        <v-text-field
          v-model="email"
          placeholder="seuemail@gmail.com"
          type="email"
          label="Email"
          :rules="[
            (value) => {
              const emailRegex =
                /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi

              const validEmail = emailRegex.test(value)

              if (!validEmail) {
                return 'Email inválido!'
              }

              return true
            },
          ]"
        />

        <v-text-field
          v-model="password"
          placeholder="digite sua senha"
          type="password"
          label="Senha"
          :rules="[
            (value) => {
              if (String(value).length < 6) {
                return 'A senha dev conter pelo menos 6 dígitos'
              }

              return true
            },
          ]"
        />

        <v-btn color="success" type="submit" class="mt-8">
          <v-icon>mdi-login</v-icon>
          acessar
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'

import { VForm } from '@/modules'
import { auth, users } from '@/store'

export default Vue.extend({
  data: () => ({
    valid: true,
    email: '',
    password: '',
  }),

  computed: {
    form(): VForm {
      return this.$refs.form as VForm
    },
  },

  methods: {
    async sigIn() {
      if (!this.form.validate()) return

      auth.create({ email: this.email, password: this.password })
      users.verify()
      this.form.resetValidation()

      if (!users.$loggedUser) {
        alert('Usuário e senha inválidos!')
        return
      }

      await this.$router.push('/dashboard')
    },
  },
})
</script>
