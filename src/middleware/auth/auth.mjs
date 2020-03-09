import HTTP_STATUS from 'http-status';
import jwt from 'jsonwebtoken';
import models from '../../db/models';
const { User } = models;

export async function auth(req, res, next) {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.decode(token, process.env.JWT_SECRET || 'secret');
        const user = await User.findOne({
            _id: decoded._id,
            'tokens.token': token
        });
        if (!user) {
            throw new Error();
        }
        req.session.token = token;
        req.session.user = user;
        next();
    } catch (error) {
        res.status(HTTP_STATUS.UNAUTHORIZED).send({
            error: 'Please authenticate.'
        });
    }
}
