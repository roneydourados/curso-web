import { schema } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    file: schema.file({
      size: '5mb',
      extnames: ['jpg', 'png', 'jpeg', 'pdf', 'docx', 'xlsx', 'txt'],
    }),
  })

  public caceKey = this.ctx.routeKey

  public messages = {}
}
