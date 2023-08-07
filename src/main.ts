import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
 
  // Enable CORS for all origins (you can adjust this configuration based on your needs)
  
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);

}
bootstrap();
