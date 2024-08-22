import { json } from 'express';
import Product from '../models/products.js'

export const getProducts = async (req,res) =>{
    try{
        const products = await Product.find();
        console.log(products)

        if (products.length < 1){
            res.json({message:'No hay productos'})
        }else{
            res.json(products)
        }
    }catch(error){
        res.status(500).json({message:error.message})
    }
}


export const createProduct = async (req,res) =>{
    const {name,description,price,category,imageUrl,stock,createdAt} = req.body

    try{
        const product = new Product({
            name,
            description,
            price,
            category,
            imageUrl,
            stock,
            createdAt,

        })

        await product.save()
        res.status(201).json(product)
    }catch(error){
        res.status(400).json({message:'Error creating new product:',error})
    }
}

export const deleteProduct = async(req,res) => {
    const {id} = req.params
    try{
        const productId = await Product.findById(id)
        if(!productId){
            return res.status(404).json({message:'Id nof found'})
        }

        await Product.deleteOne({_id:id})
        res.status(200).json({message:'Product deleted successfully'})
    }
    catch(error){
        res.status(500).json({message:error.meesage})
    }
}


export const putProduct = async(req,res) =>{
    const {id} = req.params
    const {name,description,price,category,imageUrl,stock,createdAt} = req.body

    const updatedProduct = {
        "name":name,
        "description":description,
        "price":price,
        "category":category,
        "imageUrl":imageUrl,
        "stock":stock,
        "createdAt":createdAt,
    }

    try{
        const product = await Product.findByIdAndUpdate(id,updatedProduct,{ new: true, runValidators: true })
        if(!product){
            return res.status(404).json({message:'Id nof found'})
        }
        res.status(201).json({message:'Product updated successfully',product})
    }catch(error){
        res.status(500).json({message:error.message})
    }

}

export const patchProduct = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    // Contar el número de campos en el objeto de actualización
    const numberOfFields = Object.keys(updates).length;

    if (numberOfFields > 1) {
        return res.status(400).json({ message: 'With this method, the request can only contain one parameter' });
    }
    try {
        const product = await Product.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};