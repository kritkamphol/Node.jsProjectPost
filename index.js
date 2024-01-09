const express = require('express')
const app = express()
//const path = require('path')
const ejs = require('ejs')
const mongoose = require('mongoose')
//const BlogPost = require('./models/BlogPost')
const fileUpload = require('express-fileupload')
const expressSession = require('express-session')  //จัดการ session 
const flash = require('connect-flash')

//MVC
const newPostController = require('./controllers/newPost')
const homeController = require('./controllers/home')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')
const aboutController = require('./controllers/about')
const contactController = require('./controllers/contact')
const newUserController = require('./controllers/newUser')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')
const logoutController = require('./controllers/logout')
const myPostController = require('./controllers/myPost')
const editPostController = require('./controllers/editPost')
const updatePostController = require('./controllers/updatePost')
const deletePostController = require('./controllers/deletePost')
const contactPostController = require('./controllers/contactPost')
//Middleware
const validateMiddleWare = require('./middleware/validationmiddleware')
const authMiddleware = require('./middleware/authmiddleware')
const redirectlfAutenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware')

mongoose.connect('mongodb+srv://admin:1234@cluster0.micskb8.mongodb.net/?retryWrites=true&w=majority')

global.loggedIn = null;


app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(fileUpload())
app.use('/posts/store',validateMiddleWare)
app.set('view engine','ejs')
app.use(expressSession({
    secret:"node secret"
}))
app.use("*",(req,res,next)=>{
    loggedIn = req.session.userId;
    next()
})
app.use(flash())


app.get('/',homeController)
app.get('/about',aboutController)
app.get('/post/:id',getPostController )
app.get('/contact',contactController)
app.get('/posts/new',authMiddleware ,newPostController)
app.get('/auth/logout',logoutController)
app.post('/posts/store',authMiddleware,storePostController)
app.get('/auth/register',redirectlfAutenticatedMiddleware,newUserController)
app.post('/users/register',redirectlfAutenticatedMiddleware,storeUserController)
app.get('/auth/login',redirectlfAutenticatedMiddleware,loginController)
app.post('/users/login',redirectlfAutenticatedMiddleware,loginUserController)
app.get('/posts/mypost',authMiddleware,myPostController)
app.get('/posts/edit/:id',authMiddleware,editPostController)
app.post('/posts/update',authMiddleware,updatePostController)
app.get('/posts/delete/:id',authMiddleware,deletePostController)
app.post('/contacts/store',contactPostController)
app.use((req,res) => res.render('notfound'))

app.listen(4000,()=>{
    console.log("App listening on port 4000")
})