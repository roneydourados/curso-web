<template>
  <v-card rounded="xl" width="380" height="230">
    <v-card-title class="d-flex align-center justify-space-between">
      <div>
        <strong style="font-size: 0.9rem">
          {{ project.projectName }}
        </strong>
        <p
          class="text-truncate"
          style="
            color: #bdbdbd;
            font-size: 0.7rem;
            margin-top: -0.8rem;
            width: 19rem;
          "
        >
          {{ project.projectSubTitle }}
        </p>
      </div>

      <v-menu offset-y rounded="lg">
        <template #activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical-circle-outline</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item>
            <v-list-item-title>
              <v-btn
                text
                class="d-flex align-center pa-4"
                color="red"
                @click="deleteProject"
              >
                <v-icon>mdi-delete-outline</v-icon>
                <span> Excluir</span>
              </v-btn>
            </v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>
              <v-btn
                text
                class="d-flex align-center pa-4"
                color="deep-purple"
                @click="editProject"
              >
                <v-icon>mdi-pencil-outline</v-icon>
                <span> Editar</span>
              </v-btn>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-card-title>

    <v-card-text>
      <div
        class="d-flex align-center justify-space-between"
        style="gap: 1rem; margin-top: -2rem"
      >
        <div class="d-flex align-center" style="gap: 1rem">
          <v-icon>mdi-format-list-bulleted</v-icon>
          <p style="color: #bdbdbd; font-size: 0.8rem; margin-top: 1rem">
            Progresso
          </p>
        </div>

        <strong style="color: #bdbdbd; font-size: 0.8rem; margin-top: 1rem">
          {{ `${project.totaltaskConcluded}/${project.totalTask}` }}
        </strong>
      </div>
      <v-progress-linear
        rounded
        background-color="grey lighten-1"
        color="amber darken-3"
        :value="$progress"
      />
    </v-card-text>

    <v-card-actions class="pa-4 d-flex align-center justify-space-between">
      <v-chip color="grey lighten-2" small text-color="grey darken-2">
        {{
          `${$moment(project.createdAt).format('DD')} ${$moment(
            project.createdAt
          ).format('MMM')} ${$moment(project.createdAt).format('yyyy')}`
        }}
      </v-chip>

      <div class="d-flex align-center" style="gap: 1rem">
        <v-btn
          icon
          large
          class="d-flex align-center"
          style="gap: 0.3rem"
          @click="showTasks"
        >
          <v-icon size="20">mdi-message-text-outline</v-icon>

          <p style="color: #bdbdbd; font-size: 0.7rem; margin-top: 1rem">
            {{ project.totalTask }}
          </p>
        </v-btn>

        <v-btn
          icon
          large
          class="d-flex align-center"
          style="gap: 0.3rem"
          @click="showAttachment"
        >
          <v-icon size="20">mdi-attachment</v-icon>
          <p style="color: #bdbdbd; font-size: 0.7rem; margin-top: 1rem">
            {{ $totalFiles }}
          </p>
        </v-btn>
      </div>
    </v-card-actions>

    <EditProject
      :show="dialogEdit"
      :project="project"
      @close="dialogEdit = false"
    />

    <DeleteProject
      :show="dialogDelete"
      :project="project"
      @close="dialogDelete = false"
    />

    <ProjectAttachment
      :show="dialogAtachmment"
      :project-id="project.id"
      @close="dialogAtachmment = false"
    />
  </v-card>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'

import { ProjectProps } from '@/data'
import { files, projects } from '@/store'

export default Vue.extend({
  props: {
    project: { type: Object, required: true } as PropOptions<ProjectProps>,
  },

  data: () => ({
    dialogEdit: false,
    dialogDelete: false,
    dialogAtachmment: false,
  }),

  computed: {
    $progress(): number {
      const percent =
        Number(this.project.totaltaskConcluded) /
        Number(this.project.totalTask! > 0 ? this.project.totalTask : 1)

      return percent * 100
    },

    $totalFiles(): number {
      return this.project.totalFiles ? this.project.totalFiles : 0
    }
  },

  methods: {
    async showAttachment() {
      await files.index({ projectId: this.project.id!, type: 'project' })

      this.dialogAtachmment = true
    },

    async showTasks() {
      await projects.show(this.project.id!)
      await this.$router.push(`/tasks/${this.project.id}/tasks`)
    },

    deleteProject() {
      this.dialogDelete = true
    },
    editProject() {
      this.dialogEdit = true
    },
  },
})
</script>
