import HTTP_STATUS from 'http-status';
export async function checkOrderOwnersip(req, res, next){
    const id = req.params.id;
    try{
        const user = req.session.user;
        await user.populate('orders').execPopulate();
        const userOrderIds = user.orders.map(order => order._id.toString());
        const isOwner = userOrderIds.includes(id);
        const bool = !isOwner && user.role !== 'Administrator';
        if(!isOwner && user.role !== 'Administrator'){
            throw new Error();
        }
        next();
    }catch(error){
        res.status(HTTP_STATUS.FORBIDDEN).send({
            error: 'Wrong action'
        });
    }
} 