import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { SellerModule } from './api/modules/seller.module';
import {
   AcceptLanguageResolver,
   CookieResolver,
   HeaderResolver,
   I18nJsonParser,
   I18nModule,
   QueryResolver,
} from 'nestjs-i18n';
import * as path from 'path';

import { AppController } from './app.controller';
import { AuthMiddleware } from './middleware';
import { AppService } from './app.service';

@Module({
   imports: [
      ConfigModule.forRoot({ envFilePath: `.env` }),
      I18nModule.forRoot({
         fallbackLanguage: 'en',
         parser: I18nJsonParser,
         parserOptions: {
            path: path.join(__dirname, '/i18n/'),
         },
         resolvers: [
            { use: QueryResolver, options: ['lang', 'locale', 'l'] },
            new HeaderResolver(['x-custom-lang']),
            AcceptLanguageResolver,
            new CookieResolver(['lang', 'locale', 'l']),
         ],
      }),
      MongooseModule.forRoot(process.env.DB_PATH),
      SellerModule,
   ],
   controllers: [AppController],
   providers: [AppService],
})
export class AppModule implements NestModule {
   configure(consumer: MiddlewareConsumer) {
      consumer.apply(AuthMiddleware).forRoutes('seller/registration');
   }
}
