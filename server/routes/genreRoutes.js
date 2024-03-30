import express         from 'express'
import * as controller from '../controller/genreController.js'
const genreRouter = express.Router()

genreRouter.post('/', controller.createGenre)
genreRouter.put('/:id', controller.updateGenre)
genreRouter.delete('/:id', controller.deleteGenre)
genreRouter.get('/', controller.getAllGenre)
genreRouter.get('/:id/individual', controller.getGenreById)
export default genreRouter