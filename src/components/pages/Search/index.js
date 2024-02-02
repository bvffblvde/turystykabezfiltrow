import React, {useEffect, useState} from 'react';
import {
    Grid,
    Typography,
    Box,
    CircularProgress,
} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import {useNavigate, useLocation} from 'react-router-dom';
import SectionWrapper from '../../UI/SectionWrapper';
import {useTheme} from '../../../theme/themeContext';
import {themes} from '../../../theme/themeContext/themes';
import BreadCrumbs from '../../UI/BreadCrumbs';
import ContactForm from '../../UI/ContactForm';
import DonatBadgeComponent from '../../UI/DonatBadge';
import axios from 'axios';
import useStyles from '../../pages/Category/styles';
import H4 from '../../UI/H4';
import SearchField from "../../UI/SearchTextField";


const Wyszukiwarka = () => {
    const {theme} = useTheme();
    const classes = useStyles(themes[theme]);
    const [postsData, setPostsData] = useState([]);
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [searchExecuted, setSearchExecuted] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const {search} = location;
                const pageParam = new URLSearchParams(search).get('page') || 1;

                // Запрос всех постов только при наличии ключевого слова
                if (searchKeyword.trim() && searchExecuted) {
                    setLoading(true);

                    const postsResponse = await axios.get(
                        `https://turystykabezfiltrow.com/wp-json/wp/v2/posts?per_page=6&page=${pageParam}&_embed&search=${searchKeyword}`
                    );

                    const totalPosts = parseInt(postsResponse.headers['x-wp-total'], 10);
                    const totalPages = parseInt(
                        postsResponse.headers['x-wp-totalpages'],
                        10
                    );

                    setTotalPages(totalPages);

                    const postsData = postsResponse.data.map(post => ({
                        postTitle: post.title.rendered,
                        lastPostImage:
                            post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '',
                        postCount: totalPosts,
                        postDescription: post.excerpt.rendered,
                        postDate: post.date,
                    }));

                    setPostsData(postsData);
                } else {
                    setPostsData([]); // Если ключевое слово не указано или поиск не выполнен, очистить данные
                }
            } catch (error) {
                console.error('Error fetching posts data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData().then(() => console.log('Posts data fetched'));
    }, [location, page, searchKeyword, searchExecuted]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        navigate(`${location.pathname}?page=${newPage}`);
        window.scrollTo({top: 0, behavior: 'smooth'});
    };

    const handleSearch = () => {
        // При нажатии на кнопку поиска обновляем данные с учетом введенного ключевого слова
        setPage(1);
        navigate(`${location.pathname}?page=1`);
        setSearchKeyword(searchKeyword.trim());
        setSearchExecuted(true);
    };

    const navigate = useNavigate();

    return (
        <SectionWrapper
            id="kraje"
            paddingBottom="100px"
            paddingTop="120px"
        >
            <BreadCrumbs/>
            <Box style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <SearchField handleSearch={handleSearch} searchKeyword={searchKeyword}
                             setSearchKeyword={setSearchKeyword}/>
            </Box>
            <Grid container spacing={3} className={classes.cardWrapper}>
                <Grid item xs={12} sm={12} md={12} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    {loading && <CircularProgress className={classes.spinner}/>}

                    {postsData.length === 0 && searchExecuted && !loading && (
                        <Typography variant="body2" className={classes.noResults}>
                            Nic nie znaleziono
                        </Typography>
                    )}
                </Grid>

                {postsData.map((post, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4}>
                        <Box className={classes.root}>
                            {post.lastPostImage && (
                                <div className={classes.imageContainer}>
                                    <img
                                        src={post.lastPostImage}
                                        alt={post.postTitle}
                                        className={classes.image}
                                        loading="lazy"
                                    />
                                </div>
                            )}
                            <Box className={classes.textContainer}>
                                <Box>
                                    <Box>
                                        <H4 className={classes.h4}>{post.postTitle}</H4>
                                    </Box>
                                    <Box className={classes.description}>
                                        <Typography
                                            variant="body2"
                                            className={classes.postDescription}
                                            dangerouslySetInnerHTML={{__html: post.postDescription}}
                                        />
                                    </Box>
                                </Box>
                                <Box>
                                    <Typography variant="body2" className={classes.date}>
                                        {new Date(post?.postDate).toLocaleDateString('pl-PL', {
                                            month: 'long',
                                            day: 'numeric',
                                            year: 'numeric',
                                        })}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                ))}
            </Grid>
            {postsData.length === 0 ? null : (
                <Pagination
                    className={classes.pagination}
                    count={totalPages}
                    page={page}
                    onChange={handleChangePage}
                    boundaryCount={window.innerWidth < 600 ? 1 : 2}
                    shape="rounded"
                />
            )}
            <DonatBadgeComponent/>
            <ContactForm/>
        </SectionWrapper>
    );
};

export default Wyszukiwarka;



