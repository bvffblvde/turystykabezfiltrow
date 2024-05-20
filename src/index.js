import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import {CssBaseline} from "@material-ui/core";
import ReactGA from 'react-ga';
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

import {ThemeProvider} from "./theme/themeContext";
import {FontSizeProvider} from "./components/UI/FontSizeChange/FontSizeContext";
import {HelmetProvider} from 'react-helmet-async';
import MyRoutes from "./Routes";
import GlobalStyles from "./global-styles";

const helmetContext = {};

ReactGA.initialize('G-B6XDVLHYFK');

const App = () => {

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
                            <MyRoutes/>
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
            <GlobalStyles />
            <App/>
        </React.StrictMode>
    </HelmetProvider>
    ,
    document.getElementById('root')
);
