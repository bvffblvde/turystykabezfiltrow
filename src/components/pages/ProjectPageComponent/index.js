import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {Backdrop, Box, Button, CircularProgress, Typography,} from '@material-ui/core';
import SectionWrapper from '../../UI/SectionWrapper';
import {useTheme} from '../../../theme/themeContext';
import {themes} from '../../../theme/themeContext/themes';
import BreadCrumbs from '../../UI/BreadCrumbs';
import FullscreenModal from "../../UI/ImageModalComponent";
import DownloadButton from "../../UI/DownloadButton";
import useStyles from './styles';
import DonatBadgeComponent from "../../UI/DonatBadge";
import ContactForm from "../../UI/ContactForm";
import ProjectCard from "../../UI/ActualProjectsCard";
import Sidebar from "../../UI/SideBar";
import ShareButton from "../../UI/ShareButton";
import CommentsSection from "../../UI/CommentsSection";
import PostsCard from "../../UI/ActualPostCard";
import {useFontSize} from "../../UI/FontSizeChange/FontSizeContext";


const ProjectDetails = () => {
    const {theme} = useTheme();
    const {fontSize} = useFontSize();
    const combinedTheme = {
        ...themes[theme],
        ...themes[fontSize]
    };

    const classes = useStyles(combinedTheme);
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);
    const [fullscreenModalOpen, setFullscreenModalOpen] = useState(false);
    const [comments, setComments] = useState([]);

    const {projectSlug} = useParams();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            try {
                // Получаем все категории
                const categoriesResponse = await fetch(
                    'https://weckwerthblog.wpcomstaging.com/wp-json/wp/v2/categories?per_page=100'
                );
                const categories = await categoriesResponse.json();

                // Ищем категорию, которая соответствует URL
                const isProjekty = window.location.href.includes('/projekty/');
                const isWycieczki = window.location.href.includes('/wycieczki/');

                let categoryId;
                if (isProjekty) {
                    const projektyCategory = categories.find(
                        (category) => category.name.toLowerCase() === 'projekty'
                    );
                    categoryId = projektyCategory.id;
                } else if (isWycieczki) {
                    const wycieczkiCategory = categories.find(
                        (category) => category.name.toLowerCase() === 'wycieczki'
                    );
                    categoryId = wycieczkiCategory.id;
                } else {
                    throw new Error('Category not found in URL');
                }

                // Получаем посты из выбранной категории
                const response = await fetch(
                    `https://weckwerthblog.wpcomstaging.com/wp-json/wp/v2/posts?categories=${categoryId}&slug=${projectSlug}&_embed=true`
                );

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const [data] = await response.json();
                setProject(data);

                // Запрос комментариев при получении данных о проекте
                const commentsResponse = await fetch(`https://weckwerthblog.wpcomstaging.com/wp-json/wp/v2/comments?post=${data?.id}`);
                const commentsData = await commentsResponse.json();
                setComments(commentsData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        setSelectedImageIndex(0);

        fetchData();
    }, [projectSlug]);




    const extractImages = (content) => {
        const images = [];
        const regex = /<img[^>]+src="([^">]+)"[^>]*>/g;
        let match;
        while ((match = regex.exec(content)) !== null) {
            const imgTag = match[0]; // полный тег img
            images.push(imgTag);
        }
        return images;
    };

    const images = extractImages(project?.content?.rendered || '');

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

    // eslint-disable-next-line no-unused-vars
    const largestImage = images.find((imgTag) => !!extractImageUrl(imgTag));

    const handleOpenFullscreenModal = (index) => {
        setSelectedImageIndex(index);
        setFullscreenModalOpen(true);
    };

    // // eslint-disable-next-line no-unused-vars
    // const handleOpenMainImageModal = () => {
    //     const mainImageUrl = project?._embedded?.['wp:featuredmedia']?.[0]?.source_url;
    //     console.log('Main Image URL:', mainImageUrl); // Отладочное сообщение
    //
    //     if (mainImageUrl) {
    //         setSelectedImageIndex(null); // Сбрасываем выбранный индекс массива
    //         setFullscreenModalOpen(true);
    //     } else {
    //         console.error('Main image URL not found');
    //     }
    // };

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

    const filteredFileUrls = extractFileUrls(project?.content?.rendered || '');


    const descriptionWithoutImagesAndFiles = filteredFileUrls.reduce((content, fileUrl) => {
        // eslint-disable-next-line no-useless-escape
        const fileRegex = new RegExp(`<a[^>]+href="${fileUrl}"[^>]*>.*?<\/a>`, 'g');
        const imageRegex = /<img[^>]+src="([^">]+)"[^>]*>/g;

        const contentWithoutFiles = content.replace(fileRegex, '');

        return contentWithoutFiles.replace(imageRegex, '');
    }, project?.content?.rendered || '');


    const handleCloseFullscreenModal = () => {
        setFullscreenModalOpen(false);
    };

    const handleNextImage = () => {
        setSelectedImageIndex((prev) => {
            if (prev === images.length - 1) {
                return 0;
            }

            return prev + 1;
        });
    }

    const handlePrevImage = () => {
        setSelectedImageIndex((prev) => {
            if (prev === 0) {
                return images.length - 1;
            }

            return prev - 1;
        });
    }

    const renderImages = () => {
        const numImages = images.length;
        //approve
        if (numImages === 1) {
            return (
                <div style={{position: 'relative', height: '100%', width: '100%'}}>
                    {images.slice(0, 1).map((largestImage, index) => (
                        <img
                            key={index}
                            src={extractImageUrl(largestImage)}
                            alt={project.title?.rendered}
                            className={classes.facebookStyleImageLarge + ' ' + classes.largeActiveViewForMobile}
                            onClick={() => handleOpenFullscreenModal(0)}
                        />
                    ))}
                </div>
            );
            // approve
        } else if (numImages === 2) {
            return (
                <>
                    {images.slice(0, 2).map((largestImage, index) => (
                        <div key={index} style={{position: 'relative', height: '100%', width: '100%'}}>
                            <img
                                key={index}
                                src={extractImageUrl(largestImage)}
                                alt={project.title?.rendered}
                                className={classes.facebookStyleImage}
                                onClick={() => handleOpenFullscreenModal(index)}
                            />
                        </div>
                    ))}
                </>
            );
            //approve
        } else if (numImages === 3) {

            return (
                <>
                    <div className={classes.columnsWithTwoImagesAlternative + ' ' + classes.fullWidth}>
                        {images.slice(0, 2).map((largestImage, index) => (
                            <div key={index} style={{position: 'relative', height: '100%'}}>
                                <img
                                    key={index}
                                    alt={project.title?.rendered}
                                    src={extractImageUrl(largestImage)}
                                    className={classes.facebookStyleImage + ' ' + classes.twoImagesBoxView}
                                    onClick={() => handleOpenFullscreenModal(index)}
                                />
                            </div>
                        ))}
                    </div>
                    <div className={classes.columnsWithOneImage}>
                        {images.slice(2, 3).map((largestImage, index) => (
                            <img
                                src={extractImageUrl(largestImage)}
                                key={index}
                                alt={project.title?.rendered}
                                className={classes.facebookStyleImageLarge}
                                onClick={() => handleOpenFullscreenModal(index + 2)}
                            />
                        ))}
                    </div>
                </>
            );
            //approve
        } else if (numImages === 4) {

            return (
                <>
                    <div className={classes.columnsWithTwoImagesAlternative}>
                        {images.slice(0, 2).map((largestImage, index) => (
                            <div key={index} style={{position: 'relative', height: '100%', width: '100%'}}>
                                <img
                                    key={index}
                                    src={extractImageUrl(largestImage)}
                                    alt={project.title?.rendered}
                                    className={classes.facebookStyleImage + ' ' + classes.facebookStyleImageAlternative}
                                    onClick={() => handleOpenFullscreenModal(index)}
                                />
                            </div>
                        ))}
                    </div>
                    <div className={classes.columnsWithTwoImagesAlternative}>
                        {images.slice(2, 4).map((largestImage, index) => (
                            <div key={index} style={{position: 'relative', height: '100%', width: '100%'}}>
                                <img
                                    key={index}
                                    src={extractImageUrl(largestImage)}
                                    alt={project.title?.rendered}
                                    className={classes.facebookStyleImage + ' ' + classes.facebookStyleImageAlternative}
                                    onClick={() => handleOpenFullscreenModal(index + 2)}
                                />
                            </div>
                        ))}
                    </div>
                </>
            );
            //approve
        } else if (numImages >= 5) {

            return (
                <>
                    <div className={classes.columnsWithTwoImages}>
                        {images.slice(0, 2).map((largestImage, index) => (
                            <div key={index} style={{position: 'relative', width: '100%', height: '100%'}}>
                                <img
                                    src={extractImageUrl(largestImage)}
                                    alt={project.title?.rendered}
                                    key={index}
                                    className={classes.facebookStyleImage}
                                    onClick={() => handleOpenFullscreenModal(index)}
                                />
                            </div>
                        ))}
                    </div>
                    <div className={classes.columnsWithOneImage}>
                        {images.slice(2, 3).map((largestImage, index) => (
                            <img
                                src={extractImageUrl(largestImage)}
                                key={index}
                                alt={project.title?.rendered}
                                className={classes.facebookStyleImageLarge}
                                onClick={() => handleOpenFullscreenModal(index + 2)}
                            />
                        ))}
                    </div>
                    <div className={classes.columnsWithTwoImages}>
                        {images.slice(3, 5).map((largestImage, index) => (
                            <div key={index} style={{position: 'relative', width: '100%', height: '100%'}}>
                                <img
                                    src={extractImageUrl(largestImage)}
                                    alt={project.title?.rendered}
                                    key={index}
                                    className={classes.facebookStyleImage}
                                    onClick={() => handleOpenFullscreenModal(index + 3)}
                                />
                                {index === images.slice(3, 5).length - 1 && (
                                    <Button
                                        className={classes.viewAllButton}
                                        onClick={() => handleOpenFullscreenModal(0)}
                                    >
                                        kolejne {images.length}
                                    </Button>
                                )}
                            </div>
                        ))}
                    </div>

                </>
            );
        } else {
            // Логика для других случаев
            return null;
        }
    };

    return (
        <SectionWrapper paddingBottom="100px" paddingTop="120px">
            <BreadCrumbs/>
            <Box className={classes.contentWrapper}>
                <Box className={classes.textWrapper}>
                    <Box style={{borderBottom: '1px solid', borderColor: `${themes[theme].borderColor}`}}>
                        <Typography variant="h1" className={classes.title}
                                    dangerouslySetInnerHTML={{__html: project?.title?.rendered}}/>
                        <Typography variant="h1" className={classes.date}>
                            {new Date(project?.date).toLocaleDateString('pl-PL', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric'
                            })}
                        </Typography>
                        <ShareButton url={window.location.href}/>
                    </Box>

                    <Box>
                        <Box className={classes.descriptionContainer}>
                            {project?._embedded && project._embedded['wp:featuredmedia'] && (
                                <div>
                                    <img
                                        src={project._embedded['wp:featuredmedia'][0].source_url}
                                        alt={project.title?.rendered}
                                        className={classes.image}
                                        loading="lazy"
                                        //onClick={handleOpenMainImageModal}
                                    />
                                </div>
                            )}
                        </Box>
                        <Box className={classes.textContainer}>
                            <Typography variant="body1"
                                        dangerouslySetInnerHTML={{__html: descriptionWithoutImagesAndFiles}}
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
                    </Box>
                    <Box className={classes.columnsWrapper}>
                        {renderImages()}
                        <Backdrop className={classes.backdrop} open={loading}>
                            <CircularProgress color="inherit"/>
                        </Backdrop>
                    </Box>
                    {project && (
                        <CommentsSection comments={comments} postId={project.id}/>
                    )}
                </Box>

                <Box className={classes.imageWrapper}>
                    <Sidebar>
                        <ProjectCard projectLimit={3} smallProjectView seasonCard/>
                    </Sidebar>
                </Box>
            </Box>
            <Box>
                <DonatBadgeComponent/>
            </Box>
            <Box className={classes.nextSectionWrapper}>
                <Typography variant="h2" className={classes.titleNextInSection}>Podobne</Typography>
                <PostsCard postLimit={3} random={true}/>
            </Box>
            <Box className={classes.root}>
                <FullscreenModal
                    open={fullscreenModalOpen}
                    onClose={handleCloseFullscreenModal}
                    imgTag={images[selectedImageIndex]}
                    index={selectedImageIndex}
                    imageSrc={selectedImageIndex !== null && images[selectedImageIndex] ? extractImageUrl(images[selectedImageIndex]) : ''}
                    onNext={handleNextImage}
                    onPrev={handlePrevImage}
                />
            </Box>
            <Box>
                <ContactForm/>
            </Box>
        </SectionWrapper>
    );
};

export default ProjectDetails;