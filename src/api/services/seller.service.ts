import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { I18nRequestScopeService } from 'nestjs-i18n';

import { HelperService } from 'src/common';
import { SellerLoginDto, SellerRegistrationDto } from '../dto/request';
import { SellerRepository } from '../repositories';

@Injectable()
export class SellerService {
   constructor(
      private readonly sellerRepo: SellerRepository,
      private readonly i18n: I18nRequestScopeService,
      private readonly helperSer: HelperService
   ) {}

   async saveSellerDetails(lang: string, sellerRegDto: SellerRegistrationDto): Promise<any> {
      return await this.sellerRepo
         .find(lang, {
            email: sellerRegDto.email,
         })
         .then(async (result) => {
            if (result) {
               const msg = await this.i18n.translate('message.FIELD_EXIST', {
                  lang: lang,
                  args: {
                     FIELD: 'Email ID',
                  },
               });
               throw new HttpException(
                  {
                     statusCode: HttpStatus.BAD_REQUEST,
                     message: msg,
                  },
                  HttpStatus.BAD_REQUEST
               );
            } else {
               sellerRegDto.password = await this.helperSer.getEncryptedValue(
                  sellerRegDto.password
               );
               return this.sellerRepo.save(lang, sellerRegDto);
            }
         });
   }

   async sellerLogin(lang: string, sellerLoginDto: SellerLoginDto): Promise<any> {
      sellerLoginDto.password = await this.helperSer.getEncryptedValue(sellerLoginDto.password);
      console.log(sellerLoginDto.password);
      return await this.sellerRepo
         .find(lang, {
            email: sellerLoginDto.email,
            password: sellerLoginDto.password,
         })
         .then(async (result) => {
            if (result) {
               const msg = await this.i18n.translate('message.SUCCESS_LOGIN', { lang: lang });
               return {
                  statusCode: HttpStatus.OK,
                  message: msg,
               };
            } else {
               const msg = await this.i18n.translate('message.INVALID_USER', { lang: lang });
               throw new HttpException(
                  {
                     statusCode: HttpStatus.UNAUTHORIZED,
                     message: msg,
                  },
                  HttpStatus.UNAUTHORIZED
               );
            }
         });
   }

   async getAllSellers(lang: string): Promise<any> {
      return await this.sellerRepo.find(lang, {}).then(async (result) => {
         if (result) {
            return result;
         } else {
            const msg = await this.i18n.translate('message.NOT_FOUND', { lang: lang });
            throw new HttpException(
               {
                  statusCode: HttpStatus.NOT_FOUND,
                  message: msg,
               },
               HttpStatus.NOT_FOUND
            );
         }
      });
   }

   async getSeller(lang: string, sellerId: string): Promise<any> {
      return await this.sellerRepo
         .find(lang, {
            _id: sellerId,
         })
         .then(async (result) => {
            if (result) {
               return result[0];
            } else {
               const msg = await this.i18n.translate('message.NOT_FOUND', {
                  lang: lang,
               });
               throw new HttpException(
                  {
                     statusCode: HttpStatus.NOT_FOUND,
                     message: msg,
                  },
                  HttpStatus.NOT_FOUND
               );
            }
         });
   }
}
