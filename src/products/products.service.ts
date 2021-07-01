import { NotFoundException } from "@nestjs/common";
import { Injectable } from "@nestjs/common";
import {InjectModel} from '@nestjs/mongoose';
import { Model } from "mongoose";

import {Product} from './product.model'

@Injectable()
export class ProductsService{
    

    private products: Product[] = [];

    constructor(@InjectModel('Product') private readonly productModel: Model<Product>){}

    async insertProduct(title: string, desc: string, price: number){
        const newProduct = new this.productModel({
            title: title,
            decsription: desc,
            price : price,
        });
       const result = await newProduct.save();
       console.log(result);
       return result.id as string;
    }


    async getProducts()
    {
        const products = await this.productModel.find().exec();
        return products.map(prod => ({
        id: prod.id,
        title: prod.title,
        decsription: prod.decsription,
        price: prod.price,
    
        }));
    }

    async getSingleProduct(productID: string)
    {
        const product = await this.findProduct(productID);
        return product;
    }

   async updateProduct(
        productID: string,
        title: string, 
        desc: string, 
        price: number
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
             //updatedProduct.save();
        }


        private async findProduct(id: string): Promise<Product>
        {
            let product;

            try
            {
            product = await this.productModel.findById(id);

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

            // return {  
            //     id: product.id,
            //     title: product.title,
            //    decsription: product.decsription,
            //    price: product.price,
            // };
          

        }

        deleteProduct(id: string)
        {
            const index = this.findProduct(id)[1];
            this.products.splice(index,1);
            return "Product ID " + id + " was sucessfully delited";
            
        }
}