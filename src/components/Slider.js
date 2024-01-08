import React, { useState } from "react";
import Slider from "react-slick";

const SlickSlider = ({ images }) => {
   const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
   };

   return (
      <div className="text-black text-center">
         <Slider {...settings}>
            {images?.length > 0 &&
               images.map((image, index) => (
                  <div key={index} className="bg-black flex px-12 h-[320px]">
                     <img
                        src={image}
                        alt={`slider-${index}`}
                        className="object-contain m-auto h-full"
                     />
                  </div>
               ))}
         </Slider>
      </div>
   );
};

export default SlickSlider;
