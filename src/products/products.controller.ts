import {Controller,Post,Body, Get, Param, Patch, Delete} from '@nestjs/common';
import { ProductsService } from './products.service';
@Controller('products')
export class ProductsController 
{
    constructor(private readonly productService: ProductsService){}

    @Post()
    addProduct (
        @Body('title') prodTitle:string, 
        @Body('decsription') prodDiscription:string,
        @Body('price') prodPrice:number
    ): any {


      const genID =  this.productService.insertProduct(
          prodTitle,
          prodDiscription,
          prodPrice);

      return "user ID : " + genID;
    }



    @Get()
    getAllProducts()
    {
        return this.productService.getProducts();
    }

    @Get(':id')
    getProduct(@Param('id') prodId: string)
    {
        return this.productService.getSingleProduct(prodId);
    }

    @Patch(':id')
    updateProduct(
        @Param('id') prodId: string,
        @Body('title') prodTitle:string, 
        @Body('decsription') prodDiscription:string,
        @Body('price') prodPrice:number
    ){
        this.productService.updateProduct(
            prodId,
            prodTitle,
            prodDiscription,
            prodPrice
        )

        return "Product ID " + prodId + " was updated"
    }

    @Delete(':id')
    removeProduct(@Param('id') prodId: string)
    {
         return this.productService.deleteProduct(prodId);

    }
}