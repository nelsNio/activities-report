import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('first_name',45).notNullable()
      table.string('last_name',45).notNullable()
      table.string('role',15).notNullable()
      table.string('email',15).unique().notNullable()
      table.string('identification_number',15).unique().notNullable()
      table.string('telephone_number',15).notNullable()
      table.date('date_birth').notNullable()
      table.string('address',15).unique().notNullable()
      table.string('password',250).notNullable()
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
