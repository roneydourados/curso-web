import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Application from '@ioc:Adonis/Core/Application'
import { cuid } from '@ioc:Adonis/Core/Helpers'
import fs from 'fs'
import Database from '@ioc:Adonis/Lucid/Database'
import File from 'App/Models/File'
import { StoreValidator } from 'App/Validators/File'

export default class FilesController {
  public async index({ request }: HttpContextContract) {
    const { projectId, type } = request.qs()

    const files = File.query().where({ ownerId: projectId, type })

    return files
  }

  public async store({ request }: HttpContextContract) {
    const { ownerId, type } = request.body()
    const { file } = await request.validate(StoreValidator)

    const uploadsFolder = Application.tmpPath('uploads', '') // tmp/uploads

    if (fs.existsSync(uploadsFolder)) {
      fs.mkdirSync(uploadsFolder, { recursive: true })
    }

    await Database.transaction(async (trx) => {
      const fileDB = new File()

      fileDB.useTransaction(trx)

      const fileName = `${cuid()}.${file.extname}`

      fileDB.attachementName = String(file.clientName)
      fileDB.fileName = fileName
      fileDB.ownerId = ownerId
      fileDB.type = type

      await file.move(uploadsFolder, {
        name: fileName,
        overwrite: true,
      })

      await fileDB.save()
    })
  }
}
