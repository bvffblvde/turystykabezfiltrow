import React from 'react';
import Sidebar from "../../UI/SideBar";
import SectionWrapper from "../../UI/SectionWrapper";
import {Box, Grid} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import {useEffect} from 'react';
import {useTheme} from "../../../theme/themeContext";
import {themes} from "../../../theme/themeContext/themes";
import Typography from "@material-ui/core/Typography";
import BreadCrumbs from "../../UI/BreadCrumbs";
import Banner from "../../../assets/Banners/about-page-banner-test.png";
import DownloadButton from "../../UI/DownloadButton";

const sections = [
    {id: 'co-robimy', label: 'Сo robimy'},
    {id: 'nasz-zespół', label: 'Nasz zespół'},
    {id: 'statut', label: 'Statut'},
];

const useStyles = makeStyles((theme) => ({
    boxWrapper: {
        display: 'flex',
        gap: '5%',
    },
    sideBarSection: {
        paddingTop: '100px',
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        flex: '1',
        gap: '80px',
        marginBottom: '100px',
        borderLeft: '1px solid',
        paddingLeft: '20px',
        borderColor: ({borderColorForAboutPage}) => borderColorForAboutPage,
        [theme.breakpoints.down('sm')]: {
            paddingLeft: '0',
            border: 'none',
            marginBottom: '60px',
            gap: '40px'
        },
    },
    title: {
        fontFamily: 'Inter-Bold',
        fontSize: '56px',
        fontWeight: 700,
        textAlign: "center",
        color: ({textColor}) => textColor,
        marginBottom: '32px',
        [theme.breakpoints.down('sm')]: {
            fontSize: '20px',
            fontWeight: 700,
            marginBottom: '16px',
        },
    },
    subTitle: {
        fontFamily: 'Helvetica-Regular',
        fontSize: '20px',
        fontWeight: 400,
        textAlign: "center",
        color: ({textColor}) => textColor,
        marginBottom: '40px',
        width: '80%',
        [theme.breakpoints.down('sm')]: {
            fontSize: '16px',
            width: '100%',
            marginBottom: '16px',
        }
    },
    subTextBlock: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    banner: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    bannerContainer: {
        width: 'calc(100% + 40px)',
        height: '60vh',
        //padding: '20px',
        boxSizing: 'border-box',
        //marginBottom: '100px',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            height: '30vh',
        }
    },
    titleBlock: {
        fontFamily: 'Inter-Bold',
        fontSize: '32px',
        fontWeight: 700,
        marginBottom: '20px',
        color: ({aboutPageTextTitleColor}) => aboutPageTextTitleColor,
        [theme.breakpoints.down('sm')]: {
            fontSize: '20px',
            marginBottom: '20px',
        }
    },
    titleBlockFirst: {
        fontFamily: 'Helvetica-Bold',
        fontSize: '32px',
        fontWeight: 700,
        marginBottom: '20px',
        color: ({aboutPageTextTitleColor}) => aboutPageTextTitleColor,
        [theme.breakpoints.down('sm')]: {
            fontSize: '20px',
            marginBottom: '0',
        }
    },
    descriptionText: {
        fontFamily: 'Helvetica-Regular',
        fontSize: '20px',
        fontWeight: 400,
        color: ({textColor}) => textColor,
        [theme.breakpoints.down('sm')]: {
            fontSize: '16px',
        }
    },
    individualPhoto: {
        width: '100%',
        height: '400px',
        objectFit: 'cover',
    },
    boldText: {
        fontFamily: 'Helvetica-Bold',
        fontSize: '20px',
        fontWeight: 700,
        color: ({textColor}) => textColor,
        marginBottom: '10px',
        [theme.breakpoints.down('sm')]: {
            fontSize: '16px',
        }
    },
    descriptionForZespol: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    gridWrapper: {
        display: 'flex',
        flexDirection: 'row',
        gap: '40px',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            gap: '20px',
        }
    },
    zespolContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '40px',
    },
    rightBlock: {
        paddingTop: '100px',
        [theme.breakpoints.down('sm')]: {
            paddingTop: '20px',
        }
    }
}));

