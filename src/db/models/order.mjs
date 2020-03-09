export default function defineOrderModel(mongoose) {
    const orderItemSchema = mongoose.Schema({
        products: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    ref: 'Product'
                },
                image: String,
                price: Number,
                name: String,
                count: Number
            }
        ],
        totalCost: Number
    });

    const schema = mongoose.Schema(
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'User'
            },
            orderItems: [orderItemSchema]
        },
        {
            timestamps: true
        }
    );

    schema.virtual('products',{
        ref: 'OrderItem',
        localField: '_id',
        foreignField: 'orderId'
    });

    const Order = mongoose.model('Order', schema);
    return Order;
}
