import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Box, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import H4 from "../H4";
import {useTheme} from "../../../theme/themeContext";
import {themes} from "../../../theme/themeContext/themes";
import {Link} from "react-router-dom";
import {useFontSize} from "../FontSizeChange/FontSizeContext";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        cursor: 'pointer',
        backgroundColor: ({backgroundColor}) => backgroundColor,
        color: ({textColor}) => textColor,
        borderRadius: '16px',
        padding: '10px',
        transition: "all 0.5s ease-out",
        '&:hover': {
            transform: 'scale(1.02)',
            transition: "all 0.5s ease-out",
            '& $imageLarge': {
                // transition: "all 0.5s ease-out",
                // transform: 'scale(1.05)',
            }
        },
        '&:hover $h4': {
            transition: "all 0.3s ease-out",
            color: ({postsHoverTextColor}) => postsHoverTextColor,
        },
        '& $h4': {
            [theme.breakpoints.down('sm')]: {
                transition: "all 0.5s ease-out",
                fontSize: ({h4FontSize}) => h4FontSize,
                marginBottom: '0',
                lineClamp: 2,
                boxOrient: 'vertical',
                display: '-webkit-box',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                [theme.breakpoints.down('sm')]: {
                    fontSize: ({h4FontSizeMobile}) => h4FontSizeMobile,
                }
            },
        },
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'row',
            gap: '10px',
            alignItems: 'center',
        },
        [theme.breakpoints.down('xs')]: {
            marginBottom: '8px',
        }
    },
    rootSmall: {
        display: 'flex',
        height: '100%',  // Добавьте эту строку для установки высоты
        flexDirection: 'row',
        //alignItems: 'center',
        cursor: 'pointer',
        backgroundColor: ({backgroundColor}) => backgroundColor,
        color: ({textColor}) => textColor,
        borderRadius: '16px',
        padding: '10px',
        gap: '20px',
        transition: "all 0.5s ease-out",
        //marginBottom: '20px',
        '&:hover': {
            transform: 'scale(1.02)',
            transition: "all 0.5s ease-out",
            // '& $imageSmall': {
            //     transition: "all 0.5s ease-out",
            //     transform: 'scale(1.05)',
            // }
        },
        '&:hover $h4': {
            transition: "all 0.3s ease-out",
            color: ({postsHoverTextColor}) => postsHoverTextColor,
        },
        '& $h4': {
            transition: "all 0.5s ease-out",
            fontSize: ({h4FontSize}) => h4FontSize,
            marginBottom: '0',
            lineClamp: 2,
            boxOrient: 'vertical',
            display: '-webkit-box',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            [theme.breakpoints.down('sm')]: {
                fontSize: ({h4FontSizeMobile}) => h4FontSizeMobile,
            }
        },
        [theme.breakpoints.down('sm')]: {
            marginBottom: '0',
            gap: '10px',
        }
    },
    textContainer: {
        flex: 1,
        padding: '10px',
    },
    image: {
        width: '100%',
        height: '200px',
        objectFit: 'cover',
        objectPosition: 'center',
    },
    imageContainer: {
        display: 'flex',
        flex: '0 0 auto',
        overflow: 'hidden',
        [theme.breakpoints.down('sm')]: {
            height: '100%',
        }
    },
    date: {
        fontFamily: 'Inter-Regular',
        fontSize: ({descriptionTextFontSize}) => descriptionTextFontSize,
        fontWeight: '400',
        opacity: '0.6',
        [theme.breakpoints.down('sm')]: {
            fontSize: ({descriptionTextFontSizeMobile}) => descriptionTextFontSizeMobile,
        }
    },
    textContainerLarge: {
        flex: 1,
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        [theme.breakpoints.down('sm')]: {
            flex: 'unset',
            padding: '0',
            display: 'flex',
            height: '100%',
            flexDirection: 'column',
            justifyContent: 'space-between',
        }
    },
    textContainerSmall: {
        //flex: 1,
        //padding: '10px',
        //border: '1px solid black',
        display: 'flex',
        //height: '100%',
        flexDirection: 'column',
        justifyContent: 'space-between',


    },

    imageSmall: {
        width: '200px',
        //height: '120px',
        aspectRatio: '16/9',
        //height: '100%',
        objectFit: 'cover',
        objectPosition: 'center',
        borderRadius: '8px',
        transition: "all 0.5s ease-out",
        [theme.breakpoints.down('sm')]: {
            width: '150px',
            // width: '100px',
            // height: '132px',
        },
        [theme.breakpoints.up('md')]: {
            // width: '150px',
            // height: '200px',
        }

    },
    imageLarge: {
        width: '100%',
        //aspectRatio: '16/9',
        height: '100%',
        objectFit: 'cover',
        objectPosition: 'center',
        borderRadius: '8px',

        transition: "all 0.5s ease-out",

        [theme.breakpoints.down('sm')]: {
            width: '150px',
            aspectRatio: '16/9',
            objectFit: 'cover',
            objectPosition: 'center',
            borderRadius: '8px',
        },
        [theme.breakpoints.up('md')]: {
            width: '100%',
            //height: '600px',
        }
    },
    // gridContainer: {
    //     [theme.breakpoints.down('sm')]: {
    //         display: 'flex',
    //         flexDirection: 'column',
    //         gap: '20px',
    //     }
    // },
    linkWrapper: {
        textDecoration: 'none',
        color: 'inherit', // Унаследовать цвет из родительского элемента
    },
    boxWrapper: {
        display: 'grid',
        gridTemplateColumns: 'calc(60% - 20px) calc(40%)', // Разделяем блоки с учетом gap
        gap: '20px',
        alignItems: 'stretch', // Растягиваем блоки по высоте
        marginBottom: '32px',
        [theme.breakpoints.down('sm')]: {
            gridTemplateColumns: '1fr', // Одна колонка в мобильной версии
        },
    },
    smallCardBoxWrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: '20px', // Отступ между карточками
        //height: '100%',
    },
    firstCard: {
        marginBottom: '20px', // Отступ снизу для первой карточки
    },
    largeCardBoxWrapper: {
        height: '100%',
        [theme.breakpoints.down('sm')]: {
            marginBottom: '10px',
        }
    },
    h4: {
        color: ({postsTextColor}) => postsTextColor,
        transition: "all 0.5s ease-out",
        fontSize: ({h4FontSize}) => h4FontSize,
        fontWeight: '500',
        fontFamily: 'Inter-Regular',
        marginBottom: '12px',
        [theme.breakpoints.down('sm')]: {
            fontSize: ({h4FontSizeMobile}) => h4FontSizeMobile,
            marginBottom: '10px',

        }
    },
}));

