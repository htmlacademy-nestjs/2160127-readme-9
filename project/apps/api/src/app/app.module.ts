import { Module } from '@nestjs/common';
import { apiConfigModule } from '@project/api-config';


@Module({
  imports: [apiConfigModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
