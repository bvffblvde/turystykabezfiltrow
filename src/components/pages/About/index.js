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
import PiotrPhoto from "../../../assets/Banners/piotr.png";
import Banner from "../../../assets/Banners/main-about-page.png";
import InnaPhoto from "../../../assets/Banners/inna.png";
import DownloadButton from "../../UI/DownloadButton";
import DonatBadge from "../../UI/DonatBadge";

const sections = [
    {id: 'bez-filtrow', label: 'BEZ FILTRÓW - czyli?'},
    {id: 'wesprzyj-nas', label: 'Wesprzyj nas!'},
    {id: 'projekty', label: 'Projekty'},
    {id: 'publikacje', label: 'Publikacje'},
];

const useStyles = makeStyles((theme) => ({
    boxWrapper: {
        display: 'flex',
        gap: '5%',
    },
    sideBarSection: {
        //paddingTop: '100px',
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        flex: '1',
        gap: '80px',
        padding: '0 5% 0 calc(5% + 40px)',
        borderLeft: '1px solid',
        borderColor: ({borderColorForAboutPage}) => borderColorForAboutPage,
        [theme.breakpoints.down('sm')]: {
            padding: '0',
            border: 'none',
            marginBottom: '60px',
            gap: '40px'
        },
    },
    title: {
        fontFamily: 'Inter-Bold',
        fontSize: '60px',
        fontWeight: 700,
        textAlign: "center",
        color: ({textColor}) => textColor,
        marginBottom: '32px',
        [theme.breakpoints.down('sm')]: {
            fontSize: '32px',
            fontWeight: 700,
            marginBottom: '16px',
        },
    },
    subTitle: {
        fontFamily: 'Inter-Regular',
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
        marginBottom: '20px',
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
        fontSize: '36px',
        fontWeight: 500,
        marginBottom: '20px',
        color: ({aboutPageTextTitleColor}) => aboutPageTextTitleColor,
        [theme.breakpoints.down('sm')]: {
            fontSize: '20px',
            marginBottom: '20px',
        }
    },
    titleBlockFirst: {
        fontFamily: 'Inter-Regular',
        fontSize: '36px',
        fontWeight: 400,
        marginBottom: '20px',
        color: ({aboutPageTextTitleColor}) => aboutPageTextTitleColor,
        [theme.breakpoints.down('sm')]: {
            fontSize: '20px',
        }
    },
    descriptionText: {
        fontFamily: 'Inter-Regular',
        fontSize: '16px',
        fontWeight: 400,
        color: ({textColor}) => textColor,
        '& p': {
            margin: '0 0 10px 0',
        },
    },
    individualPhoto: {
        width: '100%',
        aspectRatio: '1/1',
        borderRadius: '10px',
        objectFit: 'cover',
    },
    boldText: {
        fontFamily: 'Inter-Regular',
        fontSize: '16px',
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
        //paddingTop: '100px',
        [theme.breakpoints.down('sm')]: {
            //paddingTop: '20px',
        }
    },
    descriptionStartSection: {
        fontFamily: 'Inter-Regular',
        fontSize: '16px',
        fontWeight: 400,
        color: ({textColor}) => textColor,
        '& p': {
            margin: '0 0 10px 0',
        }
    }
}));

