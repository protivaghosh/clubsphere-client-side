import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Lottie from "lottie-react";
import { Autoplay } from "swiper/modules";

// Lottie JSON files import
import animation1 from "../../../../assets/json/login.json";
import animation2 from "../../../../assets/Globe World.json";
import animation3 from "../../../../assets/json/register.json";

const LottieSwiper = () => {
  const animations = [animation1, animation2, animation3];

  return (
    <div className="max-w-xl mx-auto mt-10 h-96"> {/* fixed height for vertical swiper */}
      <Swiper
        direction="vertical"           // ✅ vertical slide
        modules={[Autoplay]}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
          reverseDirection: false,      // ✅ top to bottom
        }}
        className="h-full"
      >
        {animations.map((anim, index) => (
          <SwiperSlide
            key={index}
            className="flex justify-center items-center h-full"
          >
            <div className="w-64 sm:w-80 md:w-96">
              <Lottie animationData={anim} loop={true} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default LottieSwiper;
