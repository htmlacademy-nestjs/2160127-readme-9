import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {

  @ApiProperty({
      description: 'User unique address',
      example: 'user@user.ru'
    })
  public email: string;

  @ApiProperty({
    description: 'User birth date',
    example: '1990-01-21',
  })
  public dateBirth: string;

  @ApiProperty({
    description: 'User first name',
    example: 'Ivan',
  })
  public firstname: string;

@ApiProperty({
    description: 'User last name',
    example: 'Ivanov'
  })
  public lastname: string;

  @ApiProperty({
    description: 'User password',
    example: '123Qws'
  })
  public password: string;
}
