const User = require('../models/User');

const auth = (req,res,next)=>{

    const token = req.cookies.x_auth;

    User.findIdByToken(token,(err,user)=>{
        if(!user)return res.json({
            AuthSuccess:false
        })
        
        req.token=token;
        req.user=user;

        next();
    });

}

module.exports=auth;