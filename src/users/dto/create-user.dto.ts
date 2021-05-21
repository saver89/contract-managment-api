import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'user@email.com', description: 'Почта' })
  readonly email: string;
  @ApiProperty({ example: 'passw0rd', description: 'Пароль' })
  readonly password: string;
}
