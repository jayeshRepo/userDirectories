import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { SellerController } from 'src/controllers/seller.controller'
import { SellerSchema } from 'src/schemas/seller.schema'
import { SellerService } from 'src/services/seller.service'

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'sellers', schema: SellerSchema }]),
    ],
    controllers: [SellerController],
    providers: [SellerService],
})
export class SellerModule {}
