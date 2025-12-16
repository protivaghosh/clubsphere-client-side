import React from 'react';
import Navbar from '../../Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../../Footer/Footer';

const RootLayOut = () => {
    return (
        <div className="min-h-screen flex flex-col bg-[#eaeced]">
            <Navbar></Navbar>
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer></Footer>
        </div>
    );
};

export default RootLayOut;