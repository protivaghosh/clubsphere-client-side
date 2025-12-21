import React from 'react';
import Banner from './Banner/Banner';
import FeaturedClubs from './FeaturedClubs/FeaturedClubs';
import HomeEvent from './HomeEvent/HomeEvent';
import HowItWorks from './HowItWorks/HowItWorks';
import ChooseUs from './ChooseUs/ChooseUs';
import CostSection from './CostSection/CostSection';
import StatsSection from './StatsSection/StatsSection';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <FeaturedClubs></FeaturedClubs>
            <HomeEvent></HomeEvent>
            <HowItWorks></HowItWorks>
            <ChooseUs></ChooseUs>
            <CostSection></CostSection>
            <StatsSection></StatsSection>
        </div>
    );
};

export default Home;