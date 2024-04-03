import React, { useEffect }      from 'react'
import { useDispatch, 
        useSelector }            from 'react-redux'
import { useAllGenreQuery }      from '../../services/redux/api/genre'
import banner                    from '../../assets/banner.jpg'
import { useGetAllMoviesQuery, 
         useGetNewMoviesQuery, 
         useGetRandomMoviesQuery, 

         useGetTopMoviesQuery }  from '../../services/redux/api/movie'
import { setFilteredMovies, 
         setMovieYears, 
         setMoviesFilter,
         setUniqueYears }        from '../../services/redux/features/movie/movislice'
         
import MovieFilteredCard         from '../../components/ui/MovieFilteredCard'


const AllMovie = () => {

  const dispatch = useDispatch()

  const{data:allMovie, isLoading} = useGetAllMoviesQuery()
  const{data:newMovies}      = useGetNewMoviesQuery()
  const{data:randomMovies}  = useGetRandomMoviesQuery()
  const{data:topMovies}    = useGetTopMoviesQuery()
  const{data:genres}      = useAllGenreQuery()

  const {moviesFilter, filteredMovies} = useSelector((state) => state.movies)

  const movieyear =  allMovie?.map((movie) => (movie?.year))
  const uniqueMovieYear = Array.from(new Set(movieyear))

  useEffect(() => {
    dispatch(setFilteredMovies(allMovie || []));
    dispatch(setMovieYears(movieyear)),
    dispatch(setUniqueYears(uniqueMovieYear))

  },[allMovie, dispatch])

  //set value in searchTerm uing the e.target.value from input
  // filtered the allmovie name if the e.target.value has include in the movie name
  const handleSearchChange = (e) => {
    dispatch(setMoviesFilter({searchTerm:e.target.value}))
    
    const filteredMovies = allMovie.filter((movie) =>
      movie.name.toLowerCase().includes(e.target.value.toLowerCase())
    );

    dispatch(setFilteredMovies(filteredMovies));

  }

  // paramater genreId from onchange and filter allMovie that the genre is genreId
  const handleGenreClick = (genreId) => {
    const filterByGenre = allMovie.filter((movie) => movie.genre === genreId);
    dispatch(setFilteredMovies(filterByGenre));
  };

  // filter the year if in allmovie to get the all movie by the the value of year parameter
  const handleYearChange = (year) => {
    const filterByYear = allMovie.filter((movie) => movie.year === +year);
    dispatch(setFilteredMovies(filterByYear));
  };

  // used the diff get api and pass to the filteredMovie
  const handleSortChange = (sortOption) => {
    switch (sortOption) {
      case "new":
        dispatch(setFilteredMovies(newMovies));
        break;
      case "top":
        dispatch(setFilteredMovies(topMovies));
        break;
      case "random":
        dispatch(setFilteredMovies(randomMovies));
        break;

      default:
        dispatch(setFilteredMovies([]));
        break;
    }
  };

  if(isLoading){
    return <h1>Loading..</h1>
  }
  

  return (
    <div className="w-full h-[50rem] bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${banner})` }}>
      <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-black opacity-70"></div>
      <div className='absolute z-10  w-full h-10 top-48'>
        <div className='relative text-center space-y-6 '>
          <h1 className='text-3xl md:text-6xl font-bold text-white'>THE NETMOVIES</h1>
          <p className="text-sm text-white font-semibold px-12 md:px-10">
              Movies on Demand, Whenever the Mood Strikes, with NetMovies
          </p>
        </div>
      </div>
      <section className="absolute top-[400px] w-full z-10">
          <div className='text-center space-y-4 px-4 md:px-0'>

            <input 
              type="text" 
              placeholder='Search Movie 🔎' 
              value={moviesFilter.searchTerm}
              className='p-4 border-2 border-slate-950 rounded-md w-full max-w-96' 
              onChange={handleSearchChange}
            />

            <div className='flex flex-wrap items-center w-full justify-center gap-1 md:gap-4'>
                <select
                  // value={moviesFilter.selectedGenre}
                  //the value of this is the id of genre
                  onChange={(e) => handleGenreClick(e.target.value)}
                  className='p-1 rounded-md border-2 border-white cursor-pointer'
                >
                  <option value="">Genres</option>
                  {genres?.map((genre) => (
                    <option key={genre._id} value={genre._id}>
                      {genre.name}
                    </option>
                  ))}
                </select>
                <select
                  //the value of this is the year that new set
                  onChange={(e) => handleYearChange(e.target.value)}
                  className='p-1 rounded-md border-2 border-white cursor-pointer'
                >
                   <option value="">Year</option>
                  {uniqueMovieYear.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                <select
                  className='p-1 rounded-md border-2 border-white cursor-pointer'
                  //the value of this is new | top | random
                  onChange={(e) => handleSortChange(e.target.value) } 
                >
                  <option value="" >Sort By</option>
                  <option value="new">New Movies</option>
                  <option value="top">Top Movies</option>
                  <option value="random">Random Movies</option>
                </select>
            </div>
          </div>
      </section>
      <section className='absolute w-full h-auto  bg-slate-900 top-[460px] flex justify-center items-center flex-wrap px-4'>
        <MovieFilteredCard movies={filteredMovies} />
        <h1 className='text-2xl font-bold'>{filteredMovies.length === 0  &&  "No movie found" }</h1> 
      </section>
    </div>
  )
}

export default AllMovie
