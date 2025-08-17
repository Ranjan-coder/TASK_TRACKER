const jwt = require('jsonwebtoken')
const secretkey = process.env.JWT_SECRET

const AuthMiddleware = (req,res,next)=>{

    const authorizationHeader = req.headers['authorization']
if (!authorizationHeader) {
    return res.status(401).json({ message: "Authorization header is missing" });
}

// this token contain with bearer 
    // console.log('token:',authorizationHeader);

    // to remove the bearer token 
    const jwtToken = authorizationHeader.split(' ')[1]
    // console.log(jwtToken);

    if(jwtToken){
    jwt.verify(jwtToken,secretkey,(err,validate)=>{
        if(err){
            return res.status(401).json({ msg: 'Invalid or expired token', error: err.message });
        }
        if(validate){
            return next()
        }
        return res.status(401).json({ msg: 'User is not authorized' });
    })
}
else{
    return res.status(400).json({ msg: "Token is missing" });
}
}


module.exports = AuthMiddleware
