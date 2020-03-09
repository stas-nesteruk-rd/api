import express from 'express';
import { 
    auth, 
    checkOrderOwnersip 
} from '../../middleware';
import {
    makeOrderTreatment,
    getOrderTreatment,
    getUserOrdersTreatment,
    deleteOrderTreatment
} from './order.controller';

const router = express.Router();

router.post('/order', auth, makeOrderTreatment);
router.get('/order/:id', auth, checkOrderOwnersip, getOrderTreatment);
router.delete('/order/:id', auth, checkOrderOwnersip, deleteOrderTreatment);
router.get('/my-orders', auth, getUserOrdersTreatment);

export { router as orderRouter };
