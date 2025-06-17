import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { apiConfigModule, getConfig} from '@project/api-config';
import { UsersController } from './users.controller';


@Module({
  imports: [apiConfigModule, 
    HttpModule.register({
      timeout: getConfig().httpClient.timeout,
      maxRedirects: getConfig().httpClient.maxRedirect,
    }),
  ],
  controllers: [UsersController],
  providers: [],
})
export class AppModule {}
