import 'multer';
import { Express } from 'express';
import { Controller, Post, UploadedFile, UseInterceptors, Logger, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { FileUploaderService } from './file-uploader.service';
import { cwd } from 'process';

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
    
    return this.fileUploaderService.saveFile(file);
  }
}