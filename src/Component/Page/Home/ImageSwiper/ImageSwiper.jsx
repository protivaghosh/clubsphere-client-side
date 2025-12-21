import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

// image import
import img1 from "../../../../assets/image1.png";
import img2 from "../../../../assets/image2.png";
import img3 from "../../../../assets/image3.jfif";

const ImageSwiper = () => {
  const images = [img1, img2, img3];

  return (
    <div className="max-w-xl mx-auto mt-10 h-96">
      <Swiper
        direction="vertical"
        modules={[Autoplay]}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        className="h-full"
      >
        {images.map((img, index) => (
          <SwiperSlide
            key={index}
            className="flex justify-center items-center h-full"
          >
            <img
              src={img}
              alt={`slide-${index}`}
              className="w-64 sm:w-80 md:w-96 object-contain"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageSwiper;
