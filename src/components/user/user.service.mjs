import models from '../../db/models';
import bcrypt from 'bcrypt';
const { User, Order, OrderItem } = models;

export async function findUserByCredential(email, password){
    const user = await User.findOne({ email });
    if(!user){
        throw new Error('Unable to login');
    }
    const isMath = await bcrypt.compare(password, user.password);
    console.log(isMath);
    if(!isMath){
        throw new Error('Unable to login');
    } 
    return user;
}

export function saveUser({
        name,
        gender,
        email,
        password,
        image
}){
    return new User({
        name,
        gender,
        email,
        password,
        image
    }).save();
}

export async function updateUser(_id, updatesKeys, updates){
    const user = await User.findOne({_id});
    updatesKeys.forEach(key => {
        if(key === 'street' || key === 'city'){
            user.address[key] = updates[key]
        }else{
            user[key] = updates[key];
        }
    });
    await user.save();
    return user;
}

export async function deleteUser(_id){
    const user = await User.findOne({_id});
    await user.populate('orders').execPopulate();
    if(user.orders){
        for (let i = 0; i < user.orders.length; i++) {
            await OrderItem.deleteMany({ orderId: user.orders[i]._id});
        }
    }
    await Order.deleteMany({userId: user._id});
    await user.remove();
}

