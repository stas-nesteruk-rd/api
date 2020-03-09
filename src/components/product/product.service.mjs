import models from '../../db/models';
import { getCategoryByName } from '../category';

const { Product } = models;

export function getProducts(limit, skip, sort) {
    if(isNaN(limit)){
        limit = 8;
    }
    if(isNaN(skip)){
        skip = 0;
    }
    return Product.find().limit(limit).skip(skip).sort(sort);
}

export async function getProductsByCategory(name) {
    const category = await getCategoryByName(name);
    if (!category) {
        throw new Error("Category doesn't exist");
    }
    await category.populate('products').execPopulate();
    return category.products;
}

export function getProduct(_id) {
    return Product.findOne({ _id });
}

export function searchProducts(query) {
    return Product.find({
        name: { $regex: query, $options: 'i' }
    });
}

export async function deleteProductById(_id) {
    const product = await Product.findOne({ _id });
    console.log(product);
    if (!product) {
        throw new Error("Product doesn't exist");
    }
    await Product.deleteOne({ _id });
    return product;
}

export function saveProduct({
    name,
    description,
    image,
    price,
    count,
    producer,
    category
}) {
    return new Product({
        name,
        description,
        image,
        price,
        count,
        producer: {
            _id: producer._id,
            name: producer.name
        },
        category: {
            _id: category._id,
            name: category.name
        }
    }).save();
}

export async function updateProduct(_id, updatesKey, updates){
    const product = await Product.findOne({_id});
    if(!product){
        throw new Error('Product not found');
    }
    updatesKey.forEach(key => product[key] = updates[key]);
    await product.save();
    return product;
}