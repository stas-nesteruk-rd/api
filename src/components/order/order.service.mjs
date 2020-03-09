import models from '../../db/models';
const { Order, User } = models;

export function saveOrder(userId, orderItems) {
    return new Order({
        userId,
        orderItems
    }).save();
}

export function getAllOrders(){
    return Order.find();
}

export function getOrder(_id) {
    return Order.findOne({ _id });
}

export async function deleteOrder(_id){
    await Order.deleteOne({_id});
}