import HTTP_STATUS from 'http-status';
import { 
    getCategories,
    saveCategory,
    deleteCategoryById,
    updateCategoryById
} from './category.service';

export async function getCategoriesTreatment(req, res){
    try{
        const categories = await getCategories();
        res.status(HTTP_STATUS.OK).send(categories);
    }catch(error){
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(error);
    }
}

export async function deleteCategoryTreatment(req, res){
    const id = req.params.id;
    try{
        deleteCategoryById(id);
        res.status(HTTP_STATUS.OK).send();
    }catch(error){
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(error);
    }
}

export async function updateCategoryTreatment(req, res){
    const id = req.params.id;
    const update = req.body;
    const updatesKeys = Object.keys(update);
    const allowedUpdate = ['name'];
    const isValidateOperation = updatesKeys.every( key => allowedUpdate.includes(key));
    if(!isValidateOperation){
        res.status(HTTP_STATUS.BAD_REQUEST).send();
    }
    try{
        const category = await updateCategoryById(id, update.name);
        res.status(HTTP_STATUS.OK).send(category);
    }catch(error){
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(error);
    }
}

export async function createCategoryTreatment(req, res){
    try{
        if(!req.body.name){
            return res.status(HTTP_STATUS.BAD_REQUEST).send();
        }
        const category = await saveCategory(req.body.name);
        res.status(HTTP_STATUS.CREATED).send(category);
    }catch(error){
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(error);
    }
}