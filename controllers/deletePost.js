const BlogPost = require('../models/BlogPost')

module.exports = async(req,res) =>{
    await BlogPost.findOneAndDelete({ _id: req.params.id})
    res.redirect('/posts/mypost')
}