const User = require('../models/User')

module.exports = (req,res,next)=>{
    User.findById(req.session.userId).then((user)=>{   // ถ้าไม่มี session id ให้ไปที่หน้าแรก
        if(!user){
            return res.redirect('/')
        }
        console.log('User logged in successfully')
        next();
    }).catch(error=>{
        console.log(error)
    })
}