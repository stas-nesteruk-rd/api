import express from 'express';
import multer from 'multer';
import { 
    getProductsTreatment, 
    getProductsByCategoryTreatment, 
    getProductTreatment, 
    searchProductsTreatment,
    deleteProductByIdTreatment,
    createProductTreatment,
    updateProductTreatment,
    test
} from './product.controller';
import {
    auth,
    checkPermission
} from '../../middleware';

const router = express.Router();

const upload = multer({
    limits: {
        fileSize: 1000000,
    },
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('Please upload a jpg, jpeg or png'))
        }
        cb(undefined, true);
    }
});

router.get('/products', getProductsTreatment);
router.get('/products/search', searchProductsTreatment);
router.get('/products/:id', getProductTreatment);
router.get('/products/category/:category', getProductsByCategoryTreatment);
router.delete('/products/:id', auth, checkPermission, deleteProductByIdTreatment);
router.post('/products', auth, checkPermission, upload.single('image'), createProductTreatment);
router.patch('/products/:id', auth, checkPermission, upload.single('image'), updateProductTreatment);
router.post('/test', upload.single('image'), test);

export { router as productRouter };
