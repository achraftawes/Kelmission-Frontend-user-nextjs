import React from 'react';
import Navbar from "@/components/_App/Navbar";
import Home from "@/components/Home/Home";

import FunFactsArea from "@/components/Common/FunFactsArea";
import Footer from "@/components/_App/Footer";
import Team from '@/components/Common/Team';


const Index = () => {
    return (
        <>
            <Navbar />

            <Home />



            <FunFactsArea />

            <Team />

            <Footer />
        </>
    )
}

export default Index;