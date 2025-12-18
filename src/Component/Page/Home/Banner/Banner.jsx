import React from 'react';
import { Link } from 'react-router-dom';
import Lottie from 'lottie-react';
import imgLotti from '../../../../assets/Globe World.json';
import img2 from '../../../../assets/json/login.json'
import img3 from '../../../../assets/json/register.json'
import LottieSwiper from '../LottieSwiper/LottieSwiper';

const Banner = () => {
    return (
        <section className="bg-gray-50 my-20 max-w-7xl mx-auto rounded-xl">
            <div className="px-6 lg:px-12 flex flex-col-reverse lg:flex-row items-center justify-between py-16 lg:py-20 gap-12">

                {/* Left Text Section */}
                <div className="lg:w-1/2 text-center lg:text-left space-y-6">
                    <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
                        Discover Local Clubs & Events
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Join communities, explore hobbies, and connect with people who share your passions. 
                        ClubSphere helps you manage and participate in local clubs seamlessly.
                    </p>

                    <div className="flex justify-center lg:justify-start gap-4">
                        <Link
                            to="/clubs"
                            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
                        >
                            Explore Clubs
                        </Link>
                        <Link
                            to="/events"
                            className="px-6 py-3 bg-white text-blue-600 font-medium rounded-lg border border-blue-600 hover:bg-blue-50 transition"
                        >
                            View Events
                        </Link>
                    </div>
                </div>

                {/* Right Animation Section */}
                <div className="lg:w-1/2 flex justify-center">
                    <div className="w-64 sm:w-80 md:w-96 lg:w-[420px]">
                       <LottieSwiper></LottieSwiper>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Banner;
