import { IsEmail, IsNotEmpty } from 'class-validator';

export class SellerRegistrationDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  phoneNumber: string;

  @IsNotEmpty()
  zipCode: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  state: string;

  @IsNotEmpty()
  country: string;
}
