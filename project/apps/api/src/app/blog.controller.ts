import {
  Body,
  Param,
  Controller,
  Post,
  Get,
  Delete,
  Patch,
  UseFilters,
  UseGuards,
  UseInterceptors,
  HttpStatus,
  HttpCode } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { CheckAuthGuard } from './guards/check-auth.guard';

import { CreatePostDto, UpdatePostDto } from '@project/blog-post'
import { CreateCommentDto } from '@project/blog-comment';
import { getConfig} from '@project/api-config';
import { InjectUserIdInterceptor } from '@project/interceptors';

@ApiTags('blog')
@Controller('blog')
@UseFilters(AxiosExceptionFilter)
export class BlogController {

  constructor(
    private readonly httpService: HttpService,
  ) {}

  @ApiResponse({
      status: HttpStatus.CREATED,
      description: "Create new post",
    })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @Post('/')
  public async create(@Body() dto: CreatePostDto) {
    const { data } = await this.httpService.axiosRef.post(`${getConfig().applicationServiceURL.blog}/`, dto);
    return data;
  }

  @Get('/:id')
      public async show(@Param('id') id: string) {
        const { data } = await this.httpService.axiosRef.get(`${getConfig().applicationServiceURL.blog}/${id}`);
        return data;
      }
  @Get('/')
  public async showAll() {
    const { data } = await this.httpService.axiosRef.get(`${getConfig().applicationServiceURL.blog}/`);
    return data;
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "Deleted post",
  })
  @UseGuards(CheckAuthGuard)
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async destroy(@Param('id') id: string) {
    await this.httpService.axiosRef.delete(`${getConfig().applicationServiceURL.blog}/${id}`);

  }
  @UseGuards(CheckAuthGuard)
  @Patch('/:id')
  public async update(@Param('id') id: string, @Body() dto: UpdatePostDto) {
    const { data } = await this.httpService.axiosRef.patch(`${getConfig().applicationServiceURL.blog}/${id}`, dto);
    return data;
      }

  @UseGuards(CheckAuthGuard)
  @Post('/:postId/comments')
    public async createComment(@Param('postId') postId: string, @Body() dto: CreateCommentDto) {
      const { data } = await this.httpService.axiosRef.post(`${getConfig().applicationServiceURL.blog}/${postId}/comments`, dto);
      return data;
    }



}
