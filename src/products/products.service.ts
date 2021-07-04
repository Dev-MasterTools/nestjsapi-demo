import { NotFoundException } from "@nestjs/common";
import { Injectable } from "@nestjs/common";
import {InjectModel} from '@nestjs/mongoose';
import { Model } from "mongoose";

import {Product} from './product.model'

@Injectable()
export class ProductsService{
    

    private products: Product[] = [];

    constructor(@InjectModel('Product') private readonly productModel: Model<Product>){}

    async insertProduct
    (
        title: string, 
        desc: string, 
        price: number, 
        category:string,
        image:string,
        quantity: number

        ){
        const newProduct = new this.productModel
        ({
            title: title,
            decsription: desc,
            price : price,
            category : category,
            image: image,
            quantity: quantity
        });
       const result = await newProduct.save();
       console.log(result);
       return result.id as string;
    }


    async getProducts()
    {
        const products = await this.productModel.find().exec();
        return products.map(prod => 
        ({
            id: prod.id,
            title: prod.title,
            decsription: prod.decsription,
            price: prod.price,
            category: prod.category,
            image: prod.image,
            quantity: prod.quantity,
    
        }));
    }

    async getSingleProduct(productID: string)
    {
        const product = await this.findProduct(productID);
        
            return {  
                 id: product.id,
                 title: product.title,
                 decsription: product.decsription,
                 price: product.price,
                 category: product.category,
                 image: product.image,
                 quantity: product.quantity
             };
          

    }

   async updateProduct(
        productID: string,
        title: string, 
        desc: string, 
        price: number,
        category:string,
        image:string,
        quantity: number
        )
        {
            const updatedProduct = await this.findProduct(productID);

             if(title)
             {
                 updatedProduct.title = title;
             }
             if(desc)
             {
                 updatedProduct.decsription = desc;
             }
             if(price)
             {
                 updatedProduct.price = price;
             }
             if(category)
             {
                 updatedProduct.category = category;
             }
             if(image)
             {
                 updatedProduct.image = image;
             }
             if(quantity)
             {
                 updatedProduct.quantity = quantity;
             }
             updatedProduct.save();
        }


        private async findProduct(id: string): Promise<Product>
        {
            let product;

            try
            {
            product = await this.productModel.findById(id).exec();

            }
            catch(error)
            {
                throw new NotFoundException('could not find products of ID ' + id );
            }

            if(!product)
            {
                throw new NotFoundException('could not find products of ID ' + id );
            }
            return product;

        }

       async deleteProduct(productID: string)
        {

         const results = await this.productModel.deleteOne({_id: productID}).exec();

          if(results.n === 0)
          {
            throw new NotFoundException('could not find products of ID ' + productID );
          }
          return "Product Id " + productID + " was deleted";
            
        }
}