const coRobimyText = `Wśród najważniejszych kierunków działań, które realizuje (i planuje rozwijać) Fundacja, wymienić należy następujące kwestie:\n <ul><li>budowanie międzynarodowej i międzykulturowej współpracy na płaszczyźnie szeroko rozumianej turystyki,\n </li><li>wprowadzanie na nowe rynki lokalnych i regionalnych produktów turystycznych,\n </li><li>integracja środowiska turystycznego i okołoturystycznego różnych miast, regionów i krajów,\n </li><li>aktywizacja lokalnych społeczności, w szczególności dzieci i młodzieży, z wykorzystaniem różnorodnych form turystyki i kultury,\n </li><li>wzmacnianie wizerunku turystycznego Bydgoszczy oraz województwa kujawsko-pomorskiego w Polsce i poza jej granicami,\n </li><li>organizacja ogólnodostępnych i branżowych wydarzeń turystyczno-kulturalnych,\n </li><li>podkreślanie wkładu innych kultur w budowanie tożsamości województwa kujawsko-pomorskiego,\n </li><li>integracja rdzennych mieszkańców Bydgoszczy i województwa kujawsko-pomorskiego z przedstawicielami mniejszości narodowych.\n </li></ul>`;
const piotrDescription = `Pozyskiwania środków zewnętrznych (obecnie prowadzi firmę Pisanie&Projekty, doświadczenie zbierał m.in. w: Wyższej Szkole Gospodarki w Bydgoszczy oraz Centrum Szkoleniowym „Masterlang” i Fundacji „Sowa” w Krakowie), członek Zarządu Bydgoskiej Lokalnej Organizacji Turystycznej „ByLOT”, członek Rady Stowarzyszenia Bydgoska Lokalna Grupa Działania „Dwie Rzeki”, członek Komitetu Rewitalizacji Miasta Bydgoszczy, członek Rady Naukowej Polskiego Instytutu Turystyki, właściciel i twórca bloga turystycznego „Weckwerth – turystyka BEZ FILTRÓW”, pomysłodawca i autor artykułów, powstających w ramach cykli: „Bydgoskie osiedla BEZ FILTRÓW” oraz „Bydgoszcz przez dziurkę od klucza”, instruktor turystyki kwalifikowanej o specjalizacji turystyka kajakowa, pilot wycieczek. Absolwent Uniwersytetu Kazimierza Wielkiego w Bydgoszczy i Uniwersytetu Mikołaja Kopernika w Toruniu.`;
const serhiiDescription = `Specjalista do spraw marketingu (Wyższa Szkoła Gospodarki w Bydgoszczy), Honorowy Prezydent Association of International Students - AIS (Zrzeszenie Studentów z Zagranicy). Absolwent Wyższej Szkoły Gospodarki w Bydgoszczy, o specjalnościach: Hotelarstwo i Gastronomia, Zarządzanie i Marketing, oraz absolwent studiów podyplomowych Zarządzanie Zasobami Ludzkimi. W 2018 roku Asystent Konsula Honorowego Ukrainy w Bydgoszczy. Członek Światowego Kongresu Ukraińskich Młodzieżowych Organizacji, a także kilkukrotny uczestnik stażu, odbywającego się w Parlamencie Ukrainy.`;
const innaDescription = `Inna Yaremchuk 
Specjalistka ds. turystyki i rekreacji oraz ds.
Zarządzania, absolwentka Wyższej Szkole Gospodarki w Bydgoszczy, koordynatorka wielu wydarzeń „ByLOT”, m.in.: PromoFestival 2016, Obywatelskie Obchody Święta Niepodległości 2016, 2017 i 2018. Laureatka drugiego miejsca w konkursie pn. Nagroda Prezydenta Miasta Bydgoszczy, na najlepsze prace magisterskiego w roku akademickim 2018/2019, za pracę pt. „Kształtowanie wizerunku turystycznego miasta oraz jego postrzeganie przez studentów zagranicznych na przykładzie Bydgoszczy”. Na stałe współpracuje z Piotrem Weckwerthem w kontekście wykonywania dokumentacji zdjęciowej oraz prowadzenia mediów społecznościowych na blogu „Turystyka BEZ FILTRÓW”.`;