const coRobimyText = `<p>„Turystyka BEZ FILTRÓW”  to marka, która startowała jako hobbystyczny blog turystyczny, z czasem rozrastając się do znaczącej w skali Bydgoszczy i regionu, inicjatywy. Dziś obejmuje ona stronę internetową (www.turystykabezfiltrow.com), na której regularnie pojawiają się artykuły o tematyce turystyczno-kulturowej (m.in. cykle: „Bydgoskie osiedla BEZ FILTRÓW”, „Bydgoszcz przez dziurkę od klucza”), kanały na portalu YouTube („Turystyka BEZ FILTRÓW” oraz „RBF – Rozmowy BEZ FILTRÓW”), a także cykliczne spacery tematyczne po Bydgoszczy, głównie zaś po bydgoskich osiedlach (w ramach serii „Bydgoskie osiedla BEZ TAJEMNIC”).</p>
<p>Przeczytawszy powyższy tekst, nietrudno się domyślić, że „Turystyka BEZ FILTRÓW” celuje w propagowanie turystyki osiedlowej. Inicjatywa „Osiedla BEZ FILTRÓW”, była dotychczas wdrażana (przy wsparciu środków finansowych lokalnych samorządów), w: Bydgoszczy, Toruniu, Włocławku, Grudziądzu i Inowrocławiu.</p>
<p><strong>Dlaczego BEZ FILTRÓW?</strong></p>
BEZ FILTRÓW czyli bez „upiększaczy”, podkręcania rzeczywistości, tak powszechnego w dobie wszechobecnych mediów społecznościowych. Nasze materiały ukazują piękno (lub brzydotę) danego miejsca oraz jego zasoby, w taki sposób, aby najpełniej oddać rzeczywistość. Jakkolwiek zaskakująca lub nawet niewygodna, ona jest. 
`;
const piotrDescription = `<p>Pomysłodawca inicjatywy, autor tekstów i scenariuszy filmów, które pojawiają się na blogu oraz kanale YouTube. Przewodnik turystyczny, specjalizujący się w historii i współczesności bydgoskich osiedli (w 2023 roku poprowadził ponad 60 wycieczek).</p>
<p>Prezes Fundacji Krzewienia Kultury i Turystyki „Nad Rzeką”, specjalista ds. pozyskiwania środków zewnętrznych (od 2021 roku prowadzi firmę Pisanie&Projekty), członek Konwentu Kolegium Nauk Społecznych Wyższej Szkoły Gospodarki w Inowrocławiu.  Ponadto instruktor turystyki kwalifikowanej o specjalizacji turystyka kajakowa.</p>
<p>W 2023 r. za działania podejmowane w ramach inicjatywy „Turystyka BEZ FILTRÓW”, otrzymał nagrodę Marszałka Województwa Kujawsko-Pomorskiego w kategorii „Promocja turystyczna”. </p>
<p>Absolwent Uniwersytetu Kazimierza Wielkiego w Bydgoszczy i Uniwersytetu Mikołaja Kopernika w Toruniu.</p>
Bydgoszczanin z dziada pradziada (4 pokolenie), miłośnik miasta i regionu, a także Kresów Wschodnich. 
`;
const innaDescription = `<p>Pasjonatka fotografii, odpowiadająca za dokumentację zdjęciową wszystkich wydarzeń organizowanych przez „Turystykę BEZ FILTRÓW”, a także artykułów, publikowanych na blogu. Operatorka kamery oraz montażystka – autorka filmów, pojawiających się na kanale YouTube „Turystyka BEZ FILTRÓW”.</p>
<p>Laureatka w konkursie pn. Nagroda Prezydenta Miasta Bydgoszczy, na najlepsze prace magisterskiego w roku akademickim 2018/2019, za pracę pt. „Kształtowanie wizerunku turystycznego miasta oraz jego postrzeganie przez studentów zagranicznych na przykładzie Bydgoszczy”.</p>
Ukrainka pochodząca ze wschodniego skraju Podola, mieszkająca w Bydgoszczy od 2014 roku.х`;

const About = () => {
    const {theme} = useTheme();
    const classes = useStyles(themes[theme]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <SectionWrapper paddingTop="120px">
            <BreadCrumbs/>
            <Box className={classes.subTextBlock}>
                <Typography variant="h1" className={classes.title}>
                    O nas
                </Typography>
            </Box>
            <Box className={classes.boxWrapper}>
                <Box className={classes.sideBarSection}>
                    <Sidebar sections={sections}/>
                </Box>
                <Box className={classes.content}>
                    <Box id="bez-filtrow" className={classes.rightBlock}>
                        <Typography variant="h1" className={classes.titleBlockFirst}>
                            BEZ FILTRÓW - czyli?
                        </Typography>
                        <Box>
                            <img
                                src={Banner}
                                alt="main-banner-about-page"
                                className={classes.banner}
                            />
                        </Box>
                        <Box>
                            <Typography className={classes.descriptionStartSection}
                                        dangerouslySetInnerHTML={{__html: coRobimyText}}/>
                        </Box>
                    </Box>
                    <Box>
                        <Typography variant="h1" className={classes.titleBlock}>
                            Nasz zespół:
                        </Typography>
                        <Box className={classes.zespolContainer}>
                            <Grid className={classes.gridWrapper}>
                                <Grid item xs={12} sm={12} md={8} lg={8} xl={8}
                                      className={classes.descriptionForZespol}>
                                    <Box>
                                        <Typography className={classes.boldText}>
                                            Piotr Weckwerth
                                        </Typography>
                                    </Box>
                                    <Typography
                                        variant="body1"
                                        className={classes.descriptionText}
                                        dangerouslySetInnerHTML={{__html: piotrDescription}}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                                    <img src={PiotrPhoto} alt="banner-about-company"
                                         className={classes.individualPhoto}/>
                                </Grid>
                            </Grid>
                            <Grid className={classes.gridWrapper}>
                                <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                                    <img src={InnaPhoto} alt="banner-about-company"
                                         className={classes.individualPhoto}/>
                                </Grid>
                                <Grid item xs={12} sm={12} md={8} lg={8} xl={8}
                                      className={classes.descriptionForZespol}>
                                    <Box>
                                        <Typography className={classes.boldText}>
                                            Inna Yaremchuk:
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
                    <div id="wesprzyj-nas">
                        <DonatBadge/>
                    </div>
                    <Box id="projekty">
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