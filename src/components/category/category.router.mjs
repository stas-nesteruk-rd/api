import express from 'express';
import {
    getCategoriesTreatment,
    deleteCategoryTreatment,
    updateCategoryTreatment,
    createCategoryTreatment
} from './category.controller';
import {
    auth,
    checkPermission
} from '../../middleware';

const router = express.Router();

router.get('/category', getCategoriesTreatment);
router.post('/category', auth, checkPermission, createCategoryTreatment);
router.delete('/category/:id', auth, checkPermission, deleteCategoryTreatment);
router.patch('/category/:id', auth, checkPermission, updateCategoryTreatment);

export { router as categoryRouter };
