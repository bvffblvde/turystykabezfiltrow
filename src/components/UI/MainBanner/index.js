import React, {useEffect, useRef, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {useTheme} from '../../../theme/themeContext';
import {themes} from "../../../theme/themeContext/themes";
import {Box} from "@material-ui/core";
import axios from "axios";
import StyledButton from "../StyledButton";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '0 20px',
        transition: "all 0.3s ease-out",
        backgroundColor: ({backgroundColor}) => backgroundColor,
        [theme.breakpoints.down('sm')]: {
            padding: '0',
        }
    },
    banner: {
        position: 'relative',
        height: '75vh', // Задайте высоту по своему усмотрению
        backgroundImage: ({mainBannerBackgroundImage}) => mainBannerBackgroundImage,
        backgroundFilter: 'brightness(0.5)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        justifyContent: 'space-between',
        display: 'flex',
        flexDirection: 'column',
        padding: '0 20px 50px 20px',
        [theme.breakpoints.down('sm')]: {
            height: '50vh',
            padding: '20px'
        }
    },
    bannerTitle: {
        paddingTop: '5%',
        width: '60%',
        fontFamily: 'Helvetica-Bold',
        fontSize: '52px',
        transition: "all 0.3s ease-out",
        color: ({textColor}) => textColor,
        fontWeight: '400',
        lineHeight: '71px',
        letterSpacing: '0em',
        textAlign: 'left',
        [theme.breakpoints.down('sm')]: {
            fontSize: '20px',
            lineHeight: '23px',
            width: '100%',
        }
    },
    titleActualProject: {
        fontFamily: 'Helvetica-Bold',
        fontSize: '28px',
        fontWeight: '700',
        lineHeight: '28px',
        letterSpacing: '0em',
        color: ({bannerTextColor}) => bannerTextColor,
        marginBottom: '16px',
        [theme.breakpoints.down('sm')]: {
            fontSize: '20px',
            lineHeight: '23px',
            color: ({textColor}) => textColor,
            marginBottom: '10px',
        }
    },
    descriptionActualProject: {
        fontFamily: 'Helvetica-Regular',
        fontSize: '20px',
        fontWeight: '400',
        lineHeight: '23px',
        letterSpacing: '0em',
        color: ({bannerTextColor}) => bannerTextColor,
        marginBottom: '16px',
        display: '-webkit-box',
        WebkitLineClamp: 4,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        '& p': {
            marginTop: '0',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '16px',
            lineHeight: '19px',
            color: ({textColor}) => textColor,
            WebkitLineClamp: 6,
            marginBottom: '10px',
        }
    },
    actualProjectBlock: {
        marginLeft: 'auto',
        width: '50%',
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        }
    },
    actualMobile: {
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            padding: '20px',
        }
    }
}));

const StartBanner = ({text, projectLimit}) => {
    const {theme} = useTheme();
    const classes = useStyles({...themes[theme], text});

    const [projectData, setProjectData] = useState([]);
    const descriptionRef = useRef(null); // Создаем ссылку

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoryResponse = await axios.get(`https://fundacjanadrzeka.com/wp-json/wp/v2/categories?slug=project`);
                const categoryId = categoryResponse.data[0]?.id;

                if (!categoryId) {
                    console.error('Category not found');
                    return;
                }

                const response = await axios.get(`https://fundacjanadrzeka.com/wp-json/wp/v2/posts?categories=${categoryId}&per_page=${projectLimit}`);

                // Получите только самый последний пост
                const latestProject = response.data.slice(0, 1);

                setProjectData(latestProject);

                // Остальной код...
            } catch (error) {
                console.error('Error fetching project data:', error);
            }
        };

        fetchData().then(r => console.log('r', r));
    }, [projectLimit]);

    return (
        <div className={classes.root}>
            <div className={classes.banner}>
                <Typography className={classes.bannerTitle}>{text}</Typography>
                    <Box className={classes.actualProjectBlock}>
                        {/* Вывод заголовка и описания последнего проекта */}
                        {projectData.map((project) => (
                            <div key={project.id}>
                                <Typography className={classes.titleActualProject}>{project.title.rendered}</Typography>
                                {/* Используем созданную ссылку для получения текстового содержимого */}
                                <Typography
                                    className={classes.descriptionActualProject}
                                    ref={descriptionRef}
                                    dangerouslySetInnerHTML={{__html: project.excerpt.rendered}}
                                />
                                <StyledButton text="Czytaj więcej" width="100%" to={`/projekty/${project.slug}`}/>
                            </div>
                        ))}
                    </Box>
            </div>
            <Box className={classes.actualMobile}>
                {/* Вывод заголовка и описания последнего проекта */}
                {projectData.map((project) => (
                    <div key={project.id}>
                        <Typography className={classes.titleActualProject}>{project.title.rendered}</Typography>
                        {/* Используем созданную ссылку для получения текстового содержимого */}
                        <Typography
                            className={classes.descriptionActualProject}
                            ref={descriptionRef}
                            dangerouslySetInnerHTML={{__html: project.excerpt.rendered}}
                        />
                        <StyledButton text="Czytaj więcej" width="100%" to={`/project/${project.id}`}/>
                    </div>
                ))}
            </Box>
        </div>
    );
};

export default StartBanner;





