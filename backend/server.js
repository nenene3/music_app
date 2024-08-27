import express from 'express'
import {notFound,errorHandler} from './middlewares/errorHandler.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import userRoute from './routes/userRoute.js'
import musicRoute from './routes/musicRoute.js'
import { protect } from './middlewares/authHandler.js'

import 'dotenv/config.js'

const app = express()

app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true
  }));
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))

app.use('/users',userRoute)
app.use('/music',musicRoute)


app.all('/static/*',protect) //my auth check with cookies
app.use('/static',express.static(process.env.MUSIC_FOLDER))

app.use(notFound)
app.use(errorHandler)

const localDB = process.env.LOCAL_MONGODB
mongoose.connect(localDB).then(()=>console.log('connected  '+localDB))

const port = process.env.PORT
app.listen(port,()=>console.log("connected  "+port))