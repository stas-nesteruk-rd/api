import HTTP_STATUS from 'http-status';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import {
    getProducts,
    getProductsByCategory,
    getProduct,
    searchProducts,
    saveProduct,
    deleteProductById,
    updateProduct
} from './product.service';
import { getCategories, getCategoryByName } from './../category';
import { getProducers, getProducerByName } from './../producer';

export async function getProductsTreatment(req, res) {
    const sort = {};
    try {
        if(req.query.sortBy){
            const parts = req.query.sortBy.split(':');
            sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;    
        }
        const products = await getProducts(parseInt(req.query.limit), parseInt(req.query.skip), sort);
        res.status(HTTP_STATUS.OK).send(products);
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(error.message);
    }
}

export async function getProductsByCategoryTreatment(req, res) {
    const category = req.params.category;
    try {
        const products = await getProductsByCategory(category);
        res.status(HTTP_STATUS.OK).send(products);
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(error);
    }
}

export async function getProductTreatment(req, res) {
    const id = req.params.id;
    try {
        const product = await getProduct(id);
        if (!product) {
            return res.status(HTTP_STATUS.NOT_FOUND).send();
        }
        res.status(HTTP_STATUS.OK).send(product);
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(error);
    }
}

export async function searchProductsTreatment(req, res) {
    let query = {};
    let products = [];
    if (!req.query.value) {
        return res.status(HTTP_STATUS.BAD_REQUEST).send();
    }
    try {
        query = req.query.value;
        products = await searchProducts(query);
        res.status(HTTP_STATUS.OK).send(products);
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(products);
    }
}

export async function deleteProductByIdTreatment(req, res) {
    const id = req.params.id;
    try {
        const product = deleteProductById(id);
        res.status(HTTP_STATUS.OK).send(product);
    } catch (error) {
        console.log(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send();
    }
}

export async function test(req, res) {
    try {
        const category = {
            name: 'Smart watch'
        };
        const url = await saveImage(req.file, category);
        res.send({
            url
        });
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(error.message);
    }
}

async function saveImage(file, category) {
    const categoryPath = category.name.replace(' ', '-').toLowerCase();
    const publicFolderName = '/public';
    const dest = '/media/' + categoryPath + '/';
    const nm = file.originalname.match(/(.+?)(\.[^.]*$|$)/);
    const imageName = nm[1] + Date.now() + '.png';
    if (!fs.existsSync(path.join(process.cwd(), publicFolderName + dest))) {
        fs.mkdirSync(path.join(process.cwd(), publicFolderName + dest));
    }
    const imagePath = path.join(process.cwd(), publicFolderName + dest + imageName);
    await sharp(file.buffer)
        .resize({ width: 400, height: 400 })
        .png()
        .toFile(imagePath);
    return dest + imageName;
}

export async function createProductTreatment(req, res) {
    const requiredFields = [
        'name',
        'description',
        'price',
        'producer',
        'category'
    ];
    const createKeys = Object.keys(req.body);
    const isValidOperation = requiredFields.every(field =>
        createKeys.includes(field)
    );
    if (!isValidOperation) {
        return res.status(HTTP_STATUS.BAD_REQUEST).send();
    }
    try {
        const { producer, category } = req.body;
        const findedProducer = await getProducerByName(producer);
        if (!findedProducer) {
            return res.status(HTTP_STATUS.BAD_REQUEST).send('Wrong producer');
        }
        const findedCategory = await getCategoryByName(category);
        if (!findedCategory) {
            return res.status(HTTP_STATUS.BAD_REQUEST).send('Wrong category');
        }
        const image = await saveImage(req.file, findedCategory);
        const data = req.body;
        data.producer = findedProducer;
        data.category = findedCategory;
        data.image = image;
        let count;
        if (!req.body.count) {
            count = 0;
        } else {
            count = req.body.count;
        }
        data.count = count;
        const product = await saveProduct(data);
        res.status(HTTP_STATUS.CREATED).send(product);
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(error);
    }
}

export async function updateProductTreatment(req, res) {
    const id = req.params.id;
    const updatesKeys = Object.keys(req.body);
    const allowedUpdates = [
        'name',
        'description',
        'price',
        'producer',
        'category',
        'count'
    ];
    const isValidOperation = updatesKeys.every(key =>
        allowedUpdates.includes(key)
    );
    if (!isValidOperation && !req.file) {
        return res.status(HTTP_STATUS.BAD_REQUEST).send();
    }
    try {
        const data = req.body;
        const product = await getProduct(id);
        if(!product){
            throw new Error('Product doesn\'t exist');
        }
        if(req.body.producer){
            const producer = await getProducerByName(req.body.producer);
            if(!producer){
                throw new Error('Wrong producer');
            }
            data.producer = producer;
        }
        let category;
        if(req.body.category){
            category = await getCategoryByName(req.body.category);
            if(!category){
                throw new Error('Wrong category');
            }
            data.category = category;
        }else{
            category = product.category;
        } 
        let image;
        if(req.file){
            image = await saveImage(req.file, category);
            updatesKeys.push('image');
            data.image = image;
        }
        const updatedProduct = await updateProduct(id, updatesKeys, data);
        res.status(HTTP_STATUS.OK).send(updatedProduct);
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(error);
    }
}
