import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema
({

    title: {type: String, required: true},
    price: {type: Number, required: true},
    category: {type: String, required: true},
    decsription: {type: String, required: true},
    image: {type: String, required: true},
    quantity: {type: Number, required: true}

});

export interface Product extends mongoose.Document
{
         id: string,
         title: string,
         price: number,
         category: string,      
         decsription: string,
         image: string,
         quantity: number
        
}