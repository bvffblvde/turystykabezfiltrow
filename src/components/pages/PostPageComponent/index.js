import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {Backdrop, Box, CircularProgress, Typography} from '@material-ui/core';
import SectionWrapper from '../../UI/SectionWrapper';
import {useTheme} from '../../../theme/themeContext';
import {themes} from '../../../theme/themeContext/themes';
import BreadCrumbs from '../../UI/BreadCrumbs';
import {fetchPostBySlug} from './apiRequests';
import useStyles from './styles';
import ShareButton from "../../UI/ShareButton";
import ProjectCard from "../../UI/ActualProjectsCard";
import Sidebar from "../../UI/SideBar";
import DonatBadgeComponent from "../../UI/DonatBadge";
import DownloadButton from "../../UI/DownloadButton";
import ContactForm from "../../UI/ContactForm";
import CommentsSection from "../../UI/CommentsSection";
import PostsCard from "../../UI/ActualPostCard";


const PostDetails = () => {
    const {theme} = useTheme();
    const classes = useStyles(themes[theme]);
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    // eslint-disable-next-line no-unused-vars
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [comments, setComments] = useState([]);  // Добавление состояния для комментариев

    const {postSlug} = useParams();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            try {
                const dataPost = await fetchPostBySlug(postSlug);
                setPost(dataPost);

                // Запрос комментариев при получении данных поста
                const response = await fetch(`https://weckwerthblog.wpcomstaging.com/wp-json/wp/v2/comments?post=${dataPost?.id}`);
                const commentsData = await response.json();
                setComments(commentsData);
            } catch (error) {
                console.error('Error fetching post data:', error);
            } finally {
                setLoading(false);
            }
        };

        setSelectedImageIndex(0);
        fetchData().then(r => r);
    }, [postSlug]);

    const handleSmoothScroll = (event, targetId) => {
        event.preventDefault();

        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            const offset = 80;
            const targetPosition = targetElement.offsetTop - offset;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth',
            });
        }
    };


    const replaceLinksInContent = (content) => {
        if (!content) return '';

        const parser = new DOMParser();
        const doc = parser.parseFromString(content, 'text/html');

        const allLinks = doc.querySelectorAll('a');

        allLinks.forEach((link) => {
            const href = link.getAttribute('href');
            if (href && href.includes('#')) {
                const currentPath = window.location.pathname;
                const newHref = `${currentPath}${href.slice(href.indexOf('#'))}`;
                link.setAttribute('href', newHref);
                link.addEventListener('click', (event) => handleSmoothScroll(event, href.slice(1)));
                console.log('Modified href:', newHref);
            }
        });


        return doc.body.innerHTML;
    };

    const extractImageUrl = (imgTag) => {
        const srcsetRegex = /srcset="([^"]*)"/;
        const srcsetMatch = imgTag.match(srcsetRegex);

        if (srcsetMatch) {
            const srcsetArray = srcsetMatch[1].split(',').map((item) => item.trim().split(' '));

            // Находим изображение с максимальным размером
            const largestImage = srcsetArray.reduce((largest, [url, size]) => {
                const currentSize = parseInt(size, 10) || 0; // Обработка случая, когда размер не указан
                const largestSize = parseInt(largest[1], 10) || 0; // Обработка случая, когда размер не указан
                return currentSize > largestSize ? [url, currentSize] : largest;
            }, ['', 0]);

            // Возвращаем URL изображения
            return largestImage[0];
        } else {
            // Если srcset отсутствует, используем src
            const srcRegex = /src="([^"]*)"/;
            const srcMatch = imgTag.match(srcRegex);
            return srcMatch ? srcMatch[1] : '';
        }
    };

    const descriptionWithImages = replaceLinksInContent(post?.content?.rendered) || '';

    const updatedDescriptionWithImages = descriptionWithImages.replace(/<img[^>]*>/g, (imgTag) => {
        const imageUrl = extractImageUrl(imgTag);
        if (imageUrl) {
            return `<a href="${imageUrl}" target="_blank"><img src="${imageUrl}" alt="post image" loading="lazy" /></a>`;
        }
        return imgTag;
    });

    const extractFileUrls = (content) => {
        const fileUrlsSet = new Set();
        const regex = /<a[^>]+href="([^">]+)"[^>]*>(.*?)<\/a>/g;

        let match;
        while ((match = regex.exec(content)) !== null) {
            const url = match[1];

            // Получаем расширение файла из URL
            const fileExtension = url.split('.').pop()?.toLowerCase();

            // Проверяем, является ли URL файловым и имеет расширение PDF, DOC или DOCX
            const isFileUrl =
                !url.startsWith('mailto:') &&
                ['pdf', 'doc', 'docx'].includes(fileExtension);

            // Если это файловый URL и его еще нет в Set, добавляем его
            if (isFileUrl && !fileUrlsSet.has(url)) {
                fileUrlsSet.add(url);
            }
        }

        return [...fileUrlsSet];
    };

    const filteredFileUrls = extractFileUrls(post?.content?.rendered || '');

    const descriptionWithImagesAndWithoutFiles = updatedDescriptionWithImages.replace(/<a[^>]+href="([^">]+)"[^>]*>(.*?)<\/a>/g, (aTag, url, content) => {
        const fileExtension = url.split('.').pop()?.toLowerCase();
        if (['pdf', 'doc', 'docx'].includes(fileExtension)) {
            return '';
        }
        return aTag;

    });

    useEffect(() => {
        if (!loading) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }, [loading]);

    return (
        <SectionWrapper paddingBottom="100px" paddingTop="120px">
            <BreadCrumbs/>
            <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress color="inherit"/>
            </Backdrop>
            <Box className={classes.contentWrapper}>
                <Box className={classes.textWrapper}>
                    <Box style={{borderBottom: '1px solid', borderColor: `${themes[theme].borderColor}`}}>
                        <Typography variant="h1" className={classes.title}
                                    dangerouslySetInnerHTML={{__html: post?.title?.rendered}}/>
                        <Typography variant="h1" className={classes.date}>
                            {new Date(post?.date).toLocaleDateString('pl-PL', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric'
                            })}
                        </Typography>
                        <ShareButton url={window.location.href}/>
                    </Box>
                    <Box className={classes.mainImageWrapper}>
                        {post?._embedded && post._embedded['wp:featuredmedia'] && (
                            <div>
                                <img
                                    src={post._embedded['wp:featuredmedia'][0].source_url}
                                    alt={post.title?.rendered}
                                    className={classes.image}
                                    loading="lazy"
                                />
                            </div>
                        )}
                    </Box>
                    <Box className={classes.textContainer}>
                        <Typography variant="body1"
                                    dangerouslySetInnerHTML={{__html: descriptionWithImagesAndWithoutFiles}}
                                    className={classes.description}/>
                    </Box>

                    {filteredFileUrls && filteredFileUrls.length > 0 && (
                        <Box className={classes.downloadButtonWrapper}>
                            {filteredFileUrls.map((filteredFileUrl, index) => {
                                console.log('pdfUrl:', filteredFileUrl);
                                return <DownloadButton key={index} pdfUrl={filteredFileUrl}/>;
                            })}
                        </Box>
                    )}
                    {post && (
                        <CommentsSection comments={comments} postId={post.id}/>
                    )}
                </Box>
                <Box className={classes.imageWrapper}>
                    <Sidebar>
                        <ProjectCard projectLimit={3} smallProjectView seasonCard/>
                    </Sidebar>
                </Box>
            </Box>
            <DonatBadgeComponent/>
            <Box className={classes.nextSectionWrapper}>
                <Typography variant="h2" className={classes.titleNextInSection}>Wyglądają tak samo</Typography>
                <PostsCard postLimit={3} random={true}/>
            </Box>
            <Box>
                <ContactForm/>
            </Box>
        </SectionWrapper>
    );
};

export default PostDetails;
