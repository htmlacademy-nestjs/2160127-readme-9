import { Body, Controller, Get, HttpStatus, Param, Post, Req, UseGuards  } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthenticationService } from './authentication.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import { LoggedUserRdo } from '../rdo/logged-user.rdo';
import { AuthenticationResponseMessage } from './authentication.constant'
import { MongoIdValidationPipe } from '@project/shared/pipes';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { fillDto } from '@project/helpers';
import { NotifyService } from '@project/user-notify';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { RequestWithUser } from './request-with-user.interface';

@ApiTags('authentication')
@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly authService: AuthenticationService,
    private readonly notifyService: NotifyService,
  ) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: AuthenticationResponseMessage.UserCreated,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: AuthenticationResponseMessage.UserExist,
  })
   @Post('register')
  public async create(@Body() dto: CreateUserDto) {
    const newUser = await this.authService.register(dto);
    const { email, name } = newUser;
    await this.notifyService.registerSubscriber({ email, name });
    return newUser.toPOJO();
  }

  @Post('login')
  public async login(@Req() { user }: RequestWithUser) {
    const userToken = await this.authService.createUserToken(user);
    return fillDto(LoggedUserRdo, { ...user.toPOJO(), ...userToken });
  }

  @Get(':id')
  public async show(@Param('id', MongoIdValidationPipe) id: string) {
    const existUser = await this.authService.getUser(id);
    return existUser.toPOJO();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/demo/:id')
  public async demoPipe(@Param('id') id: number) {
    console.log(`type = ${typeof id},value = ${id}`);
  }
  
}
