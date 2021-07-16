/*if(process.env.Node_ENV !=='production')
{
    dotenv=require('dotenv')
}
const dotenv=require('dotenv')
dotenv.config()*/
const express=require('express')
const app=express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser= require('body-parser')
const methodOverride=require('method-override')

const indexRouter=require('./routes/index')
const authorRouter=require('./routes/author')
const bookRouter=require('./routes/books')

app.set('view engine', 'ejs')
app.set('views' ,__dirname+'/views')
app.set('layout','layouts/layout')
app.use(expressLayouts)
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ limit:'10mb',extended:false}))
const mongoose= require('mongoose')
//console.log(process.env.DATABASE_URL)
mongoose.connect(mongodb+srv://library:library@cluster0.5jnjs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority ,{useNewUrlParser: true})

const db=mongoose.connection
db.on('error',error => console.error(error))

db.once('open',() => console.log('Connected To Mongoose'))
app.use('/',indexRouter)
app.use('/authors',authorRouter)
app.use('/books',bookRouter)

app.listen(process.env.PORT || 3000)
