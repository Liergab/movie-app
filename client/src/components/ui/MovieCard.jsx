import { Link } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;

const MovieCard = ({ movie }) => {
  return (
    <div key={movie?._id} className="relative ">
      <Link to={`/movies/${movie._id}`}>
        <img
          src={`${BASE_URL}/images/${movie?.image}`}
          alt={movie?.name}
          className="w-full max-w-3xl h-60 rounded m-0 p-0 transition duration-300 ease-in-out transform group-hover:opacity-50"
        />
      </Link>

      <p className="absolute top-[85%] left-[2rem] right-0 bottom-0 opacity-0 transition duration-300 ease-in-out group-hover:opacity-100">
        {movie?.name}
      </p>
    </div>
  );
};

export default MovieCard;