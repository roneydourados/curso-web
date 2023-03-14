import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Task from 'App/Models/Task'

export default class TasksController {
  public async index({ request }: HttpContextContract) {
    const { projectId } = request.qs()

    const tasks = await Task.query().where({ projectId }).orderBy('id', 'desc')

    return tasks
  }

  public async store({ request }: HttpContextContract) {
    const { projectId, title, content, userId } = request.body()

    const task = await Task.create({ projectId, title, content, userId })

    return task
  }

  public async show({ params }: HttpContextContract) {
    const task = await Task.findOrFail(params.id)

    return task
  }

  public async update({ params, request }: HttpContextContract) {
    const task = await Task.findOrFail(params.id)
    const { projectId, title, content, userId, concluded } = request.body()

    task.merge({ projectId, title, content, userId, concluded })

    await task.save()

    return task
  }

  public async destroy({ params }: HttpContextContract) {
    const task = await Task.findOrFail(params.id)

    await task.delete()
  }
}
