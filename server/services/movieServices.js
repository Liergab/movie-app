import MOVIE_MODEL from "../model/MOVIE_MODEL.js"

// ###########################################
// Admin side

export const createMovie = async(body, res) =>{
    const {name, year, genre, detail, cast, image} = body

    if(!name || !year ||  !detail || !cast || !image ) {
        res.status(400)
        throw new Error('All fields required!')
    }

    const castArray = Array.isArray(cast) ? cast : [cast];

    const castString = castArray.join(', ');

    const movie = await MOVIE_MODEL.create({
        name,
        year,
        genre,
        detail,
        cast: castString,   
        image,
        numReviews:5
    })

    return movie
}

export const updateMovie = async (body, id, res) => {
    const { name, year, genre, detail, cast,image } = body;
    const castArray = Array.isArray(cast) ? cast : [cast];
    const castString = castArray.join(', ');

    const updateFields = {
      cast: castString,
      numReviews: 5,
    };
  
    if (name) updateFields.name = name;
    if (year) updateFields.year = year;
    if (genre) updateFields.genre = genre;
    if (detail) updateFields.detail = detail;
    if (castString) updateFields.cast = castString;
    if(image)updateFields.image = image
  
    const movie = await MOVIE_MODEL.findByIdAndUpdate(id, { $set: updateFields }, { new: true });
    return movie;
  };

  export const deleteMovie = async(id) => {

    const movie = await MOVIE_MODEL.findByIdAndDelete(id)

    return movie
  }

  export const deleteComment  = async (body, res) => {
    const {movieId, reviewId} = body

    const movie = await MOVIE_MODEL.findById(movieId)

    if(!movie){
        res.statu(404)
        throw new Error('No movie found')
    }

    const reviewIndex = movie.reviews.findIndex((r) => (
        r._id.toString() === reviewId
    ))

    if(reviewIndex === -1){
        res.statu(404)
        throw new Error('No comment found')
    }

    movie.reviews.splice(reviewIndex, 1);
    movie.numReviews = movie.reviews.length;
    movie.rating =
      movie.reviews.length > 0
        ? movie.reviews.reduce((acc, item) => item.rating + acc, 0) /
          movie.reviews.length
        : 0;

    await movie.save();

    res.status(201).json({ message: "Succefully Comment remove" });

  }
  
//   ##############################################################################
// public side

export const getAllMovies = async() => {

     const movie = await MOVIE_MODEL.find()

     return movie
}

export const getSpecificMovie = async(id) => {

    const movie = await MOVIE_MODEL.findById(id)

    return movie
}

export const getNewMovies = async() => {

    const movie = await MOVIE_MODEL.find().sort({createdAt: -1}).limit(10)

    return movie
}

export const getTopMovies = async() => {
    
    const movie = await MOVIE_MODEL.find().sort({numReviews: -1}).limit(10)

    return movie
}

export const getRandomMovies = async() => {

    const movie = await MOVIE_MODEL.aggregate([{$sample:{size:10}}])

    return movie
}


// #######################################################################
//protected

export const movieReview = async(body, id, res, req) => {
    const{comment, rating} = body

    const movie = await MOVIE_MODEL.findById(id)

    if(movie){
        const isAlreadyReviewed = movie.reviews.find((r) =>(
            r.user.toString() === req.user?._id.toString()
        ))

        if(isAlreadyReviewed){
            res.status(409)
            throw new Error('Already Reviewed!')
        }

        
      const review = {
        name: req.user?.username,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      movie.reviews.push(review)
      movie.numReviews = movie.reviews.length;

    //   total average of all reviews
      movie.rating =
        movie.reviews.reduce((acc, item) => item.rating + acc, 0) /
        movie.reviews.length;

      await movie.save();

      res.status(201).json({ message: "Review Added" });
    }

}