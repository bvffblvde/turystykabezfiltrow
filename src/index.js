import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {CssBaseline} from "@material-ui/core";

import MainPage from "./components/pages/Main";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

import {ThemeProvider} from "./theme/themeContext";
import PostDetails from "./components/pages/PostPageComponent";
import ProjectDetails from "./components/pages/ProjectPageComponent";
import DocumentPage from "./components/pages/Document";
import {FloatingButtonProvider} from "./components/UI/FloatingButton/FloatingButtonContext";
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
import {PaginationProvider} from "./components/UI/Pagination/PaginationContext";

const App = () => {

    return (
        <ThemeProvider>
            <FloatingButtonProvider>
                <FontSizeProvider>
                    <PaginationProvider>
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

                                    <Route path="/artykuly" element={<ActualsPageComponent/>}/>
                                    <Route path="/artykuly/:postSlug" element={<PostDetails/>}/>

                                    <Route path="/wycieczki" element={<WycieczkiPageComponent/>}/>
                                    <Route path="/wycieczki/:projectSlug" element={<ProjectDetails/>}/>

                                    <Route path="/wydarzenia" element={<SeasonPageComponent/>}/>
                                    <Route path="/wydarzenia/:postSlug" element={<PostDetails/>}/>

                                    <Route path="/filmy" element={<FilmyPage/>}/>
                                    <Route path="/wyszukiwarka" element={<Wyszukiwarka/>}/>
                                    {/*<Route path="/aktualnosci/:postSlug" element={<PostDetails/>}/>*/}
                                    {/*<Route path="/projekty" element={<ProjectsList/>}/>*/}
                                    {/*<Route path="/projekty/:projectSlug" element={<ProjectDetails/>}/>*/}
                                    <Route path="/declaracja-dostepnosci" element={<DocumentPage/>}/>
                                    {/*<Route path="/o-fundacji" element={<About/>}/>*/}
                                    {/*<Route path="*" element={<NotFoundPage/>}/>*/}
                                </Routes>
                                <Footer/>
                            </>
                        </Router>
                    </PaginationProvider>
                </FontSizeProvider>
            </FloatingButtonProvider>
        </ThemeProvider>
    );
};


ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById('root')
);
