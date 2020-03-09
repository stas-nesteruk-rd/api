export default function defineCategoryModel(mongoose) {
    const schema = new mongoose.Schema(
        {
            name: {
                type: String,
                required: true,
                trim: true,
                minlength: 3
            },
            url: {
                type: String,
                required: true,
                trim: true,
                lowercase: true
            }
        },
        {
            timestamps: true
        }
    );

    schema.virtual('products', {
        ref: 'Product',
        localField: '_id',
        foreignField: 'category._id'
    });
    
    const Category = mongoose.model('Category', schema);
    return Category;
}
