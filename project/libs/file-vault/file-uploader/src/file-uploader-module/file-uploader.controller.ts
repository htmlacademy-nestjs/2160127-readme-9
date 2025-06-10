import 'multer';
import { Express } from 'express';
import { 
  Controller, 
  Post, 
  UploadedFile, 
  UseInterceptors, 
  Get, 
  Param,  
  Logger, 
  BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { FileUploaderService } from './file-uploader.service';
import { MongoIdValidationPipe } from '@project/shared/pipes';
import { fillDto } from '@project/helpers';

import { UploadedFileRdo } from './rdo/uploaded-file.rdo';

@Controller('files')
export class FileUploaderController {
    private readonly logger = new Logger(FileUploaderController.name);
  constructor(
    private readonly fileUploaderService: FileUploaderService,
  ) {}

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  public async uploadFile(@UploadedFile() file: Express.Multer.File) {
    this.logger.debug('in /upload');     
    if (!file) {
    throw new BadRequestException('No file uploaded');
  }
     const fileEntity = await this.fileUploaderService.saveFile(file);
    return fillDto(UploadedFileRdo, fileEntity.toPOJO());
  }

@Get(':fileId')
  public async show(@Param('fileId', MongoIdValidationPipe) fileId: string) {
    const existFile = await this.fileUploaderService.getFile(fileId);
    return fillDto(UploadedFileRdo, existFile);
  }
}