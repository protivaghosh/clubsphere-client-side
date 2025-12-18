import React from 'react';
import Banner from './Banner/Banner';
import FeaturedClubs from './FeaturedClubs/FeaturedClubs';
import HomeEvent from './HomeEvent/HomeEvent';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <FeaturedClubs></FeaturedClubs>
            <HomeEvent></HomeEvent>
        </div>
    );
};

export default Home;