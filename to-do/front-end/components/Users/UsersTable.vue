<template>
  <v-card rounded="xl" class="pa-6" width="900">
    <v-card-title class="d-flex justify-space-between">
      <span> Cadastro de usuários</span>
      <v-tooltip bottom color="blue">
        <template #activator="{ on, attrs }">
          <v-btn
            fab
            small
            color="blue"
            v-bind="on"
            v-on="attrs"
            @click="dialogNewUser = true"
          >
            <v-icon color="white">mdi-plus</v-icon>
          </v-btn>
        </template>
        <span>Novo usuário</span>
      </v-tooltip>
    </v-card-title>

    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="$users"
        :items-per-page="15"
        :search="search"
        no-data-text="sem dados!"
      >
        <template #top>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Pesquisar"
            single-line
            hide-details=""
          />
        </template>

        <template #[`item.actions`]="{ item }">
          <v-btn icon @click="editUser(item)">
            <v-icon color="deep-purple">mdi-pencil-outline</v-icon>
          </v-btn>

          <v-btn icon @click="deleteUser(item)">
            <v-icon color="red">mdi-delete-outline</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card-text>
    <NewUser :show="dialogNewUser" @close="dialogNewUser = false" />
    <EditUser
      :show="dialogEditUser"
      :user="userEdit"
      @close="dialogEditUser = false"
    />
    <DeleteUser
      :show="dialogDeleteUser"
      :user="userEdit"
      @close="dialogDeleteUser = false"
    />
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'

import { users, UserProps } from '@/data'

export default Vue.extend({
  data: () => ({
    dialogNewUser: false,
    dialogEditUser: false,
    dialogDeleteUser: false,
    search: '',
    userEdit: {} as UserProps,
    headers: [
      {
        text: 'Nome',
        align: 'start',
        value: 'name',
      },
      {
        text: 'Email',
        align: 'start',
        value: 'email',
      },

      {
        text: 'Ações',
        value: 'actions',
        sotrtable: false,
      },
    ],
  }),

  computed: {
    $users() {
      return users
    },
  },

  methods: {
    editUser(user: UserProps) {
      this.userEdit = Object.assign({}, user)
      this.dialogEditUser = true
    },

    deleteUser(user: UserProps) {
      this.userEdit = Object.assign({}, user)
      this.dialogDeleteUser = true
    },
  },
})
</script>
