import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Task from './Task'
import File from './File'

export default class Project extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public projectName: string

  @column()
  public projectSubTitle: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Task)
  public tasks: HasMany<typeof Task>

  @hasMany(() => File, {
    foreignKey: 'ownerId',
    onQuery: (query) => query.where({ type: 'project' }),
  })
  public files: HasMany<typeof File>
}
