import                   'dotenv/config.js'
import express       from 'express';
import cookieParser  from 'cookie-parser';
import rootRouter    from './routes/index.js';
import db            from './config/db.js';
import cors          from 'cors'
import {PageNotFound, error} from './middleware/ErrorMiddleware.js';

const app = express()
const PORT =  process.env.PORT 

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: 'https://brygab-movie-app.vercel.app/', // Replace with your frontend's URL
}))
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))


// routes

app.use(rootRouter)
app.use(PageNotFound)
app.use(error)

app.listen(PORT,() => {
    console.log(`http://localhost:${PORT}`)
    db()
})