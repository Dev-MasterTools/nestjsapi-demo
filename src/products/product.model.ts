import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({

    title: {type: String, required: true},
    price: {type: Number, required: true},
    category: {type: String, required: false},
    decsription: {type: String, required: false},
    image: {type: String, required: false},
    quantity: {type: Number, required: false}

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