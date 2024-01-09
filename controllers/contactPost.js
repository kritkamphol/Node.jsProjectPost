const BlogContact = require('../models/BlogContact')
const path = require('path')

module.exports = async(req,res)=>{
    await BlogContact.create({
        ...req.body,
    }).then(()=>{
        console.log('Data is fullfilled.')
        res.redirect('/')
    }).catch(err=>{
        console.log(err)
    })
}