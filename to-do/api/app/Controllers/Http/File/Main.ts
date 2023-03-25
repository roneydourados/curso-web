import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Application from '@ioc:Adonis/Core/Application'
import Database from '@ioc:Adonis/Lucid/Database'
import { cuid } from '@ioc:Adonis/Core/Helpers'
import fs from 'fs'
import { UpdateValidator } from 'App/Validators/File'
import File from 'App/Models/File'

export default class FileController {
  public async index({ request }: HttpContextContract) {
    const { projectId, type } = request.qs()

    const files = File.query().where({ ownerId: projectId, type })

    return files
  }

  public async store({ request }: HttpContextContract) {
    const { ownerId, type } = request.body()
    const { file } = await request.validate(UpdateValidator)

    const uploadsFolder = Application.tmpPath('uploads', '')

    // verificar se o diretório existe, caso não exista então criá-lo
    if (!fs.existsSync(uploadsFolder)) {
      fs.mkdirSync(uploadsFolder, { recursive: true })
    }

    await Database.transaction(async (trx) => {
      const fileDb = new File()

      fileDb.useTransaction(trx)

      const fileName = `${cuid()}.${file.extname}`
      fileDb.attachementName = String(file.clientName)
      fileDb.fileName = fileName
      fileDb.ownerId = ownerId
      fileDb.type = type

      await file.move(uploadsFolder, {
        name: fileName,
        overwrite: true,
      })

      await fileDb.save()
    })
  }

  public async destroy({ params }: HttpContextContract) {
    const file = await File.query().where({ id: params.id }).firstOrFail()

    if (fs.existsSync(Application.tmpPath('uploads', file.fileName))) {
      //deleta o arquivo do disco
      fs.unlinkSync(Application.tmpPath('uploads', file.fileName))
    }

    await file.delete()
  }
}
