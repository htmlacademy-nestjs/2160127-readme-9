import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsOptional } from 'class-validator';

import { AuthenticationValidateMessage } from '../authentication-module/authentication.constant';
export class CreateUserDto {

  @ApiProperty({
      description: 'User unique address',
      example: 'user@user.ru'
    })
  @IsEmail({}, { message: AuthenticationValidateMessage.EmailNotValid })
  public email: string;

  @ApiProperty({ 
    description: 'User name',
    example: 'Ivan',
  }) 
  @IsString()
  public name: string;

@ApiProperty({
    description: 'User avatar url',
    example: 'img/photo.jpg'
  })
  @IsString()
  @IsOptional()
  public avatar?: string;

  @ApiProperty({
    description: 'User password',
    example: '123Qws'
  })
  @IsString()
  public password: string;
}
