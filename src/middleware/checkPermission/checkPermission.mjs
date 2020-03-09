import HTTP_STATUS from 'http-status';

export function checkPermission(req, res, next){
    try{
        const user = req.session.user;
        if(user.role !== 'Administrator'){
            throw new Error();
        }
        next();
    }catch(error){
        res.status(HTTP_STATUS.FORBIDDEN).send({
            error: 'Wrong action'
        })
    }
}