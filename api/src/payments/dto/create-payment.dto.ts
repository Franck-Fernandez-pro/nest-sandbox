import { IsEmail, IsNotEmpty, IsNumberString } from "class-validator";

export class CreatePaymentDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsNumberString()
  price: number;
}
