import { Controller } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

import { EmailSubscriberService } from './email-subscriber.service';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { RabbitRouting } from '@project/shared-core';
import { MailService } from './mail-module/mail.service';
import { getConfig } from '@project/notify-config';


@Controller()
export class EmailSubscriberController {
  constructor(
    private readonly subscriberService: EmailSubscriberService,
     private readonly mailService: MailService,
  ) {}

  @RabbitSubscribe({
    exchange: getConfig().rabbit.exchange,
    routingKey: RabbitRouting.AddSubscriber,
    queue: getConfig().rabbit.queue,
  })
  public async create(subscriber: CreateSubscriberDto) {
    await this.subscriberService.addSubscriber(subscriber);
    await this.mailService.sendNotifyNewSubscriber(subscriber);
  }
}