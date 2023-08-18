import { AppService } from './app.service';
import { Controller, Post, Body, Get} from '@nestjs/common';
import { CreateIntentDto } from './CreateIntentDto';
import { Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { StripeModule } from 'nestjs-stripe';
@Controller()
export class AppController {
  stripe: any;
  constructor(private readonly appService: AppService) {

  }
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


  //webhooks
  @Post('webhook')
  async handleStripeWebhook(@Req() req: Request, @Res() res: Response) {
    const sig = req.headers['stripe-signature'];

    try {
      const event = this.stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );

      // Handle the Stripe event here
      switch (event.type) {
        case 'payment_intent.succeeded':
          // Handle successful payment
          const paymentIntent = event.data.object;
          break;
          case 'payment_intent.payment_failed':
            // Handle failed payment
            break;
          case 'payment_method.attached':
            const paymentMethod = event.data.object;
            const customerId = paymentMethod.customer;

      
          // Handle failed payment
          break;
        // Add more cases for other event types
        default:
          console.log(`Unhandled event type: ${event.type}`);
      }

      res.status(200).send();

    } catch (err) {
      console.error(err);
      res.status(400).send(`Webhook Error: ${err.message}`);
    }
  }
  
  }
// Replace CreateIntentDto with a DTO (Data Transfer Object) representing the request body for creating an intent


