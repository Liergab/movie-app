import express      from 'express'
import genreRouter  from './genreRoutes.js'
import moviesRouter from './moviesRoutes.js'
import userRouter   from './userRoutes.js'
import uploadRouter from './uploadRoutes.js'

const rootRouter = express.Router()

rootRouter.use('/api/v1/genre',  genreRouter)
rootRouter.use('/api/v1/movies', moviesRouter)
rootRouter.use('/api/v1/users',  userRouter)
rootRouter.use('/api/v1/upload', uploadRouter)



export default rootRouter