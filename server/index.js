import                   'dotenv/config.js'
import express       from 'express';
import cookieParser  from 'cookie-parser';
import path          from 'path'
import rootRouter    from './routes/index.js';
import db            from './config/db.js';
import {PageNotFound, error} from './middleware/ErrorMiddleware.js';

const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

// routes

app.use(rootRouter)
app.use(PageNotFound)
app.use(error)

app.listen(PORT,() => {
    console.log(`http://localhost:${PORT}`)
    db()
})