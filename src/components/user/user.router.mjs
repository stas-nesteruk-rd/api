import express from 'express';
import multer from 'multer';
const router = express.Router();

import {
    loginUserTreatment,
    signupUserTreatment,
    logoutUserTreatment,
    logoutAllUserTreatment,
    deleteUserTreatment,
    updateUserTreatment,
    getProfileTreatment
} from './user.controller';
import { auth } from '../../middleware/auth/auth.mjs';

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

router.post('/login', loginUserTreatment);
router.post('/signup', upload.single('image'), signupUserTreatment);
router.post('/logout', auth, logoutUserTreatment);
router.post('/logout-all', auth, logoutAllUserTreatment);
router.get('/me', auth, getProfileTreatment);
router.delete('/me', auth, deleteUserTreatment);
router.patch('/me', auth, upload.single('image'), updateUserTreatment);

export { router as userRouter };

