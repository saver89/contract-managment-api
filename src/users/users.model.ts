import { ApiProperty } from '@nestjs/swagger';
import { BelongsToMany, Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Post } from 'src/posts/posts.model';
import { Role } from 'src/roles/roles.model';
import { UserRoles } from 'src/roles/user-roles.model';

interface UserCreationAttrs {
  email: string;
  password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'user@email.com', description: 'Email' })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @ApiProperty({ example: 'passw0rd', description: 'Пароль' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @ApiProperty({ example: 'true', description: 'Пользователь активен' })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  enabled: boolean;

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];

  @HasMany(() => Post)
  post: Post[];
}

export class UserToken {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RVc2VyMiIsImlkIjozLCJyb2xlcyI6W3siaWQiOjIsInZhbHVlIjoiVVNFUiIsImRlc2NyaXB0aW9uIjoi0J_QvtC70YzQt9C-0LLQsNGC0LXQu9GMIiwiY3JlYXRlZEF0IjoiMjAyMS0wNS0yMVQyMzoyMDoyNS4zMTVaIiwidXBkYXRlZEF0IjoiMjAyMS0wNS0yMVQyMzoyMDoyNS4zMTVaIn1dLCJpYXQiOjE2MjE4OTY1MzMsImV4cCI6MTYyMTk4MjkzM30.3pxNDdYKJq8yL_b4JDx7YmbMgnPRM_TSn8MqFX8fwps',
    description: 'Токен авторизации пользователя',
  })
  @Column({
    type: DataType.STRING,
  })
  token: string;
}
