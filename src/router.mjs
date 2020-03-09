import express from 'express';
import { 
    productRouter, 
    cartRouter, 
    orderRouter, 
    userRouter, 
    categoryRouter,
    producerRouter
} from './components';

const router = express.Router();

router.use('/api', productRouter);
router.use('/api', cartRouter);
router.use('/api', orderRouter)
router.use('/api', userRouter);
router.use('/api', categoryRouter);
router.use('/api', producerRouter);

export { router as apiRouter };
