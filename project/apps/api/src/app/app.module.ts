import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { ApiConfigModule, getConfig} from '@project/api-config';
import { UsersController } from './users.controller';
import { BlogController } from './blog.controller';
import { CheckAuthGuard } from './guards/check-auth.guard';


@Module({
  imports: [ApiConfigModule, 
    HttpModule.register({
      timeout: getConfig().httpClient.timeout,
      maxRedirects: getConfig().httpClient.maxRedirect,
    }),
  ],
  controllers: [
    UsersController, 
    BlogController,
  ],
  providers: [CheckAuthGuard],
})
export class AppModule {}
