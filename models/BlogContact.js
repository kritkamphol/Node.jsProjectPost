const mongoose = require('mongoose')
const Schema = mongoose.Schema
const BlogContactSchema = new Schema({
    name: String,
    emailAddress: String,
    phoneNumber: String,
    message:String,
})
const BlogContact = mongoose.model('BlogContact',BlogContactSchema)
module.exports = BlogContact