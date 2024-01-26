import React from 'react';
import Carousel from "../../../UI/Carousel";
import MainBanner from '../../../../assets/Banners/background-main.png';


const slides = [
    {
        image: MainBanner,
        title: "Artykuły",
        description: "Obszerne teksty dot. turystyki \n" +
            "i dziedzictwa kulturowego urozmaicone masą ciekawych zdjęć",

    },
    {
        image: MainBanner,
        title: "Artykuły",
        description: "Obszerne teksty dot. turystyki \n" +
            "i dziedzictwa kulturowego urozmaicone masą ciekawych zdjęć",
    },
    {
        image: MainBanner,
        title: "Artykuły",
        description: "Obszerne teksty dot. turystyki \n" +
            "i dziedzictwa kulturowego urozmaicone masą ciekawych zdjęć",
    },
    {
        image: MainBanner,
        title: "Artykuły",
        description: "Obszerne teksty dot. turystyki \n" +
            "i dziedzictwa kulturowego urozmaicone masą ciekawych zdjęć",
    }
];

const MainBannerComponent = () => {
    return (
        <>
            <Carousel slides={slides}/>
        </>
    );
};

export default MainBannerComponent;
