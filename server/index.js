import                   'dotenv/config.js'
import express       from 'express';
import cookieParser  from 'cookie-parser';
import rootRouter    from './routes/index.js';
import db            from './config/db.js';
import cors          from 'cors'
import {PageNotFound, error} from './middleware/ErrorMiddleware.js';

import http from 'http'
import  { initiateSocketIO } from './config/socketIO.js';

const app = express()
const PORT =  process.env.PORT 

app.use(express.json())
app.use(cookieParser())

app.use(cors())
app.use(cors({
    credentials: true,
    // origin: 'https://review-movie-app.netlify.app', // set this when deployment
    origin: 'http://localhost:5173',
}))

const server = http.createServer(app)



app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))


// routes

app.use(rootRouter)
app.use(PageNotFound)
app.use(error)

initiateSocketIO(server)

server.listen(PORT,() => {
    console.log(`http://localhost:${PORT}`)
    db()
})
