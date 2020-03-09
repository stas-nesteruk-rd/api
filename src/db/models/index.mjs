import mongoose from '../mongoose.mjs';
import validator from 'validator';

import defineProducer from './producer';
import defineCategory from './category';
import defineProduct from './product';
import defineUser from './user';
import defineOrder from './order';

const models = {};

models.Producer = defineProducer(mongoose);
models.Category = defineCategory(mongoose);
models.Product = defineProduct(mongoose);
models.User = defineUser(mongoose, validator);
models.Order = defineOrder(mongoose);

export default models;
