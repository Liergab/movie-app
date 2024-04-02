import React from 'react'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MovieCard from './MovieCard';
const SliderUI = ({data}) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 4000, // Transition to the next slide every 3 seconds
    arrows: false, // Remove default arrow buttons
    responsive: [
      {
        breakpoint: 768, // For screens smaller than 768px
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  if (data?.length === 1) {
    return <div  className='w-full max-w-96'>
            <MovieCard movie={data[0]} />
          </div>
  }
  if(data?.length === 0){
    return <h1 className="text-2xl font-bold">No Movies</h1>
  }
  return (
   
    <Slider {...settings}>
        {data?.map((movie) => (
          <div key={movie._id} className='p-4 bg-slate-950'>
            <MovieCard  movie={movie} />
          </div>
        
      ))}
    </Slider>
   
  )
}

export default SliderUI
