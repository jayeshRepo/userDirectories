import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';
import { I18nLang } from 'nestjs-i18n';

import { SellerLoginDto, SellerRegistrationDto } from '../dto/request';
import { SellerService } from '../services';

@ApiTags('Seller CRUD')
@Controller('seller/')
export class SellerController {
   constructor(private readonly sellerSer: SellerService) {}

   @ApiHeader({
      name: 'x-custom-lang',
      description: 'en',
   })
   @Get(':id')
   async getSeller(@Param('id') id: string, @I18nLang() lang: string): Promise<any> {
      return this.sellerSer.getSeller(lang, id);
   }

   @ApiHeader({
      name: 'x-custom-lang',
      description: 'en',
   })
   @Get()
   async getSellers(@I18nLang() lang: string): Promise<any> {
      return this.sellerSer.getAllSellers(lang);
   }

   @ApiHeader({
      name: 'x-custom-lang',
      description: 'en',
   })
   @ApiResponse({ status: 401, description: 'All seller related error appear under 400.' })
   @ApiResponse({ status: 201, description: 'The seller has been successfully created.' })
   @Post('registration')
   async saveSeller(
      @Body() sellerRegDto: SellerRegistrationDto,
      @I18nLang() lang: string
   ): Promise<any> {
      return this.sellerSer.saveSellerDetails(lang, sellerRegDto);
   }

   @ApiHeader({
      name: 'x-custom-lang',
      description: 'en',
   })
   @ApiResponse({
      status: 401,
      description: 'Email ID and password are not match with the system!',
   })
   @ApiResponse({ status: 400, description: 'All seller related error appear under 400.' })
   @ApiResponse({ status: 201, description: 'The seller has been successfully created.' })
   @Post('login')
   async sellerLogin(
      @Body() sellerLoginDto: SellerLoginDto,
      @I18nLang() lang: string
   ): Promise<any> {
      return this.sellerSer.sellerLogin(lang, sellerLoginDto);
   }
}
