import React from 'react'
import Footer from "../Components/Footer";
import TypingBox from "../Components/TypingBox";
import Header from '../Components/Header';

const HomePage = () => {
    return (
            <div className="canvas">
                <Header />
                <TypingBox />
                <Footer />
            </div>
    )
}

export default HomePage