const ProjectCard = ({project, projectMediaData, linkPath}) => {
    const {theme} = useTheme();
    const { fontSize } = useFontSize();
    const combinedTheme = {
        ...themes[theme],
        ...themes[fontSize]
    };

    const classes = useStyles(combinedTheme);
    const featuredMediaId = project.featured_media;
    const media = featuredMediaId ? projectMediaData[featuredMediaId] : null;

    return (
        <Link to={`/${linkPath}/${project.slug}`} className={classes.linkWrapper}>
            <Box className={project.large ? classes.root : classes.rootSmall}>
                {media && (
                    <Box className={classes.imageContainer}>
                        <img
                            src={media.source_url}
                            alt={project.title?.rendered}
                            className={project.large ? classes.imageLarge : classes.imageSmall}
                        />
                    </Box>
                )}
                <Box className={project.large ? classes.textContainerLarge : classes.textContainerSmall}>
                    <div>
                        <Typography className={classes.h4} id="myElementId" dangerouslySetInnerHTML={{__html: project.title?.rendered}}/>
                    </div>
                    <div>
                        <Typography variant="h1" className={classes.date}>
                            {new Date(project?.date).toLocaleDateString('pl-PL', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric'
                            })}
                        </Typography>
                    </div>
                </Box>
            </Box>
        </Link>
    );
};


