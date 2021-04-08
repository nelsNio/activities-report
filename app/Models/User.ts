import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public email:string;

  @column()
  public first_name: string;

  @column()
  public last_name: string;
  
  @column()
  public role: string;

  @column()
  public identification_number: string;

  @column()
  public telephone_number: string;


  @column()
  public password: string;

  @column()
  public date_birth: Date;
  
  @column()
  public address: string;

  
}
