import React from 'react';
import Carousel from "../../../UI/Carousel";
import MainBanner from '../../../../assets/Banners/background-main.png';
import WycieczkiBanner from '../../../../assets/Banners/wycieczki.png';
import FilmyBanner from '../../../../assets/Banners/filmy.png';
import PublicBanner from '../../../../assets/Banners/publikacje.png';





const slides = [
    {
        image: MainBanner,
        title: "Artykuły",
        description: "Obszerne teksty dot. turystyki \n" +
            "i dziedzictwa kulturowego urozmaicone masą ciekawych zdjęć",
        buttonText: "Czytaj więcej",
        link: "/aktualnosci"

    },
    {
        image: WycieczkiBanner,
        title: "Wycieczki tematyczne",
        // description: "Obszerne teksty dot. turystyki \n" +
        //     "i dziedzictwa kulturowego urozmaicone masą ciekawych zdjęć",
        buttonText: "Zobacz więcej",
        link: "/wycieczki"
    },
    {
        image: FilmyBanner,
        title: "Filmy",
        description: "Mniej lub bardziej poważne materiały filmowe dot. turystyki i kultury",
        buttonText: "Obejrzyj więcej",
        link: "/filmy"
    },
    {
        image: PublicBanner,
        title: "Publikacje",
        // description: "Obszerne teksty dot. turystyki \n" +
        //     "i dziedzictwa kulturowego urozmaicone masą ciekawych zdjęć",
        buttonText: "Czytaj więcej",

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
