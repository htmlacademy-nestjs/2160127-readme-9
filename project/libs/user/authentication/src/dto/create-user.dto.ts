import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {

  @ApiProperty({
      description: 'User unique address',
      example: 'user@user.ru'
    })
  public email: string;

  @ApiProperty({
    description: 'User name',
    example: 'Ivan',
  })
  public name: string;

@ApiProperty({
    description: 'User avatar url',
    example: 'img/photo.jpg'
  })
  public avatar: string;

  @ApiProperty({
    description: 'User password',
    example: '123Qws'
  })
  public password: string;
}
