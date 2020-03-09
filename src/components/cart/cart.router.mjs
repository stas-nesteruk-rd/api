import express from 'express';

import {
    addProductToCartTreatment, 
    getCartTreatment,
    deleteProductFromCartTreatment
} from './cart.controller'
const router = express.Router();

router.get('/shopping-cart', getCartTreatment)
router.post('/shopping-cart', addProductToCartTreatment);
router.delete('/shopping-cart', deleteProductFromCartTreatment);

export { router as cartRouter };