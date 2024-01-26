import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {
    makeStyles,
    Typography,
    Box,
    Button,
    CircularProgress, Backdrop,
} from '@material-ui/core';
import SectionWrapper from '../../UI/SectionWrapper';
import {useTheme} from '../../../theme/themeContext';
import {themes} from '../../../theme/themeContext/themes';
import BreadCrumbs from '../../UI/BreadCrumbs';
import FullscreenModal from "../../UI/ImageModalComponent";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '32px',
    },
    title: {
        fontFamily: 'Helvetica-Bold',
        fontSize: '56px',
        fontWeight: 700,
        lineHeight: '76px',
        letterSpacing: '0em',
        color: ({textColor}) => textColor,
        marginBottom: '10px',
        [theme.breakpoints.down('sm')]: {
            fontSize: '20px',
            fontWeight: 700,
            lineHeight: '23px',
            letterSpacing: '0em',
        },
    },
    description: {
        fontFamily: 'Helvetica-Regular',
        fontSize: '20px',
        fontWeight: 400,
        lineHeight: '23px',
        letterSpacing: '0em',
        color: ({textColor}) => textColor,
        '& p': {
            margin: '0',
        },
        '& a': {
            color: ({textColor}) => textColor,
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '16px',
            lineHeight: '18px',
        }
    },
    date: {
        fontFamily: 'Helvetica-Regular',
        fontSize: '20px',
        fontWeight: 400,
        lineHeight: '23px',
        letterSpacing: '0em',
        opacity: '0.6',
        color: ({textColor}) => textColor,
        marginBottom: '20px',
        [theme.breakpoints.down('sm')]: {
            fontSize: '16px',
            lineHeight: '18px',
            marginBottom: '32px',
        },
    },
    imageContainer: {
        width: '100%',
        height: '100%',
        position: 'relative',
        '& img': {
            width: '100%',
            maxHeight: '700px',
            borderRadius: '0',
            objectFit: 'cover',
            aspectRatio: '3/4',
            listStyle: 'none',
            paddingLeft: 0,
            cursor: 'pointer',
            transition: 'transform 0.3s ease-in-out',
        },
    },
    image: {
        width: '100%',
        height: 'auto',
    },
    imageMobile: {
        display: 'none',
        [theme.breakpoints.down('sm')]: {
            display: 'block',
            width: '100%',
            height: 'auto',
            cursor: 'pointer',
            marginBottom: '20px',
        }
    },
    textContainer: {
        width: '100%',
        height: '100%',
        '& figure': {
            display: 'none',
        }
    },
    contentWrapper: {
        display: 'flex',
        flexDirection: 'row',
        gap: '20px',
        paddingBottom: '30px',
        borderBottom: '1px solid',
        borderColor: ({borderColor}) => borderColor,
    },
    facebookStyleImage: {
        width: '100%',
        height: '100%',
        marginBottom: '0',
        borderRadius: '0',
        objectFit: 'cover',
        objectPosition: 'center',
        aspectRatio: '3/4',
        cursor: 'pointer',
        listStyle: 'none',
        paddingLeft: 0,
        transition: 'transform 0.3s ease-in-out',
    },
    facebookStyleImageAlternative: {
        height: '100%',
        aspectRatio: '3/2',
        [theme.breakpoints.down('sm')]: {
            aspectRatio: '3/4',
        }
    },
    facebookStyleImageLarge: {
        width: '100%',
        height: '100%',
        borderRadius: '0',
        objectFit: 'cover',
        aspectRatio: '3/4',
        cursor: 'pointer',
        listStyle: 'none',
        paddingLeft: 0,
        transition: 'transform 0.3s ease-in-out',
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        }
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    columnsWithTwoImages: {
        width: '25%',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        [theme.breakpoints.down('sm')]: {
            width: '50%',
        }
    },
    columnsWithTwoImagesAlternative: {
        width: '50%',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        [theme.breakpoints.down('sm')]: {
            width: '50%',
        }
    },
    columnsWithOneImage: {
        width: '50%',
        [theme.breakpoints.down('sm')]: {
            width: 'unset',
            display: 'none',
        }
    },
    columnsWrapper: {
        display: 'flex',
        flexDirection: 'row',
        gap: '20px',
        width: '100%'
    },
    viewAllButton: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        color: ({bannerTextColor}) => bannerTextColor,
        width: '100%',
        height: '100%',
        borderRadius: '0',
        position: 'absolute',
        top: '50%',
        fontFamily: 'Helvetica-Bold',
        fontSize: '32px',
        fontWeight: 700,
        lineHeight: '24px',
        textTransform: 'none',
        letterSpacing: '0em',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1,
        padding: '10px 20px',
        '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '20px',
        }
    },
    textWrapper: {
        width: '65%',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        }
    },
    imageWrapper: {
        width: '35%',
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        }
    },
    fullWidth: {
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        }
    },
    largeActiveViewForMobile: {
        [theme.breakpoints.down('sm')]: {
            display: 'block',
        }
    }

}));

