import { createSlice } from "@reduxjs/toolkit";



const  moviesSlice = createSlice({
    name:"movies",
    initialState:{
        moviesFilter: {
            searchTerm: "Search 🔎",
            selectedGenre: "",
            selectedYear: "",
            selectedSort: [],
          },
      
          filteredMovies:[], //=> This where we store all the that filtered
          movieYears: [],
          uniqueYear: [],
    },

    reducers:{
        setMoviesFilter: (state, action) => {
            state.moviesFilter = { ...state.moviesFilter,
               ...action.payload };                          //=> search includes name of data
          },
      
          setFilteredMovies: (state, action) => {
            state.filteredMovies = action.payload;  
          },                                                //=> pass ay payload to have a value the filtered movie
      
          setMovieYears: (state, action) => {  
            state.movieYears = action.payload;             //=>  passs ay payload of filtered year
          },
      
          setUniqueYears: (state, action) => {
            state.uniqueYear = action.payload;
          },
    }

})

export const {
    setMoviesFilter,
    setFilteredMovies,
    setMovieYears,
    setUniqueYears,
  } = moviesSlice.actions;
  
  export default moviesSlice.reducer;