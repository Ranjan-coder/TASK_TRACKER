require('dotenv').config()
const express = require('express')
const connectDB = require('./config/db')
const app = express()
const cors = require('cors')
const routes = require('./routes/user.routes')
const taskroute = require('./routes/task.routes')

// Middleware to parse incoming JSON requests
app.use(express.json()); // This is important for parsing JSON bodies
app.use(cors())


connectDB()


const port = process.env.PORT || 5555


app.use('/api',routes)
app.use('/api/task',taskroute)

app.listen(port,()=>{
    console.log(`Server running on port number ${port}`)
})