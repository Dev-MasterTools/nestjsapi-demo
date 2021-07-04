import {Controller,Post,Body, Get, Param, Patch, Delete} from '@nestjs/common';
import { ProductsService } from './products.service';
@Controller('products')
export class ProductsController 
{
    constructor(private readonly productService: ProductsService){}
    @Post()
    async addProduct
    (
        @Body('title') prodTitle:string, 
        @Body('decsription') prodDiscription:string,
        @Body('price') prodPrice:number,
        @Body('category') prodCategory:string, 
        @Body('image') prodImage:string,
        @Body('quantity') prodQuantity:number
         
    ) {


      const genID = await this.productService.insertProduct
      (
          prodTitle,
          prodDiscription,
          prodPrice,
          prodCategory,
          prodImage,
          prodQuantity);

      return "user ID : " + genID;
    }



    @Get()
    async getAllProducts()
    {
        const products = await this.productService.getProducts();
        return products;
        
    }

    @Get(':id')
    getProduct(@Param('id') prodId: string)
    {
        return this.productService.getSingleProduct(prodId);
    }

    @Patch(':id')
   async updateProduct(
        @Param('id') prodId: string,
        @Body('title') prodTitle:string, 
        @Body('decsription') prodDiscription:string,
        @Body('price') prodPrice:number,
        @Body('category') prodCategory:string, 
        @Body('image') prodImage:string,
        @Body('quantity') prodQuantity:number
    ){
      await  this.productService.updateProduct
      (
            prodId,
            prodTitle,
            prodDiscription,
            prodPrice,
            prodCategory,
            prodImage,
            prodQuantity
        )

        return "Product ID " + prodId + " was updated"
    }

    @Delete(':id')
    removeProduct(@Param('id') prodId: string)
    {
         return this.productService.deleteProduct(prodId);

    }
}