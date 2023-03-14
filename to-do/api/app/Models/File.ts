import { BaseModel, column, computed } from '@ioc:Adonis/Lucid/Orm'
import Env from '@ioc:Adonis/Core/Env'

export default class File extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public ownerId: number

  @column()
  public fileName: string

  @column()
  public attachementName: string

  @column()
  public type: string

  @computed()
  public get url(): string {
    const url = Env.get('APP_URL')

    return `${url}/uploads/${this.fileName}`
  }
}
