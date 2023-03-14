import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tasks'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table
        .integer('project_id')
        .references('projects.id')
        .onDelete('CASCADE')
        .notNullable()
        .index('idx_tasks_project_id')

      table
        .integer('user_id')
        .references('users.id')
        .onDelete('CASCADE')
        .notNullable()
        .index('idx_tasks_user_id')
      table.string('title').notNullable().index('idx_tasks_title')
      table.text('content', 'longtext')
      table.boolean('concluded').defaultTo(false)
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
