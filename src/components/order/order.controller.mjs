import HTTP_STATUS from 'http-status';
import {
    saveOrder,
    getOrder,
    deleteOrder,
    getAllOrders
} from './order.service';

export async function makeOrderTreatment(req, res) {
    try {
        const products = [];
        if (req.session.cart.products.length > 0) {
            req.session.cart.products.forEach(data => {
                products.push({
                    productId: data.product._id,
                    image: data.product.image,
                    price: data.product.price,
                    name: data.product.name,
                    count: data.count
                });
            });
        } else {
            return res.status(HTTP_STATUS.BAD_REQUEST).send({
                error: 'Cart is empty'
            });
        }

        const orderItems = [
            {
                products,
                totalCost: req.session.cart.totalCost
            }
        ];
        const order = await saveOrder(req.session.user._id, orderItems);
        req.session.cart.totalCost = 0;
        req.session.cart.totalCount = 0;
        req.session.cart.products = [];
        res.status(HTTP_STATUS.CREATED).json({
            products: orderItems[0].products,
            totalCost: orderItems[0].totalCost,
            status: 'created'
        });
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(error);
    }
}

export async function getOrderTreatment(req, res) {
    const id = req.params.id;
    try {
        const order = await getOrder(id);
        res.status(HTTP_STATUS.OK).send(order.orderItems);
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(error);
    }
}

export async function getUserOrdersTreatment(req, res) {
    try {
        const user = req.session.user;
        if (user.role === 'Administrator') {
            const orders = await getAllOrders();
            return res.status(HTTP_STATUS.OK).send(orders);
        }
        await user.populate('orders').execPopulate();
        res.status(HTTP_STATUS.OK).send(user.orders);
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(error);
    }
}

export async function deleteOrderTreatment(req, res) {
    const id = req.params.id;
    try {
        await deleteOrder(id);
        res.status(HTTP_STATUS.OK).send({
            message: 'Order deleted'
        });
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send({
            error: error.message
        });
    }
}
