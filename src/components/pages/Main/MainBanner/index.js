import React from 'react';
import Carousel from "../../../UI/Carousel";
import MainBanner from '../../../../assets/Banners/background-main.png';
import WycieczkiBanner from '../../../../assets/Banners/wycieczki.png';
import FilmyBanner from '../../../../assets/Banners/filmy.png';
import PublicBanner from '../../../../assets/Banners/publikacje.png';





const slides = [
    {
        image: MainBanner,
        title: "Aktualności",
        description: "Obszerne teksty dot. turystyki \n" +
            "i dziedzictwa kulturowego urozmaicone masą ciekawych zdjęć",
        buttonText: "Czytaj więcej",
        link: "/aktualnosci"

    },
    {
        image: PublicBanner,
        title: "Wydarzenia",
        description: "Organizowane przez nas lub prowadzone w ramach współpracy, wycieczki turystyczno-krajoznawcze. Osiedla, miasta, regiony.",
        buttonText: "Zobacz więcej",
        link: "/wydarzenia"
    },
    {
        image: WycieczkiBanner,
        title: "Filmy",
        description: '<p>Mniej lub bardziej poważne materiały filmowe</p> dot. turystyki i kultury',
        buttonText: "Obejrzyj więcej",
        link: "/filmy"
    },
    {
        image: FilmyBanner,
        title: "Publikacje",
        description: "Przygotowane przez nas publikacje tematyczne, opracowania, książki, czasopisma. Udostępnione do pobrania.",
        buttonText: "Czytaj więcej",
        link: "/o-nas#publikacje"

    }
];

const MainBannerComponent = React.memo(() => {
    return (
        <>
            <Carousel slides={slides}/>
        </>
    );
});

export default MainBannerComponent;
