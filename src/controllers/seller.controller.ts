import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SellerRegistrationDto } from 'src/dto/request/seller-registration.dto';
import { SellerService } from 'src/services/seller.service';

@Controller('seller/registration')
export class SellerController {

    constructor(private readonly sellerSer: SellerService) {

    }

    @Get(':id')
    getSeller(@Param('id') id: string) {
        return this.sellerSer.getSeller(id);
    }

    @Get()
    getSellers() {
        return this.sellerSer.getAllSellers();
    }

    @Post()
    saveSeller(@Body() sellerRegDto: SellerRegistrationDto): any {
        return this.sellerSer.saveSellerDetails(sellerRegDto);    
    }
}
