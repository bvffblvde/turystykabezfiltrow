import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {CssBaseline} from "@material-ui/core";

import MainPage from "./components/pages/Main";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

import {ThemeProvider} from "./theme/themeContext";
import Posts from "./components/pages/Posts";
import ProjectsList from "./components/pages/Projects";
import PostDetails from "./components/pages/PostPageComponent";
import ProjectDetails from "./components/pages/ProjectPageComponent";
import DocumentPage from "./components/pages/Document";
import About from "./components/pages/About";
import {FloatingButtonProvider} from "./components/UI/FloatingButton/FloatingButtonContext";
import {FontSizeProvider} from "./components/UI/FontSizeChange/FontSizeContext";

const App = () => {

    return (
        <ThemeProvider>
            <FloatingButtonProvider>
                <FontSizeProvider>
                    <Router>
                        <CssBaseline/>
                            <>
                                <Header/>
                                <Routes>
                                    <Route path="/" element={<MainPage/>}/>
                                    <Route path="/aktualnosci" element={<Posts/>}/>
                                    <Route path="/aktualnosci/:postSlug" element={<PostDetails/>}/>
                                    <Route path="/projekty" element={<ProjectsList/>}/>
                                    <Route path="/projekty/:projectSlug" element={<ProjectDetails/>}/>
                                    <Route path="/declaracja-dostepnosci" element={<DocumentPage/>}/>
                                    <Route path="/o-fundacji" element={<About/>}/>
                                    {/*<Route path="*" element={<NotFoundPage/>}/>*/}
                                </Routes>
                                <Footer/>
                            </>
                    </Router>
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