const PostDetails = () => {
    const {theme} = useTheme();
    const classes = useStyles(themes[theme]);
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);
    const [fullscreenModalOpen, setFullscreenModalOpen] = useState(false);


    const {postSlug} = useParams();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            try {
                const response = await fetch(
                    `https://fundacjanadrzeka.com/wp-json/wp/v2/posts?slug=${postSlug}&_embed=true`
                );

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const [data] = await response.json();
                setPost(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        setSelectedImageIndex(0);

        fetchData();
    }, [postSlug]);


    const extractImageUrls = (content) => {
        const imageUrls = [];
        const emojiRegex = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g; // RegExp для поиска смайликов

        const regex = /<img[^>]+src="([^">]+)"[^>]*>/g;
        let match;
        while ((match = regex.exec(content)) !== null) {
            const imageUrl = match[1];

            if (!imageUrl.match(emojiRegex)) {
                imageUrls.push(imageUrl);
            }
        }
        return imageUrls;
    };

    const imageUrls = extractImageUrls(post?.content?.rendered || '');
    const descriptionWithoutImages = post?.content?.rendered?.replace(/<img[^>]+src="([^">]+)"[^>]*>/g, '');

    const handleOpenFullscreenModal = (index) => {
        setSelectedImageIndex(index);  // Используем переданный индекс
        setFullscreenModalOpen(true);
    };

    const handleOpenMainImageModal = () => {
        const mainImageUrl = post?._embedded?.['wp:featuredmedia']?.[0]?.source_url;
        console.log('Main Image URL:', mainImageUrl); // Отладочное сообщение

        if (mainImageUrl) {
            setSelectedImageIndex(null); // Сбрасываем выбранный индекс массива
            setFullscreenModalOpen(true);
        } else {
            console.error('Main image URL not found');
        }
    };

    const handleCloseFullscreenModal = () => {
        setFullscreenModalOpen(false);
    };

    const handleNextImage = () => {
        setSelectedImageIndex((prev) => {
            if (prev === imageUrls.length - 1) {
                return 0;
            }

            return prev + 1;
        });
    }

    const handlePrevImage = () => {
        setSelectedImageIndex((prev) => {
            if (prev === 0) {
                return imageUrls.length - 1;
            }

            return prev - 1;
        });
    }
    //TODO: refactor this govnocode
    const renderImages = () => {
        const numImages = imageUrls.length;
        //approve
        if (numImages === 1) {
            return (
                <div style={{position: 'relative', height: '100%', width: '100%'}}>
                    <img
                        src={imageUrls[0]}
                        alt="AlbumImage 1"
                        className={classes.facebookStyleImageLarge + ' ' + classes.largeActiveViewForMobile}
                        onClick={() => handleOpenFullscreenModal(0)}
                    />
                </div>
            );
        // approve
        } else if (numImages === 2) {
            return (
                <>
                    {imageUrls.slice(0, 2).map((imageUrl, index) => (
                        <div key={index} style={{position: 'relative', height: '100%', width: '100%'}}>
                            <img
                                src={imageUrl}
                                alt={`AlbumImage ${index + 1}`}
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
                    <Box className={classes.columnsWithTwoImagesAlternative + ' ' + classes.fullWidth}>
                        {imageUrls.slice(0, 2).map((imageUrl, index) => (
                            <div key={index} style={{position: 'relative', height: '100%'}}>
                                <img
                                    src={imageUrl}
                                    alt={`AlbumImage ${index + 1}`}
                                    className={classes.facebookStyleImage}
                                    style={{aspectRatio: 'unset'}}
                                    onClick={() => handleOpenFullscreenModal(index)}
                                />
                            </div>
                        ))}
                    </Box>
                    <Box className={classes.columnsWithOneImage}>
                        {imageUrls.slice(2, 3).map((imageUrl, index) => (
                            <img
                                key={index + 2}
                                src={imageUrl}
                                alt={`AlbumImage ${index + 3}`}
                                className={classes.facebookStyleImageLarge}
                                onClick={() => handleOpenFullscreenModal(index + 2)}
                            />
                        ))}
                    </Box>
                </>
            );
        //approve
        } else if (numImages === 4) {

            return (
                <>
                    <Box className={classes.columnsWithTwoImagesAlternative}>
                        {imageUrls.slice(0, 2).map((imageUrl, index) => (
                            <div key={index} style={{position: 'relative', height: '100%', width: '100%'}}>
                                <img
                                    src={imageUrl}
                                    alt={`AlbumImage ${index + 1}`}
                                    className={classes.facebookStyleImage + ' ' + classes.facebookStyleImageAlternative}
                                    onClick={() => handleOpenFullscreenModal(index)}
                                />
                            </div>
                        ))}
                    </Box>
                    <Box className={classes.columnsWithTwoImagesAlternative}>
                        {imageUrls.slice(2, 4).map((imageUrl, index) => (
                            <div key={index + 3} style={{position: 'relative', height: '100%', width: '100%'}}>
                                <img
                                    src={imageUrl}
                                    alt={`AlbumImage ${index + 4}`}
                                    className={classes.facebookStyleImage + ' ' + classes.facebookStyleImageAlternative}
                                    onClick={() => handleOpenFullscreenModal(index + 2)}
                                />
                            </div>
                        ))}
                    </Box>
                </>
            );
        //approve
        } else if (numImages >= 5) {

            return (
                <>
                    <Box className={classes.columnsWithTwoImages}>
                        {imageUrls.slice(0, 2).map((imageUrl, index) => (
                            <div key={index} style={{position: 'relative', height: '100%'}}>
                                <img
                                    src={imageUrl}
                                    alt={`AlbumImage ${index + 1}`}
                                    className={classes.facebookStyleImage}
                                    onClick={() => handleOpenFullscreenModal(index)}
                                />
                            </div>
                        ))}
                    </Box>
                    <Box className={classes.columnsWithOneImage}>
                        {imageUrls.slice(2, 3).map((imageUrl, index) => (
                            <img
                                key={index + 2}
                                src={imageUrl}
                                alt={`AlbumImage ${index + 3}`}
                                className={classes.facebookStyleImageLarge}
                                onClick={() => handleOpenFullscreenModal(index + 2)}
                            />
                        ))}
                    </Box>
                    <Box className={classes.columnsWithTwoImages}>
                        {imageUrls.slice(3, 5).map((imageUrl, index) => (
                            <div key={index + 3} style={{position: 'relative', height: '100%'}}>
                                <img
                                    src={imageUrl}
                                    alt={`AlbumImage ${index + 4}`}
                                    className={classes.facebookStyleImage}
                                    onClick={() => handleOpenFullscreenModal(index + 3)}
                                />
                                {index === imageUrls.slice(3, 5).length - 1 && (
                                    <Button
                                        className={classes.viewAllButton}
                                        onClick={() => handleOpenFullscreenModal(0)}
                                    >
                                        kolejne {imageUrls.length}
                                    </Button>
                                )}
                            </div>
                        ))}
                    </Box>
                </>
            );
        } else {
            // Логика для других случаев
            return null;
        }
    };


    return (
        <SectionWrapper paddingBottom="100px" paddingTop="20px">
            <BreadCrumbs/>
            <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Box className={classes.contentWrapper}>
                <Box className={classes.textWrapper}>
                    <Typography variant="h1" className={classes.title}
                                dangerouslySetInnerHTML={{__html: post?.title?.rendered}}/>
                    <Typography variant="h1" className={classes.date}>
                        {new Date(post?.date).toLocaleDateString('pl-PL', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                        })}
                    </Typography>
                    <Box>
                        {post?._embedded && post._embedded['wp:featuredmedia'] && (
                            <div>
                                <img
                                    src={post._embedded['wp:featuredmedia'][0].source_url}
                                    alt={post.title?.rendered}
                                    className={classes.imageMobile}
                                    loading="lazy"
                                    onClick={handleOpenMainImageModal}

                                />
                            </div>
                        )}
                    </Box>
                    <Box className={classes.textContainer}>
                        <Typography variant="body1" dangerouslySetInnerHTML={{__html: descriptionWithoutImages}}
                                    className={classes.description}/>
                    </Box>
                </Box>
                <Box className={classes.imageWrapper}>
                    {post?._embedded && post._embedded['wp:featuredmedia'] && (
                        <div className={classes.imageContainer}>
                            <img
                                src={post._embedded['wp:featuredmedia'][0].source_url}
                                alt={post.title?.rendered}
                                className={classes.image}
                                loading="lazy"
                                onClick={handleOpenMainImageModal}
                            />
                        </div>
                    )}

                </Box>
            </Box>

            <Box className={classes.root}>
                <Box className={classes.columnsWrapper}>
                    {/*<Box className={classes.columnsWithTwoImages}>*/}
                    {/*    {imageUrls.slice(0, 2).map((imageUrl, index) => (*/}
                    {/*        <div key={index} style={{position: 'relative', height: '100%'}}>*/}
                    {/*            <img*/}
                    {/*                src={imageUrl}*/}
                    {/*                alt={`Image ${index + 1}`}*/}
                    {/*                className={classes.facebookStyleImage}*/}
                    {/*                onClick={() => handleOpenFullscreenModal(index)}*/}
                    {/*            />*/}
                    {/*        </div>*/}
                    {/*    ))}*/}
                    {/*</Box>*/}
                    {/*<Backdrop className={classes.backdrop} open={loading}>*/}
                    {/*    <CircularProgress color="inherit" />*/}
                    {/*</Backdrop>*/}
                    {/*<Box className={classes.columnsWithOneImage}>*/}
                    {/*    {imageUrls.slice(2, 3).map((imageUrl, index) => (*/}
                    {/*        <img*/}
                    {/*            key={index + 2}*/}
                    {/*            src={imageUrl}*/}
                    {/*            alt={`Image ${index + 3}`}*/}
                    {/*            className={classes.facebookStyleImageLarge}*/}
                    {/*            onClick={() => handleOpenFullscreenModal(index + 2)}*/}
                    {/*        />*/}
                    {/*    ))}*/}
                    {/*</Box>*/}
                    {/*<Box className={classes.columnsWithTwoImages}>*/}
                    {/*    {imageUrls.slice(3, 5).map((imageUrl, index) => (*/}
                    {/*        <div key={index + 3} style={{position: 'relative', height: '100%'}}>*/}
                    {/*            <img*/}
                    {/*                src={imageUrl}*/}
                    {/*                alt={`Image ${index + 4}`}*/}
                    {/*                className={classes.facebookStyleImage}*/}
                    {/*                onClick={() => handleOpenFullscreenModal(index + 3)}*/}
                    {/*            />*/}
                    {/*            {index === imageUrls.slice(3, 5).length - 1 && (*/}
                    {/*                <Button*/}
                    {/*                    className={classes.viewAllButton}*/}
                    {/*                    onClick={() => handleOpenFullscreenModal(0)}*/}
                    {/*                >*/}
                    {/*                    kolejne {imageUrls.length}*/}
                    {/*                </Button>*/}
                    {/*            )}*/}
                    {/*        </div>*/}
                    {/*    ))}*/}
                    {/*</Box>*/}
                    <Box className={classes.columnsWrapper}>{renderImages()}</Box>
                </Box>
                <FullscreenModal
                    open={fullscreenModalOpen}
                    onClose={handleCloseFullscreenModal}
                    imageSrc={
                        selectedImageIndex !== null
                            ? imageUrls[selectedImageIndex]
                            : post?._embedded?.['wp:featuredmedia']?.[0]?.source_url || ''
                    }
                    onNext={handleNextImage}
                    onPrev={handlePrevImage}
                />
            </Box>
        </SectionWrapper>
    );
};

export default PostDetails;
