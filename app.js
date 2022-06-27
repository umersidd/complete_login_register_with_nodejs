//console.log('E-Commerce API');
require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cookieParser = require('cookie-parser')

const connectDB = require('./db/connect')

//routers
const authRouter = require('./routes/authroutes')
const userRoutes = require('./routes/userRoutes')

//middleware
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

///app.use(morgan('tiny'))
app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET))


app.get('/api/v1/', (req,res)=>{
    console.log(req.signedCookies)
    res.send('hello')
})

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRoutes)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)


const port = 5000 || process.env.PORT

const start = async ()=>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, ()=>{
            console.log(`Server is listening to the ${port}`)
        })
        
    } catch (error) {
        console.log(error)
        
    }
}

start()