const Projects = ({ projectLimit, seasonCard, smallProjectView }) => {
    const { theme } = useTheme();
    const classes = useStyles(themes[theme]);
    const [projectData, setProjectData] = useState([]);
    const [projectMediaData, setProjectMediaData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response;
                if (seasonCard) {
                    // Если seasonCard установлен, получаем посты с тегом "sezon"
                    const tagsResponse = await axios.get('https://weckwerthblog.wpcomstaging.com/wp-json/wp/v2/tags?per_page=100');
                    const sezonTag = tagsResponse.data.find(tag => tag.name.toLowerCase() === 'sezon');

                    if (!sezonTag) {
                        console.error('Tag "sezon" not found.');
                        return;
                    }

                    response = await axios.get(`https://weckwerthblog.wpcomstaging.com/wp-json/wp/v2/posts?tags=${sezonTag.id}&per_page=${projectLimit}`);
                } else {
                    // Иначе получаем посты из категории 'wycieczki'
                    const categoriesResponse = await axios.get('https://weckwerthblog.wpcomstaging.com/wp-json/wp/v2/categories?per_page=100');
                    const wycieczkiCategory = categoriesResponse.data.find(category => category.name.toLowerCase() === 'wycieczki');

                    if (!wycieczkiCategory) {
                        console.error('Category "wycieczki" not found.');
                        return;
                    }

                    response = await axios.get(`https://weckwerthblog.wpcomstaging.com/wp-json/wp/v2/posts?categories=${wycieczkiCategory.id}&per_page=${projectLimit}`);
                }

                // Устанавливаем данные о проектах
                setProjectData(response.data);

                // Получаем медиа-данные для проектов
                const mediaIds = response.data.map(project => project.featured_media);
                const mediaPromises = mediaIds.map(mediaId =>
                    axios.get(`https://weckwerthblog.wpcomstaging.com/wp-json/wp/v2/media/${mediaId}`)
                );
                const mediaResults = await Promise.all(mediaPromises);

                const mediaDataObject = mediaResults.reduce((acc, media) => {
                    acc[media.data.id] = media.data;
                    return acc;
                }, {});
                setProjectMediaData(mediaDataObject);
            } catch (error) {
                console.error(`Error fetching project data: ${error}`);
            }
        };

        fetchData().then(() => console.log('Project data fetched'));
    }, [projectLimit, seasonCard]);

    const smallProjects = projectData.slice(1, 5).map(project => ({ ...project, large: false }));
    const largeProject = projectData.slice(0, 1).map(project => ({ ...project, large: true }));

    return (
        <>
            {smallProjectView ? (
                <Box className={classes.smallCardBoxWrapper}>
                    {projectData.map((project, index) => (
                        <ProjectCard
                            key={index}
                            project={project}
                            linkPath={seasonCard ? 'wydarzenia' : 'wycieczki'}
                            projectMediaData={projectMediaData}
                            className={index === 0 ? classes.firstCard : ''}
                        />
                    ))}
                </Box>
            ) : (
                <Box className={classes.boxWrapper}>
                    <Box className={classes.largeCardBoxWrapper}>
                        {largeProject.length > 0 && (
                            <ProjectCard project={largeProject[0]} projectMediaData={projectMediaData} linkPath={seasonCard ? 'wydarzenia' : 'wycieczki'}/>
                        )}
                    </Box>
                    <Box className={classes.smallCardBoxWrapper}>
                        {smallProjects.map((project, index) => (
                            <ProjectCard
                                key={index}
                                project={project}
                                linkPath={seasonCard ? 'wydarzenia' : 'wycieczki'}
                                projectMediaData={projectMediaData}
                                className={index === 0 ? classes.firstCard : ''}
                            />
                        ))}
                    </Box>
                </Box>
            )}
        </>
    );
};

export default Projects;



