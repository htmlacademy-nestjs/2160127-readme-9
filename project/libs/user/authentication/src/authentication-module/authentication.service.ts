import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  Inject,
  Logger,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';

import { BlogUserRepository, BlogUserEntity } from '@project/blog-user';
import { Token, TokenPayload, User } from '@project/shared-core';
import { jwtConfig } from '@project/user-config';


import { CreateUserDto } from '../dto/create-user.dto';
import { AuthUserErrorMessage } from './authentication.constant';
import { LoginUserDto } from '../dto/login-user.dto';


@Injectable()
export class AuthenticationService {
  private readonly logger = new Logger(AuthenticationService.name);
  constructor(
   private readonly blogUserRepository: BlogUserRepository,

   private readonly jwtService: JwtService,
   @Inject(jwtConfig.KEY) private readonly jwtOptions: ConfigType<typeof jwtConfig>,
  ) {}
  public async register(dto: CreateUserDto): Promise<BlogUserEntity> {
    const {email, name, password} = dto;

    const blogUser = {
      email, name,
      avatar: '',
      passwordHash: ''
    };

    const existUser = await this.blogUserRepository
      .findByEmail(email);

    if (existUser) {
      throw new ConflictException(AuthUserErrorMessage.AuthUserExists);
    }

    const userEntity = await new BlogUserEntity(blogUser)
      .setPassword(password)

    this.blogUserRepository
      .save(userEntity);

    return userEntity;
  }

  public async verifyUser(dto: LoginUserDto) {
    const {email, password} = dto;
    const existUser = await this.blogUserRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(AuthUserErrorMessage.AuthUserNotFound);
    }

    if (!await existUser.comparePassword(password)) {
      throw new UnauthorizedException(AuthUserErrorMessage.AuthUserPasswordWrong);
    }

    return existUser;
  }

  public async getUser(id: string) {
    const user = await this.blogUserRepository.findById(id);

    if (! user) {
      throw new NotFoundException(AuthUserErrorMessage.AuthUserNotFound);
    }

    return user;
  }

  public async createUserToken(user: User): Promise<Token> {
    const payload: TokenPayload = {
      sub: user.id,
      email: user.email,     
      name: user.name,
      
    };

    try {
      const accessToken = await this.jwtService.signAsync(payload);
      const refreshToken = await this.jwtService.signAsync(payload, {
        secret: this.jwtOptions.refreshTokenSecret,
        expiresIn: this.jwtOptions.refreshTokenExpiresIn
      });

      return { accessToken, refreshToken };
    } catch (error) {
      this.logger.error('[Token generation error]: ' + error.message);
      throw new HttpException('Ошибка при создании токена.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
