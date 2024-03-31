import express         from 'express'
import * as controller from '../controller/genreController.js'
import { AdminMiddleware, AuthMiddleware } from '../middleware/AuthMiddlware.js'
const genreRouter = express.Router()

genreRouter.post('/',  [AuthMiddleware, AdminMiddleware], controller.createGenre)
genreRouter.get('/',   [AuthMiddleware,AdminMiddleware], controller.getAllGenre)
genreRouter.put('/:id',     [AuthMiddleware, AdminMiddleware], controller.updateGenre)
genreRouter.delete('/:id',  [AuthMiddleware,AdminMiddleware], controller.deleteGenre)
genreRouter.get('/pagination',     [AuthMiddleware,AdminMiddleware], controller.getAllGenrePagination)
genreRouter.get('/:id/individual', [AuthMiddleware,AdminMiddleware], controller.getGenreById)
export default genreRouter