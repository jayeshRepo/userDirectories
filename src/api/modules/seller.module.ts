import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { HelperService } from 'src/common';
import { SellerController } from '../controllers';
import { SellerSchema } from '../schemas';
import { SellerService } from '../services';
import { SellerRepository } from '../repositories';

@Module({
   imports: [MongooseModule.forFeature([{ name: 'sellers', schema: SellerSchema }])],
   controllers: [SellerController],
   providers: [SellerService, HelperService, SellerRepository],
})
export class SellerModule {}
