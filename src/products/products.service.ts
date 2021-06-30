import { NotFoundException } from "@nestjs/common";
import { Injectable } from "@nestjs/common";

import {Product} from './product.model'

@Injectable()
export class ProductsService{
    private products: Product[] = [];

    insertProduct(title: string, desc: string, price: number){
        const prodID = Math.random().toString();
        const newProduct = new Product(prodID,title,desc,price);
        this.products.push(newProduct);
        return prodID;
    }

    getProducts()
    {
        //returning a copy of the array
        //using the spread operator "..." 

        console.log(this.products);
        return [...this.products];
    }

    getSingleProduct(productID: string)
    {
        const product = this.findProduct(productID)[0];

        //returning a copy of the array
        //using the spread operator "..." 
        return {...product};

    }

    updateProduct(
        productID: string,
        title: string, 
        desc: string, 
        price: number
        )
        {
            const[product, index] = this.findProduct(productID);
            const updatedProduct = {...product};

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
            this.products[index] = updatedProduct;
        }


        private findProduct(id: string): [Product, number]
        {
            const product = this.products.find(prod => prod.id === id);
            const productIndex = this.products.findIndex(prod => prod.id === id);
            if(!product)
            {
                throw new NotFoundException('could not find products of ID ' + id );
            }

            return [product,productIndex];

        }

        deleteProduct(id: string)
        {
            const index = this.findProduct(id)[1];
            this.products.splice(index,1);
            return "Product ID " + id + " was sucessfully delited";
            
        }
}