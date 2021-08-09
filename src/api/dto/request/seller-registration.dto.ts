import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class SellerRegistrationDto {
   @IsNotEmpty()
   @ApiProperty()
   name: string;

   @IsNotEmpty()
   @IsEmail()
   @ApiProperty()
   email: string;

   @IsNotEmpty()
   @ApiProperty()
   password: string;

   @IsNotEmpty()
   @ApiProperty()
   phoneNumber: string;

   @IsNotEmpty()
   @ApiProperty()
   zipCode: string;

   @IsNotEmpty()
   @ApiProperty()
   city: string;

   @IsNotEmpty()
   @ApiProperty()
   state: string;

   @IsNotEmpty()
   @ApiProperty()
   country: string;
}
