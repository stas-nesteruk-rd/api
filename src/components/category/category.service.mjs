import models from '../../db/models';

const { Category } = models;

const capitalizeCategoryName = name =>
    name.charAt(0).toUpperCase() + name.slice(1);

export function getCategories() {
    return Category.find();
}

export function getCategoryByName(name) {
    return Category.findOne({ name: capitalizeCategoryName(name) });
}

export function saveCategory(name) {
    return new Category({
        name,
        url: '/' + name.replace(' ', '-')
    }).save();
}

export async function deleteCategoryById(_id) {
    await Category.deleteOne({ _id });
}

export async function updateCategoryById(_id, name){
    console.log(_id + ' ' + name);
    const category = await Category.findOne({_id});
    console.log(category);
    category.name = name;
    category.url = '/' + name.replace(' ', '-');
    await category.save();
    return category;

}