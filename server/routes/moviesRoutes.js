import express         from 'express'
import * as controller from '../controller/movieController.js'
import {AdminMiddleware, AuthMiddleware } from '../middleware/AuthMiddlware.js'
const moviesRouter = express.Router()


//Admin side
moviesRouter.post('/create-movie',[AuthMiddleware, AdminMiddleware], controller.createMovie)
moviesRouter.put('/update-movie/:id', [AuthMiddleware, AdminMiddleware], controller.updateMovie)
moviesRouter.delete('/delete-movie/:id', [AuthMiddleware ,AdminMiddleware], controller.deleteMovie)
moviesRouter.delete("/delete-comment", [AuthMiddleware, AdminMiddleware], controller.deleteComment)


// Restricted Routes
moviesRouter.post("/:id/reviews", [AuthMiddleware],controller.movieReview);

//public side
moviesRouter.get("/all-movies", controller.getAllMovies);
moviesRouter.get("/specific-movie/:id", controller.getSpecificMovie);
moviesRouter.get("/new-movies", controller.getNewMovies);
moviesRouter.get("/top-movies", controller.getTopMovies);
moviesRouter.get("/random-movies", controller.getRandomMovies);

export default moviesRouter