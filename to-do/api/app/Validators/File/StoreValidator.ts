import { schema } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StoreValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    file: schema.file({
      extnames: ['jpg', 'png', 'jpeg', 'pdf', 'docx', 'xlsx', 'txt'],
      size: '5mb',
    }),
  })
}