const About = () => {
    const {theme} = useTheme();
    const classes = useStyles(themes[theme]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <SectionWrapper paddingTop="50px">
            <BreadCrumbs/>
            <Box className={classes.subTextBlock}>
                <Typography variant="h1" className={classes.title}>
                    O fundacji
                </Typography>
                <Typography variant="body1" className={classes.subTitle}>
                    Fundacja Krzewienia Kultury i Turystyki „Nad Rzeką” to organizacja pozarządowa, zarejestrowana
                    31.07.2020 r. Fundację tworzy trzyosobowy, międzynarodowy zespół fundatorów, jednocześnie
                    wchodzących w skład jej Zarządu. Są to: Piotr Weckwerth (prezes) oraz Serhii Zinchenko i Anton
                    Karabach (wiceprezesi). Na stałe z Fundacją współpracuje Inna Yaremchuk.
                </Typography>
                <Box className={classes.bannerContainer}>
                    <img src={Banner} alt="banner-about-company" className={classes.banner}/>
                </Box>
            </Box>
            <Box className={classes.boxWrapper}>
                <Box className={classes.sideBarSection}>
                    <Sidebar sections={sections}/>
                </Box>
                <Box className={classes.content}>
                    <Box id="co-robimy" className={classes.rightBlock}>
                        <Grid className={classes.gridWrapper}>
                            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                                <Typography variant="h1" className={classes.titleBlockFirst}>
                                    Co robimy
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
                                <Typography
                                    variant="body1"
                                    className={classes.descriptionText}
                                    dangerouslySetInnerHTML={{__html: coRobimyText}}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                    <Box id="nasz-zespół">
                        <Typography variant="h1" className={classes.titleBlock}>
                            Nasz zespół
                        </Typography>
                        <Box className={classes.zespolContainer}>
                            <Grid className={classes.gridWrapper}>
                                <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                                    <img src={Banner} alt="banner-about-company" className={classes.individualPhoto}/>
                                </Grid>
                                <Grid item xs={12} sm={12} md={8} lg={8} xl={8} className={classes.descriptionForZespol}>
                                    <Box>
                                        <Typography className={classes.boldText}>
                                            Piotr Weckwerth
                                        </Typography>
                                        <Typography className={classes.boldText}>
                                            Prezes Fundacji Krzewienia Kultury i Turystyki „Nad Rzeką”, specjalista ds.
                                        </Typography>
                                    </Box>
                                    <Typography
                                        variant="body1"
                                        className={classes.descriptionText}
                                        dangerouslySetInnerHTML={{__html: piotrDescription}}
                                    />
                                </Grid>
                            </Grid>
                            <Grid className={classes.gridWrapper}>
                                <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                                    <img src={Banner} alt="banner-about-company" className={classes.individualPhoto}/>
                                </Grid>
                                <Grid item xs={12} sm={12} md={8} lg={8} xl={8} className={classes.descriptionForZespol}>
                                    <Box>
                                        <Typography className={classes.boldText}>
                                            Serhii Zinchenko
                                        </Typography>
                                        <Typography className={classes.boldText}>
                                            Wiceprezes Fundacji Krzewienia Kultury i Turystyki „Nad Rzeką”.
                                        </Typography>
                                    </Box>
                                    <Typography
                                        variant="body1"
                                        className={classes.descriptionText}
                                        dangerouslySetInnerHTML={{__html: serhiiDescription}}
                                    />
                                </Grid>
                            </Grid>
                            <Grid className={classes.gridWrapper}>
                                <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                                    <img src={Banner} alt="banner-about-company" className={classes.individualPhoto}/>
                                </Grid>
                                <Grid item xs={12} sm={12} md={8} lg={8} xl={8} className={classes.descriptionForZespol}>
                                    <Box>
                                        <Typography className={classes.boldText}>
                                            Anton Karabach
                                        </Typography>
                                        <Typography className={classes.descriptionText}>
                                            Wiceprezes Fundacji Krzewienia Kultury i Turystyki „Nad Rzeką”, specjalista do spraw zatrudnienia cudzoziemców, absolwent Wyższej Szkoły Gospodarki w Bydgoszczy.
                                        </Typography>
                                    </Box>
                                    {/*<Typography*/}
                                    {/*    variant="body1"*/}
                                    {/*    className={classes.descriptionText}*/}
                                    {/*    dangerouslySetInnerHTML={{__html: innaDescription}}*/}
                                    {/*/>*/}
                                </Grid>
                            </Grid>
                            <Grid className={classes.gridWrapper}>
                                <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                                    <img src={Banner} alt="banner-about-company" className={classes.individualPhoto}/>
                                </Grid>
                                <Grid item xs={12} sm={12} md={8} lg={8} xl={8} className={classes.descriptionForZespol}>
                                    <Box>
                                        <Typography className={classes.boldText}>
                                            Inna Yaremchuk
                                        </Typography>
                                        <Typography className={classes.boldText}>
                                            Specjalistka ds. turystyki i rekreacji oraz ds.
                                        </Typography>
                                    </Box>
                                    <Typography
                                        variant="body1"
                                        className={classes.descriptionText}
                                        dangerouslySetInnerHTML={{__html: innaDescription}}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                    <Box id="statut">
                        <Grid className={classes.gridWrapper}>
                            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                                <Typography variant="h1" className={classes.titleBlock}>
                                    Statut
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
                                <DownloadButton
                                    pdfUrl='https://fundacjanadrzeka.com/wp-content/uploads/2022/02/Statut-AKTUALNY.pdf'/>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Box>
        </SectionWrapper>
    );
};

export default About;