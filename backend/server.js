const express = require ('express')
const colors =require('colors')
const dotenv = require ('dotenv').config()
const cors =require ('cors')
const {errorHandler} =require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 5000


connectDB()

const app= express()
app.use(cors({
    origin:'http://localhost:3000',
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  }))
app.use(express.json())
app.use(express.urlencoded({extended : false}))

//routes
app.use('/api/goals', require('./routes/goalRoutes'))
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/admin', require('./routes/adminRoutes'))


app.use(errorHandler)

app.listen(port, ()=> console.log(`Server started on port ${port}`))