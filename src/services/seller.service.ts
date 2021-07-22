import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { SellerRegistrationDto } from 'src/dto/request/seller-registration.dto'
import { SellerModel } from 'src/models/seller.model'

@Injectable()
export class SellerService {
    constructor(
        @InjectModel('sellers') private sellerModel: Model<SellerModel>
    ) {}

    saveSellerDetails(sellerRegDto: SellerRegistrationDto): Promise<any> {
        const seller = new this.sellerModel(sellerRegDto)
        return seller.save()
    }

    getAllSellers(): Promise<any> {
        return this.sellerModel.find().then(result => {
            if(result[0]){
                return result[0];
            } else {
                throw new NotFoundException();
            }
        }, err =>{
            throw new BadRequestException('Something wen wrong!');
        })
    }

    getSeller(sellerId: string): Promise<any> {
        return this.sellerModel.find({ _id: sellerId }).then(result => {
            if(result[0]){
                return result[0];
            } else {
                throw new NotFoundException();
            }
        }, err =>{
            throw new BadRequestException('Invalid seller id!');
        })
    }
}
