import React, {useEffect, useState} from 'react';
import {Route, Routes, useNavigate} from 'react-router-dom';
import Sitemap from './Sitemap';
import MainPage from "./components/pages/Main";
import BydgoszczPage from "./components/pages/Category/BydgoszczPage";
import BydgoszczPostsPage from "./components/pages/Category/SubCategoryPages/BydgoszczPosts";
import PostDetails from "./components/pages/PostPageComponent";
import RegionyPage from "./components/pages/Category/RegionyPage";
import RegionyPostsPage from "./components/pages/Category/SubCategoryPages/RegionyPosts";
import KrajePage from "./components/pages/Category/KrajePage";
import ActualsPageComponent from "./components/pages/Category/ActualsPage";
import WycieczkiPageComponent from "./components/pages/Category/WycieczkiPage";
import ProjectDetails from "./components/pages/ProjectPageComponent";
import SeasonPageComponent from "./components/pages/Season";
import FilmyPage from "./components/pages/Filmy";
import Wyszukiwarka from "./components/pages/Search";
import DocumentPage from "./components/pages/Document";
import About from "./components/pages/About";
import Sklep from "./components/pages/Sklep";
import ProductPage from "./components/pages/ProductPage";
import CartPage from "./components/pages/CartPage";
import PayPage from "./components/pages/PayPage";
import NotFoundPage from "./components/pages/404";


const RedirectOldUrl = () => {
    const navigate = useNavigate();


    useEffect(() => {
        if (window.location.pathname === '/szlaki/') {
            navigate('/aktualnosci/bartodzieje-szlak', {replace: true});
        }
        if (window.location.pathname === '/projekty') {
            navigate('/o-nas#projekty', {replace: true});
        }
    }, [navigate]);

    return null;
};

const MyRoutes = () => {
    const [cartItems, setCartItems] = useState([]);

    return (
        <Routes>
            <Route
                path="/"
                sitemapIndex='true'
                changefreq='weekly'
                priority='1'
                element={<MainPage/>}
            />

            <Route
                path="/bydgoszcz"
                sitemapIndex='true'
                changefreq='weekly'
                priority='1'
                element={<BydgoszczPage/>}
            />
            <Route
                path="/bydgoszcz/:categorySlug"
                sitemapIndex='true'
                changefreq='weekly'
                priority='1'
                element={<BydgoszczPostsPage/>}
            />
            <Route
                path="/bydgoszcz/:categorySlug/:postSlug"
                sitemapIndex='true'
                changefreq='weekly'
                priority='1'
                element={<PostDetails/>}
            />

            <Route
                path="/regiony"
                sitemapIndex='true'
                changefreq='weekly'
                priority='1'
                element={<RegionyPage/>}
            />
            <Route
                path="/regiony/:tagSlug"
                sitemapIndex='true'
                changefreq='weekly'
                priority='1'
                element={<RegionyPostsPage/>}
            />
            <Route
                path="/regiony/:tagSlug/:postSlug"
                sitemapIndex='true'
                changefreq='weekly'
                priority='1'
                element={<PostDetails/>}
            />

            <Route
                path="/kraje"
                sitemapIndex='true'
                changefreq='weekly'
                priority='1'
                element={<KrajePage/>}
            />
            <Route
                path="/kraje/:tagSlug"
                sitemapIndex='true'
                changefreq='weekly'
                priority='1'
                element={<RegionyPostsPage/>}
            />
            <Route
                path="/kraje/:tagSlug/:postSlug"
                sitemapIndex='true'
                changefreq='weekly'
                priority='1'
                element={<PostDetails/>}
            />

            <Route
                path="/aktualnosci"
                sitemapIndex='true'
                changefreq='weekly'
                priority='1'
                element={<ActualsPageComponent/>}
            />
            <Route
                path="/aktualnosci/:postSlug"
                sitemapIndex='true'
                changefreq='weekly'
                priority='1'
                element={<PostDetails/>}
            />

            <Route
                path="/wycieczki"
                sitemapIndex='true'
                changefreq='weekly'
                priority='1'
                element={<WycieczkiPageComponent/>}
            />
            <Route
                path="/wycieczki/:projectSlug"
                sitemapIndex='true'
                changefreq='weekly'
                priority='1'
                element={<ProjectDetails/>}
            />

            <Route
                path="/wydarzenia"
                sitemapIndex='true'
                changefreq='weekly'
                priority='1'
                element={<SeasonPageComponent/>}
            />
            <Route
                path="/wydarzenia/:postSlug"
                sitemapIndex='true'
                changefreq='weekly'
                priority='1'
                element={<PostDetails/>}
            />

            <Route
                path="/filmy"
                sitemapIndex='true'
                changefreq='weekly'
                priority='1'
                element={<FilmyPage/>}
            />
            <Route
                path="/wyszukiwarka"
                sitemapIndex='true'
                changefreq='weekly'
                priority='1'
                element={<Wyszukiwarka/>}
            />
            <Route
                path="/szlaki/*"
                sitemapIndex='true'
                changefreq='weekly'
                priority='1'
                element={<RedirectOldUrl/>}
            />

            <Route
                path="/declaracja-dostepnosci"
                sitemapIndex='true'
                changefreq='weekly'
                priority='1'
                element={<DocumentPage/>}
            />
            <Route
                path="/o-nas"
                sitemapIndex='true'
                changefreq='weekly'
                priority='1'
                element={<About/>}
            />

            <Route
                path="/projekty"
                sitemapIndex='true'
                changefreq='weekly'
                priority='1'
                element={<RedirectOldUrl/>}
            />
            <Route
                path="/projekty/:projectSlug"
                sitemapIndex='true'
                changefreq='weekly'
                priority='1'
                element={<ProjectDetails/>}
            />

            <Route
                path="/sklep"
                sitemapIndex='true'
                changefreq='weekly'
                priority='1'
                element={<Sklep/>}
            />
            <Route
                path="/sklep/:productSlug"
                sitemapIndex='true'
                changefreq='weekly'
                priority='1'
                   element={<ProductPage setCartItems={setCartItems} cartItems={cartItems}/>}
            />
            <Route
                path="/sklep/koszyk"
                sitemapIndex='true'
                changefreq='weekly'
                priority='1'
                element={<CartPage cartItems={cartItems}/>}
            />
            <Route
                path="/sklep/koszyk/podsumowanie"
                sitemapIndex='true'
                changefreq='weekly'
                priority='1'
                element={<PayPage cartItems={cartItems}/>}
            />
            <Route path="/sitemap" element={<Sitemap/>}></Route>

            <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
    )
}

export default MyRoutes;