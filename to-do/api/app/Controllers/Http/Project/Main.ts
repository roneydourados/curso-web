import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Project from 'App/Models/Project'

export default class ProjectController {
  public async index({ request }: HttpContextContract) {
    const { projectName } = request.qs()

    const projects = await Project.query()
      .preload('files')
      .preload('tasks')
      .where('project_name', 'ilike', `%${projectName}%`)

    const returnProjects = projects.map((project) => {
      let taskConcluded = 0

      project.tasks.map((task) => {
        if (task.concluded) {
          taskConcluded = taskConcluded + 1
        }
      })

      return {
        id: project.id,
        projectName: project.projectName,
        projectSubTitle: project.projectSubTitle,
        createdAt: project.createdAt,
        updatedAt: project.updatedAt,
        tasks: project.tasks,
        files: project.files,
        totalTask: project.tasks.length,
        totaltaskConcluded: taskConcluded,
        totalFiles: project.files.length,
      }
    })

    return returnProjects
  }

  public async store({ request }: HttpContextContract) {
    const { projectName, projectSubTitle } = request.body()

    const project = await Project.create({ projectName, projectSubTitle })

    return project
  }

  public async show({ params }: HttpContextContract) {
    const project = await Project.findOrFail(params.id)

    await project.load((loader) => {
      loader.load('tasks')
      loader.load('files')
    })

    return project
  }

  public async update({ params, request }: HttpContextContract) {
    const project = await Project.findOrFail(params.id)
    const { projectName, projectSubTitle } = request.body()

    project.merge({ projectName, projectSubTitle })

    await project.save()

    return project
  }

  public async destroy({ params }: HttpContextContract) {
    const project = await Project.findOrFail(params.id)

    await project.delete()
  }
}
