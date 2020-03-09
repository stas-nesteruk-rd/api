export default function defineProductModel(mongoose) {
    const schema = new mongoose.Schema(
        {
            name: {
                type: String,
                required: true,
                trim: true,
                minlength: 3
            },
            description: {
                type: String,
                required: true,
                trim: true
            },
            image: {
                type: String,
                required: true,
                trim: true
            },
            price: {
                type: Number,
                required: true,
                trim: true,
                validate(value) {
                    if (value < 0) {
                        throw new Error('Price must be a positive number');
                    }
                }
            },
            count: {
                type: Number,
                trim: true,
                default: 0,
                validate(value) {
                    if (value < 0) {
                        throw new Error('Count must be a positive number');
                    }
                }
            },
            producer: {
                _id: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    ref: 'Producer'
                },
                name: String
            },
            category: {
                _id: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    ref: 'Category'
                },
                name: String
            }
        },
        {
            timestamps: true
        }
    );
    const Product = mongoose.model('Product', schema);
    return Product;
}
