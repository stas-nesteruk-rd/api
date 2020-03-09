import HTTP_STATUS from 'http-status';
import { getProduct } from '../product/product.service';
import { getCategories } from '../category';

export async function getCartTreatment(req, res) {
    try {
        if (!req.session.cart) {
            return res.status(HTTP_STATUS.BAD_REQUEST).send();
        }
        res.status(HTTP_STATUS.OK).send({
            products: req.session.cart.products,
            totalCost: req.session.cart.totalCost,
            totalCount: req.session.cart.totalCount,
        });
    } catch (error) {
        res.status(HTTP_STATUS.BAD_REQUEST).send(error);
    }
}

export async function addProductToCartTreatment(req, res) {
    if (!req.body.id || !req.body.count) {
        return res.status(HTTP_STATUS.BAD_REQUEST).send();
    }
    try {
        const product = await getProduct(req.body.id);
        if (!product) {
            return res.status(HTTP_STATUS.NOT_FOUND).send();
        }
        const index = req.session.cart.products.findIndex(
            product => product.product._id === req.body.id
        );
        console.log('INDEX' + index);
        let totalCost;
        let totalCount;
        if (index < 0) {
            req.session.cart.products.push({
                product,
                count: req.body.count
            });
        } else {
            req.session.cart.products[index].count += req.body.count;
        }

        totalCost = req.session.cart.totalCost;
        totalCount = req.session.cart.totalCount;
        totalCost += product.price * req.body.count;
        totalCount += req.body.count;
        req.session.cart.totalCost = totalCost;
        req.session.cart.totalCount = totalCount;
        res.status(HTTP_STATUS.OK).json({
            status: 'Product added to cart',
            totalCost,
            totalCount
        });
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(error);
    }
}

export async function deleteProductFromCartTreatment(req, res){
    if(!req.body.id || !req.body.count){
        return res.status(HTTP_STATUS.BAD_REQUEST).send()
    }
    try{
        const product = await getProduct(req.body.id);
        if(!product){
            return res.status(HTTP_STATUS.NOT_FOUND).send();
        }
        const index = req.session.cart.products.findIndex(
            product => product.product._id === req.body.id
        )
        if(index < 0){
            return res.status(HTTP_STATUS.BAD_REQUEST).send();
        }
        let count = req.session.cart.products[index].count;
        let totalCount = req.session.cart.totalCount;
        let totalCost = req.session.cart.totalCost;
        count -= req.body.count;
        if(count < 0){
            return res.status(HTTP_STATUS.BAD_REQUEST).send('Wrong count number');
        }
        if(count === 0){
            req.session.cart.products.splice(index, 1); 
        }else{
            req.session.cart.products[index].count -= req.body.count;
        }
        totalCount -= req.body.count;
        totalCost -= product.price * req.body.count;
        req.session.cart.totalCost = totalCost;
        req.session.cart.totalCount = totalCount;
        res.status(HTTP_STATUS.OK).json({
            status: 'Product removed from cart',
            totalCost,
            totalCount
        });
    }catch(error){
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(error);
    }
}

function refreshTotalCost(){       //TODO

}