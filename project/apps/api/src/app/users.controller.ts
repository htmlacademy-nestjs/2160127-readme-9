import { HttpService } from '@nestjs/axios';
import { Body, Controller, Post, Req,HttpStatus, UseFilters } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { LoginUserDto, AuthenticationResponseMessage } from '@project/authentication';


import { getConfig} from '@project/api-config';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';

@ApiTags('authentication')
@Controller('users')
@UseFilters(AxiosExceptionFilter)
export class UsersController {
  constructor(
    private readonly httpService: HttpService
  ) {}

  @ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: AuthenticationResponseMessage.UserNotFound,
    })
  @ApiResponse({
    status: HttpStatus.OK,
    description: AuthenticationResponseMessage.LoggedSuccess,
    })
  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDto) {
    const { data } = await this.httpService.axiosRef.post(`${getConfig().applicationServiceURL.user}/login`, loginUserDto);
    return data;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get a new access/refresh tokens'
  })
  @Post('refresh')
  public async refreshToken(@Req() req: Request) {
    const { data } = await this.httpService.axiosRef.post(`${getConfig().applicationServiceURL.user}/refresh`, null, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });

    return data;
  }
}
