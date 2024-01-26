import React, {useEffect, useState} from 'react';
import {
    Grid,
    makeStyles,
    Typography,
    Backdrop,
    CircularProgress, Box,
} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import {useNavigate, useLocation, Link} from 'react-router-dom';
import H4 from "../../UI/H4";
import SectionWrapper from "../../UI/SectionWrapper";
import {useTheme} from "../../../theme/themeContext";
import {themes} from "../../../theme/themeContext/themes";
import BreadCrumbs from "../../UI/BreadCrumbs";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardContent: {
        flexGrow: 1,
    },
    pagination: {
        marginTop: theme.spacing(3),
        display: 'flex',
        justifyContent: 'center',
        '& .MuiPaginationItem-page.Mui-selected': {
            backgroundColor: ({paginationSelectedBackgroundColor}) => paginationSelectedBackgroundColor,
            color: ({paginationSelectedTextColor}) => paginationSelectedTextColor,
            border: ({paginationSelectedBorderColor}) => `1px solid ${paginationSelectedBorderColor}`,
        },
        '& .MuiPaginationItem-rounded': {
            borderRadius: '0',
        },
        '& .MuiPaginationItem-root': {
            color: ({paginationTextColor}) => paginationTextColor,
            backgroundColor: ({paginationBackgroundColor}) => paginationBackgroundColor,
            border: ({paginationBorderColor}) => `1px solid ${paginationBorderColor}`,
            '&:hover': {
                backgroundColor: ({paginationSelectedBackgroundColor}) => paginationSelectedBackgroundColor,
                color: ({paginationSelectedTextColor}) => paginationSelectedTextColor,
                border: ({paginationSelectedBorderColor}) => `1px solid ${paginationSelectedBorderColor}`,
            },
        },
        '& .MuiPaginationItem-root.MuiPaginationItem-ellipsis': {
            border: 'none',
            color: ({paginationTextColor}) => paginationTextColor,
            cursor: 'default',
            '&:hover': {
                backgroundColor: 'transparent',
                border: 'none',
                color: ({textColor}) => textColor,

            }
        }
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    root: {
        backgroundColor: ({backgroundColor}) => backgroundColor,
        color: ({textColor}) => textColor,
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100%',
        cursor: 'pointer',
        transition: "all 0.5s ease-out",
        '&:hover': {
            transition: "all 0.5s ease-out",
            transform: 'scale(1.02)',
            '& $image': {
                transition: "all 0.5s ease-out",
                transform: 'scale(1.05)',
            },
        },
        '&:hover $h4': {
            transition: "all 0.3s ease-out",
            color: ({postsHoverTextColor}) => postsHoverTextColor,
        },
    },
    textContainer: {
        flex: 1,
        padding: '10px',
        border: '1px solid',
        borderColor: ({borderColor}) => borderColor,
    },
    image: {
        transition: "all 0.3s ease-out",
        width: '100%',
        height: '55vh',
        objectFit: 'cover',
        objectPosition: 'center',
        [theme.breakpoints.down('sm')]: {
            height: '40vh',
        }
    },
    imageContainer: {
        display: 'flex',
        flex: '0 0 auto',
        overflow: 'hidden',
    },
    date: {
        fontFamily: 'Helvetica-Regular',
        fontSize: '20px',
        fontWeight: '400',
        lineHeight: '23px',
        letterSpacing: '0em',
        opacity: '0.6',
        [theme.breakpoints.down('sm')]: {
            fontSize: '16px',
            lineHeight: '18px',
        }
    },
    line: {
        width: '70%',
        backgroundColor: ({lineBackgroundColor}) => lineBackgroundColor,
        opacity: '0.6',
        marginBottom: '12px',
        height: '1px',
        [theme.breakpoints.down('sm')]: {
            width: '80%',
        }
    },
    //TODO: refactor
    cardWrapper: {
        marginBottom: '6px',
    },
    linkWrapper: {
        textDecoration: 'none',
        color: 'inherit', // Унаследовать цвет из родительского элемента
    },
    title: {
        fontFamily: 'Helvetica-Bold',
        fontSize: '40px',
        fontWeight: '700',
        color: ({textColor}) => textColor,
        textAlign: 'center',
        marginBottom: '32px',
        [theme.breakpoints.down('sm')]: {
            fontSize: '20px',
            marginBottom: '20px',
        }
    }
}));

const ProjectsList = () => {
    const { theme } = useTheme();
    const classes = useStyles(themes[theme]);
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const postsPerPage = 9;

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const newPage = parseInt(params.get('page')) || 1;

        if (newPage !== page) {
            setPage(newPage);
        }
    }, [location.search, page]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            try {
                const categoryResponse = await axios.get(
                    'https://fundacjanadrzeka.com/wp-json/wp/v2/categories?slug=project'
                );
                const categoryId = categoryResponse.data[0]?.id;

                if (!categoryId) {
                    console.error('Category not found');
                    return;
                }

                const response = await axios.get(
                    `https://fundacjanadrzeka.com/wp-json/wp/v2/posts?categories=${categoryId}&_embed&per_page=${postsPerPage}&page=${page}`
                );

                const data = response.data;
                setPosts(data);
                setTotalPages(response.headers['x-wp-totalpages']);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [page]);

    const handleChangePage = (event, newPage) => {
        navigate(`/projekty?page=${newPage}`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <SectionWrapper id="actual" paddingBottom="100px" paddingTop="20px">
            <BreadCrumbs />
            <Typography variant="h1" className={classes.title}>
                Projekty
            </Typography>
            <Grid container spacing={3}>
                {posts.map((post) => (
                    <Grid item key={post.id} xs={12} sm={6} md={4}>
                        <Link to={`/projekty/${post.slug}`} className={classes.linkWrapper}>
                            <Box className={classes.root}>
                                {post._embedded && post._embedded['wp:featuredmedia'] && (
                                    <div className={classes.imageContainer}>
                                        <img
                                            src={post._embedded['wp:featuredmedia'][0].source_url}
                                            alt={post.title.rendered}
                                            className={classes.image}
                                            loading="lazy"
                                        />
                                    </div>
                                )}
                                <Box className={classes.textContainer}>
                                    <H4 className={classes.h4}>{post.title.rendered}</H4>
                                    <div className={classes.line} />
                                    <Typography variant="body2" className={classes.date}>
                                        {new Date(post.date).toLocaleDateString()}
                                    </Typography>
                                </Box>
                            </Box>
                        </Link>
                    </Grid>
                ))}
            </Grid>
            <Pagination
                className={classes.pagination}
                count={totalPages}
                page={page}
                onChange={handleChangePage}
                shape="rounded" // Квадратные кнопки
            />
            <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </SectionWrapper>
    );
};

export default ProjectsList;
