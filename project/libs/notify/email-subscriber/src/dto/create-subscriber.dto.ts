import { IsEmail, IsNotEmpty } from 'class-validator';

import { SubscriberErrorMessage} from '../email-subscriber.constant';

export class CreateSubscriberDto {
  @IsEmail({}, { message: SubscriberErrorMessage.EmailNotValid })
  public email: string;

  @IsNotEmpty({ message: SubscriberErrorMessage.NameIsEmpty })
  public name: string;  
}