import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { EmailSubscriberModel, EmailSubscriberSchema } from './email-subscriber.model';
import { EmailSubscriberService } from './email-subscriber.service';
import { EmailSubscriberRepository } from './email-subscriber.repository';
import { EmailSubscriberFactory } from './email-subscriber.factory';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { MailModule } from './mail-module/mail.module';
import { EmailSubscriberController } from './email-subscriber.controller';

import { getRabbitMQOptions } from '@project/helpers';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EmailSubscriberModel.name, schema: EmailSubscriberSchema }
    ]),
    RabbitMQModule.forRootAsync(     
        RabbitMQModule, 
      getRabbitMQOptions('application.rabbit')
    ),
    MailModule,
  ],
  providers: [
    EmailSubscriberService,
    EmailSubscriberRepository,
    EmailSubscriberFactory,
  ],
  controllers: [
    EmailSubscriberController,
  ],
})
export class EmailSubscriberModule {}