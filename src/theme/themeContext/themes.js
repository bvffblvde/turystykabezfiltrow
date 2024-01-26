import MainBannerLight from '../../assets/Banners/main-banner.png';
import MainBannerDark from '../../assets/Banners/main-banner-filter.png';


const themes = {
    light: {
        sectionWrapperBackgroundColor: '#F5F5F7',
        backgroundColor: '#ffffff',
        textColor: 'black',
        footerTextColor: 'white',
        footerTextColorHover: '#39B2B9',
        footerBackgroundColor: '#001F1A',
        borderColor: 'black',
        lineBackgroundColor: 'black',
        bannerTextColor: 'white',
        mainBannerBackgroundImage: `url(${MainBannerLight})`,

        postsTextColor: 'black',
        postsHoverTextColor: '#39B2B9',

        defaultButtonBackgroundColor: '#90AFFF',
        darkButtonBackgroundColor: '#001F1A',

        defaultButtonBorderColor: '#90AFFF',
        darkButtonBorderColor: '#001F1A',

        defaultButtonTextColor: 'black',
        darkButtonTextColor: 'white',

        iconColorFill: '#001F1A',

        // '&:hover': {
        defaultHoverButtonBackgroundColor: 'transparent',
        darkHoverButtonBackgroundColor: 'transparent',

        defaultHoverButtonBorderColor: '#90AFFF',
        darkHoverButtonBorderColor: '#001F1A',

        defaultHoverButtonTextColor: '#90AFFF',
        darkHoverButtonTextColor: '#001F1A',

        iconColorFillHover: '#39B2B9',

        paginationBackgroundColor: 'transparent',
        paginationTextColor: '#252525',
        paginationBorderColor: '#252525',

        paginationSelectedBackgroundColor: '#252525',
        paginationSelectedTextColor: 'white',
        paginationSelectedBorderColor: '#252525',

        useLocationLinkColor: '#252525',
        useLocationLinkColorHover: '#39B2B9',
        useLocationLinkColorNow: '#39B2B9',

        galleryButtonBorderColor: 'white',
        galleryHoverButtonBorderColor: '#39B2B9',
        galleryButtonIconFill: 'white',
        galleryHoverButtonIconFill: '#39B2B9',
        galleryButtonBackgroundColor: 'transparent',
        aboutPageTextTitleColor: '#353535',
        borderColorForAboutPage: '#D9D9D9',
        downloadButtonBorderColor: '#D9D9D9',
        downloadButtonBorderColorHover: '#39B2B9',


        floatingButtonBackgroundColor: '#39B2B9',
        floatingButtonBorderColor: 'transparent',


        defaultBorderColor: '#D9D9D9',
        hoverBorderColor: '#90AFFF',
        contactFormInputTextColor: '#252525',
        contactFormInputTextColorHover: '#90AFFF',

    },
    dark: {

        defaultBorderColor: '#FFEA2E',
        hoverBorderColor: '#FFEA2E',
        contactFormInputTextColor: '#FFEA2E',
        contactFormInputTextColorHover: '#FFEA2E',

        sectionWrapperBackgroundColor: '#151515',
        floatingButtonBackgroundColor: '#252525',
        floatingButtonBorderColor: '#FFEA2E',

        backgroundColor: '#151515',
        textColor: '#FFEA2E',
        footerBackgroundColor: '#151515',
        footerTextColor: '#FFEA2E',
        borderColor: '#FFEA2E',
        lineBackgroundColor: '#FFEA2E',
        borderColorForAboutPage: '#FFEA2E',
        mainBannerBackgroundImage: `url(${MainBannerDark})`,

        footerTextColorHover: '#FFEA2E',
        bannerTextColor: '#FFEA2E',
        postsTextColor: '#FFEA2E',
        postsHoverTextColor: '#FFEA2E',

        downloadButtonBorderColor: '#FFEA2E',
        downloadButtonBorderColorHover: '#FFEA2E',

        defaultButtonBackgroundColor: '#FFEA2E',
        darkButtonBackgroundColor: '#FFEA2E',

        defaultButtonBorderColor: '#FFEA2E',

        paginationSelectedBackgroundColor: '#FFEA2E',
        paginationSelectedTextColor: '#151515',
        paginationSelectedBorderColor: '#FFEA2E',

        paginationBackgroundColor: 'transparent',
        paginationTextColor: '#FFEA2E',
        paginationBorderColor: '#FFEA2E',


        defaultButtonTextColor: 'black',
        darkButtonTextColor: 'black',

        iconColorFill: '#FFEA2E',

        //'&:hover': {
        defaultHoverButtonBackgroundColor: 'transparent',
        darkHoverButtonBackgroundColor: 'transparent',

        defaultHoverButtonBorderColor: '#FFEA2E',
        darkHoverButtonBorderColor: '#FFEA2E',

        defaultHoverButtonTextColor: '#FFEA2E',
        darkHoverButtonTextColor: '#FFEA2E',

        iconColorFillHover: '#FFEA2E',


        useLocationLinkColor: '#FFEA2E',
        useLocationLinkColorHover: '#FFEA2E',
        useLocationLinkColorNow: '#FFEA2E',


        galleryButtonBorderColor: '#FFEA2E',
        galleryHoverButtonBorderColor: '#FFEA2E',
        galleryButtonIconFill: 'black',
        galleryHoverButtonIconFill: 'black',
        galleryButtonBackgroundColor: '#FFEA2E',

        aboutPageTextTitleColor: '#FFEA2E',
    },
};

export {themes};