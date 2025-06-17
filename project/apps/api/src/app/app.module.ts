import { Module } from '@nestjs/common';
import { apiConfigModule, getConfig} from '@project/api-config';
import { HttpModule } from '@nestjs/axios';


@Module({
  imports: [apiConfigModule, 
    HttpModule.register({
      timeout: getConfig().httpClient.timeout,
      maxRedirects: getConfig().httpClient.maxRedirect,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
