import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { I18nRequestScopeService } from 'nestjs-i18n';
import { Model } from 'mongoose';

import { SellerRegistrationDto } from '../dto/request';
import { SellerModel } from '../models';

@Injectable()
export class SellerRepository {
   constructor(
      @InjectModel('sellers') private sellerModel: Model<SellerModel>,
      private readonly i18n: I18nRequestScopeService
   ) {}

   async find(lang: string, query: { [key: string]: any }): Promise<any> {
      return this.sellerModel.find(query, { password: 0, __v: 0 }).then(
         (result) => {
            if (result[0]) {
               return result;
            } else {
               return null;
            }
         },
         async (err) => {
            const msg = await this.i18n.translate('message.DB_ERROR', { lang: lang });
            throw new HttpException(
               {
                  statusCode: HttpStatus.BAD_REQUEST,
                  message: msg,
               },
               HttpStatus.BAD_REQUEST
            );
         }
      );
   }

   async save(lang: string, sellerRegDto: SellerRegistrationDto): Promise<any> {
      const seller = new this.sellerModel(sellerRegDto);
      return seller.save().then(
         async (result) => {
            const msg = await this.i18n.translate('message.SUCCESS_REGISTRATION', {
               lang: lang,
               args: { FIELD: 'Seller' },
            });
            return {
               statusCode: HttpStatus.CREATED,
               message: msg,
            };
         },
         async (err) => {
            const msg = await this.i18n.translate('message.DB_ERROR', { lang: lang });
            throw new HttpException(
               {
                  statusCode: HttpStatus.BAD_REQUEST,
                  message: msg,
               },
               HttpStatus.BAD_REQUEST
            );
         }
      );
   }
}
