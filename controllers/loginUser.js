//Process ที่ใ้ช้ในการ check user
const bcrypt = require('bcrypt')
const User = require('../models/User')


module.exports = (req,res)=>{
    const {username,password} = req.body
    User.findOne({username: username}).then((user)=>{
        if(user){
            let cmp = bcrypt.compare(password,user.password).then((match)=>{
                if(match){
                    req.session.userId = user._id
                    res.redirect('/')
                }else{
                    res.redirect('/auth/login')
                }
                
            })

            }else{
                res.redirect('/auth/login')
            }
        
    })
}