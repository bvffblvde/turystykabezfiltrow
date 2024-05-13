import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Routes, useNavigate} from 'react-router-dom';
import {CssBaseline} from "@material-ui/core";
import ReactGA from 'react-ga';

import MainPage from "./components/pages/Main";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

import {ThemeProvider} from "./theme/themeContext";
import PostDetails from "./components/pages/PostPageComponent";
import ProjectDetails from "./components/pages/ProjectPageComponent";
import DocumentPage from "./components/pages/Document";
// import {FloatingButtonProvider} from "./components/UI/FloatingButton/FloatingButtonContext";
import {FontSizeProvider} from "./components/UI/FontSizeChange/FontSizeContext";
import BydgoszczPage from "./components/pages/Category/BydgoszczPage";
import KrajePage from "./components/pages/Category/KrajePage";
import RegionyPage from "./components/pages/Category/RegionyPage";
import ActualsPageComponent from "./components/pages/Category/ActualsPage";
import WycieczkiPageComponent from "./components/pages/Category/WycieczkiPage";
import FilmyPage from "./components/pages/Filmy";
import Wyszukiwarka from "./components/pages/Search";
import BydgoszczPostsPage from "./components/pages/Category/SubCategoryPages/BydgoszczPosts";
import RegionyPostsPage from "./components/pages/Category/SubCategoryPages/RegionyPosts";
import SeasonPageComponent from "./components/pages/Season";
import About from "./components/pages/About";

import {HelmetProvider} from 'react-helmet-async';
import Sklep from "./components/pages/Sklep";
import ProductPage from "./components/pages/ProductPage";
import CartPage from "./components/pages/CartPage";
import PayPage from "./components/pages/PayPage";

const helmetContext = {};

ReactGA.initialize('G-B6XDVLHYFK');


const RedirectOldUrl = () => {
    const navigate = useNavigate();


    useEffect(() => {
        // Проверка, что текущий путь — старый URL /szlaki/
        if (window.location.pathname === '/szlaki/') {
            // Перенаправление на новый URL /artykuly/bartodzieje-szlak
            navigate('/aktualnosci/bartodzieje-szlak', {replace: true});
        } if (window.location.pathname === '/projekty') {
            navigate('/o-nas#projekty', {replace: true});
        }
    }, [navigate]);

    // Если не нужно рендерить компонент при редиректе, можно вернуть null
    return null;
};


const App = () => {
    const [cartItems, setCartItems] = useState([]);


    useEffect(() => {
        ReactGA.pageview(window.location.pathname + window.location.search);
    }, []);

    return (
        <ThemeProvider>
                <FontSizeProvider>
                    <Router>
                        <CssBaseline/>
                        <>
                            <Header/>
                            <Routes>
                                <Route path="/" element={<MainPage/>}/>

                                <Route path="/bydgoszcz" element={<BydgoszczPage/>}/>
                                <Route path="/bydgoszcz/:categorySlug" element={<BydgoszczPostsPage/>}/>
                                <Route path="/bydgoszcz/:categorySlug/:postSlug" element={<PostDetails/>}/>

                                <Route path="/regiony" element={<RegionyPage/>}/>
                                <Route path="/regiony/:tagSlug" element={<RegionyPostsPage/>}/>
                                <Route path="/regiony/:tagSlug/:postSlug" element={<PostDetails/>}/>

                                <Route path="/kraje" element={<KrajePage/>}/>
                                <Route path="/kraje/:tagSlug" element={<RegionyPostsPage/>}/>
                                <Route path="/kraje/:tagSlug/:postSlug" element={<PostDetails/>}/>

                                <Route path="/aktualnosci" element={<ActualsPageComponent/>}/>
                                <Route path="/aktualnosci/:postSlug" element={<PostDetails/>}/>

                                <Route path="/wycieczki" element={<WycieczkiPageComponent/>}/>
                                <Route path="/wycieczki/:projectSlug" element={<ProjectDetails/>}/>

                                <Route path="/wydarzenia" element={<SeasonPageComponent/>}/>
                                <Route path="/wydarzenia/:postSlug" element={<PostDetails/>}/>

                                <Route path="/filmy" element={<FilmyPage/>}/>
                                <Route path="/wyszukiwarka" element={<Wyszukiwarka/>}/>
                                <Route path="/szlaki/*" element={<RedirectOldUrl/>}/>

                                <Route path="/declaracja-dostepnosci" element={<DocumentPage/>}/>
                                <Route path="/o-nas" element={<About/>}/>

                                <Route path="/projekty" element={<RedirectOldUrl/>}/>
                                <Route path="/projekty/:projectSlug" element={<ProjectDetails/>}/>

                                <Route path="/sklep" element={<Sklep/>}/>
                                <Route path="/sklep/:productSlug" element={<ProductPage setCartItems={setCartItems} cartItems={cartItems} />} />

                                <Route path="/sklep/koszyk" element={<CartPage cartItems={cartItems} />} />
                                <Route path="/sklep/koszyk/podsumowanie" element={<PayPage cartItems={cartItems} />} />

                                {/*<Route path="*" element={<NotFoundPage/>}/>*/}
                            </Routes>
                            <Footer/>
                        </>
                    </Router>
                </FontSizeProvider>
        </ThemeProvider>

    );
};


ReactDOM.render(
    <HelmetProvider context={helmetContext}>
        <React.StrictMode>
            <App/>
        </React.StrictMode>
    </HelmetProvider>
    ,
    document.getElementById('root')
);
