import { AppService } from './app.service';
import { Controller, Post, Body, Get} from '@nestjs/common';
import { CreateIntentDto } from './CreateIntentDto';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getHello() {
    return "Hello";
  }

  @Post('create-intent')
    async createIntent(@Body() createIntentDto: CreateIntentDto) {
      const { amount, currency } = createIntentDto;
      const intent = await this.appService.createIntent(amount, currency);
      return { clientSecret: intent.client_secret };
    }
  
  
  }
// Replace CreateIntentDto with a DTO (Data Transfer Object) representing the request body for creating an intent


