import React from 'react';
import { Helmet } from 'react-helmet-async';

const RichLink = ({ name, title, description, image }) => {
    // Функция для удаления HTML-тегов из строки
    const stripHtml = (html) => {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || "";
    };

    return (
        <Helmet>
            <title>{stripHtml(name)}</title>
            <meta property="og:title" content={stripHtml(title)} />
            <meta property="og:description" content={stripHtml(description)} />
            <meta property="og:image" content={image} />
            <meta property="og:image:alt" content={stripHtml(title)} />
            <meta property="og:image:width" content="1359" />
            <meta property="og:image:height" content="1282" />
            <meta property="og:image:aspect_ratio" content="1359:1282" />
        </Helmet>
    );
};

export default RichLink;
