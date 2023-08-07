import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StripeModule } from 'nestjs-stripe';

@Module({
  imports: [
    StripeModule.forRoot({
      apiKey: 'sk_test_51NShvBAsWPWZdLNGTn5jNRXuyOrzwEiBjqzslvo02F43IOQ99uoWk13FOXeZSdPMZbodOl4Mq4BuYIA6RwH2vuz200rha2KtWv',
      apiVersion: '2022-11-15'
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
