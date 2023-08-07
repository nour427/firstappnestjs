// create-intent.dto.ts
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateIntentDto {
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsString()
  currency: string;

}
