import { Injectable } from '@nestjs/common';
import { InjectStripe } from 'nestjs-stripe';

/*
const stripe = require('stripe')(
  'sk_test_51NShvBAsWPWZdLNGTn5jNRXuyOrzwEiBjqzslvo02F43IOQ99uoWk13FOXeZSdPMZbodOl4Mq4BuYIA6RwH2vuz200rha2KtWv',
);
const endpointSecret = "whsec_7f60ce0a615a70ec4df069f7b95c63f7eabd662011653b08b290d35b271aec62";

*/

import Stripe from 'stripe';

@Injectable()
export class AppService {
  
  private stripe: Stripe;
  constructor(@InjectStripe() private readonly stripeClient: Stripe) {
    // Initialize Stripe with your API key
    this.stripe = stripeClient;

  }
 
  
  async createIntent(amount: number, currency: string): Promise<Stripe.PaymentIntent> {
    try {
      const intent = await this.stripe.paymentIntents.create({
        amount,
        currency,
       /* automatic_payment_methods: {
          enabled: true,
        },*/
        //Todo should add "apple_pay"
        payment_method_types: ["card","paypal"],
       

        
      });
      
      return intent;
    } catch (error) {
      // Handle the error here, log it, or throw a custom exception
      console.error('An error occurred while creating the payment intent:', error);
      throw new Error('Failed to create payment intent.');
    }
  }
  //webhooks
  async function (){
    const endpoint = await this.stripe.webhookEndpoints.create({
      url: 'https://example.com/my/webhook/endpoint',
      enabled_events: [
        'payment_intent.payment_failed',
        'payment_intent.succeeded',
        'payment_method.attached',
      ],
    });
  }
  
}








