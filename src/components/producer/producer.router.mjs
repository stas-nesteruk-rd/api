import express from 'express';
const router = express.Router();
import {
    getProducersTreatment,
    createProducerTreatment,
    deleteProducerTreatment,
    updateProducerTreatment
} from './producer.controller';

import {
    auth,
    checkPermission
} from '../../middleware';

router.get('/producer', getProducersTreatment);
router.post('/producer', auth, checkPermission, createProducerTreatment);
router.delete('/producer/:id', auth, checkPermission, deleteProducerTreatment);
router.patch('/producer/:id', auth, checkPermission, updateProducerTreatment);

export { router as producerRouter };
