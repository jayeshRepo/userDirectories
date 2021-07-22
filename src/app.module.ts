import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { SellerModule } from './modules/seller.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `.env` }), 
    SellerModule,
    MongooseModule.forRoot(
      process.env.DB_PATH
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
