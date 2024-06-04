const express = require('express');
const app = express();
const port = process.env.PORT || 5003;
const path = require('path');
const fs = require('fs')
const axios = require("axios");
const glob = require('glob');

function sendHTMLFileWithMetadata( title, description, imagePath, res) {
    const filePath = path.resolve(__dirname, './build','index.html' );
    fs.readFile(filePath, 'utf8', function (err, data) {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }
        data = data.replace(/\$OG_TITLE/g, title);
        data = data.replace(/\$OG_DESCRIPTION/g, description);
        data = data.replace(/\$OG_IMAGE/g, imagePath);
        data = data.replace(/\$OG_SITE_NAME/g, 'TURYSTYKA BEZ FILTRÓW');
        res.send(data);
    });
}


app.get('/', function (req, res) {
    sendHTMLFileWithMetadata( 'TURYSTYKA BEZ FILTRÓW',
        'Description for Main Page',
        'https://i.ibb.co/G7Bc9Q0/image.png', res);
});

app.get('/bydgoszcz', async  function (req, res) {
    const bydgoszczCategoryIdResponse = await axios.get(`https://weckwerthblog.wpcomstaging.com/wp-json/wp/v2/categories?slug=bydgoszcz`);
    const d = await   bydgoszczCategoryIdResponse.data;

    sendHTMLFileWithMetadata(d[0].yoast_head_json.og_title, d[0].yoast_head_json.og_title, 'https://i.ibb.co/559KBvg/image.png', res);
});

app.get('/bydgoszcz/:categorySlug', function (req, res) {

    console.log(req.url)

    sendHTMLFileWithMetadata( 'Bydgoszcz Posts', 'Description for Bydgoszcz Posts', `https://${req.host}/static/media/bydgoszcz-posts-image.png`, res);
});
app.get('/bydgoszcz/:categorySlug/:postSlug', async function (req, res) {
    const response = await fetch(
        `https://weckwerthblog.wpcomstaging.com/wp-json/wp/v2/posts?slug=${req.params.postSlug}&_embed=true`
    );
    const d = await response.json();
    sendHTMLFileWithMetadata(d[0].yoast_head_json.title, d[0].yoast_head_json.description, d[0].jetpack_featured_media_url, res);
});

app.get('/regiony', function (req, res) {
    sendHTMLFileWithMetadata( 'Regiony', 'Description for Regiony', 'https://i.ibb.co/VMBq5DJ/image.png', res);
});

app.get('/regiony/:tagSlug', function (req, res) {
    sendHTMLFileWithMetadata( 'Regiony Posts', 'Description for Regiony Posts', '/static/media/regiony-posts-image.png', res);
});
app.get('/regiony/:tagSlug/:postSlug',async function (req, res) {

    const response = await fetch(
        `https://weckwerthblog.wpcomstaging.com/wp-json/wp/v2/posts?slug=${req.params.postSlug}&_embed=true`
    );
    const d = await response.json();
    sendHTMLFileWithMetadata( d[0].yoast_head_json.title, d[0].yoast_head_json.description, d[0].jetpack_featured_media_url, res);
});

app.get('/kraje', function (req, res) {
    sendHTMLFileWithMetadata( 'Kraje', 'Description for Kraje', 'https://i.ibb.co/sH5MVGq/image.png', res);
});

app.get('/kraje/:tagSlug', function (req, res) {
    sendHTMLFileWithMetadata( 'Kraje Posts', 'Description for Kraje Posts', '/static/media/kraje-posts-image.png', res);
});
app.get('/kraje/:tagSlug/:postSlug', async function (req, res) {
    const response = await fetch(
        `https://weckwerthblog.wpcomstaging.com/wp-json/wp/v2/posts?slug=${req.params.postSlug}&_embed=true`
    );
    const d = await response.json();
    sendHTMLFileWithMetadata('Kraje Posts', 'Description for Kraje Posts', d[0].jetpack_featured_media_url, res);
});

app.get('/aktualnosci', function (req, res) {
    sendHTMLFileWithMetadata( 'Aktualności', 'Description for Artykuly', 'https://i.ibb.co/RSwnbXj/2024-06-04-16-12-32.png', res);
});

// app.get('/artykuly/:postSlug', async function (req, res) {
//
//     res.redirect(`/aktualnosci/${req.params.postSlug}`);
// });

app.get('/aktualnosci/:postSlug', async function (req, res) {
    const response = await fetch(
        `https://weckwerthblog.wpcomstaging.com/wp-json/wp/v2/posts?slug=${req.params.postSlug}&_embed=true`
);
    const d = await   response.json();

    sendHTMLFileWithMetadata( d[0].yoast_head_json.title, d[0].yoast_head_json.description, d[0].jetpack_featured_media_url, res);
});

app.get('/wycieczki', function (req, res) {
    sendHTMLFileWithMetadata( 'Wycieczki', 'Description for Wycieczki', 'https://i.ibb.co/C8pVgT7/image.png', res);
});

app.get('/wycieczki/:projectSlug', async function (req, res) {
    const categoriesResponse = await fetch(
        'https://weckwerthblog.wpcomstaging.com/wp-json/wp/v2/categories?per_page=100'
    );
    const categories = await categoriesResponse.json();

    // Ищем категорию 'wycieczki' независимо от регистра
    const wycieczkiCategory = categories.find(
        (category) => category.name.toLowerCase() === 'wycieczki'
    );

    if (!wycieczkiCategory) {
        throw new Error('Wycieczki category not found');
    }

    // Получаем посты из категории 'wycieczki'
    const response = await fetch(
        `https://weckwerthblog.wpcomstaging.com/wp-json/wp/v2/posts?categories=${wycieczkiCategory.id}&slug=${req.params.projectSlug}&_embed=true`
    );

    const d = await response.json();

    sendHTMLFileWithMetadata( d[0].yoast_head_json.title, d[0].yoast_head_json.description, d[0].jetpack_featured_media_url, res);
});

app.get('/wydarzenia', function (req, res) {
    sendHTMLFileWithMetadata( 'Wydarzenia', 'Description for Wydarzenia', 'https://i.ibb.co/nRpdXQQ/image.png', res);
});

app.get('/wydarzenia/:postSlug', async function (req, res) {

    const response = await fetch(
        `https://weckwerthblog.wpcomstaging.com/wp-json/wp/v2/posts?slug=${req.params.postSlug}&_embed=true`
    );
    const d = await response.json();

    sendHTMLFileWithMetadata(d[0].yoast_head_json.title, d[0].yoast_head_json.description, d[0].jetpack_featured_media_url, res);
});

app.get('/filmy', function (req, res) {
    sendHTMLFileWithMetadata('Filmy', 'Filmy', 'https://i.ibb.co/t2RnwsH/image.png', res);
});

app.get('/wyszukiwarka', function (req, res) {
    sendHTMLFileWithMetadata( 'Wyszukiwarka', 'Description for Wyszukiwarka', '/static/media/wyszukiwarka-image.png', res);
});

app.get('/szlaki/*', async function (req, res) {

    const response = await fetch(
        `https://weckwerthblog.wpcomstaging.com/wp-json/wp/v2/posts?slug=${req.params.postSlug}&_embed=true`
    );
    const d = await response.json();
    console.log(d[0].yoast_head_json)

    sendHTMLFileWithMetadata(d[0].yoast_head_json.title, d[0].yoast_head_json.description, d[0].jetpack_featured_media_url, res);
});

app.get('/declaracja-dostepnosci', function (req, res) {
    sendHTMLFileWithMetadata('Declaracja Dostepnosci', 'Description for Declaracja Dostepnosci', 'https://i.ibb.co/f2HNYrk/2024-06-04-16-36-31.png', res);
});

app.get('/sklep', function (req, res) {
    sendHTMLFileWithMetadata('Sklep', 'Description for Sklep', 'https://i.ibb.co/HxnVFs0/2024-06-04-16-40-22.png', res);
});

app.get('/sklep/:productSlug', async function (req, res) {

    const response = await fetch(
        `https://weckwerthblog.wpcomstaging.com/wp-json/wc/v3/products?slug=${req.params.productSlug}`
    );
    const d = await response.json();

    sendHTMLFileWithMetadata(d[0].yoast_head_json.title, d[0].yoast_head_json.description, d[0].jetpack_featured_media_url, res);
});

app.get('/sklep/koszyk', function (req, res) {
    sendHTMLFileWithMetadata('Koszyk', 'Description for Koszyk', 'https://i.ibb.co/HK5mpmv/2024-06-04-16-40-34.png', res);
});


    app.get('/sklep/koszyk/podsumowanie', function (req, res) {
        sendHTMLFileWithMetadata('Podsumowanie', 'Description for Podsumowanie', 'https://i.ibb.co/0VxmrGq/2024-06-04-16-49-08.png\n', res);
    });

app.get('/o-nas', function (req, res) {
    sendHTMLFileWithMetadata( 'O Nas', 'Description for O Nas', 'https://i.ibb.co/HgjXspB/image.png', res);
});

app.get('/projekty/:projectSlug', async function (req, res) {
    const categoriesResponse = await fetch(
        'https://weckwerthblog.wpcomstaging.com/wp-json/wp/v2/categories?per_page=100'
    );
    const categories = await categoriesResponse.json();

    const projektyCategory = categories.find(
        (category) => category.name.toLowerCase() === 'projekty'
    );

    if (!projektyCategory) {
        throw new Error('Wycieczki category not found');
    }

    const response = await fetch(
        `https://weckwerthblog.wpcomstaging.com/wp-json/wp/v2/posts?categories=${projektyCategory.id}&slug=${req.params.projectSlug}&_embed=true`
    );

    const d = await response.json();
    console.log(d[0].yoast_head_json)

    sendHTMLFileWithMetadata( d[0].yoast_head_json.title, d[0].yoast_head_json.description, d[0].jetpack_featured_media_url, res);
});


app.use(express.static(path.resolve(__dirname, './build')));

app.get('*', async (request, response)=> {

    const urlRequest = request.originalUrl.split(1);
    const allCategory = await axios.get(`https://weckwerthblog.wpcomstaging.com/wp-json/wp/v2/categories`);
    const searchedPost =  await axios.get(`https://weckwerthblog.wpcomstaging.com/wp-json/wp/v2/posts/?slug=${urlRequest}`)
        .then((response) => response.data);

    // if(urlRequest[0].includes('/artykuly/')){
    //     response.redirect(urlRequest[0].replace('/artykuly/','/aktualnosci/'));
    // }

    if(urlRequest && searchedPost[0] && searchedPost[0].categories.length>0){

        if(searchedPost[0].categories.includes(14786)){
            response.redirect(`/aktualnosci${urlRequest}`);
        }
        if(searchedPost[0].categories.includes(730842049)){
            response.redirect(`/wycieczki${urlRequest}`);
        }
    }



    if(urlRequest[0].includes('category')){
        let r = urlRequest[0].replace('/category','')
        response.redirect(`${r}`);
    }else{
        if(Object.keys(searchedPost).length>0 ){

            // sendHTMLFileWithMetadata( '404', '404', '/static/media/main-about-page.*.png',response);

            // response.redirect(`/artykuly${urlRequest}`);

        }
    }
    // sendHTMLFileWithMetadata( '404', '404', '/static/media/main-about-page.*.png');

    const filePath = path.resolve(__dirname, './build', 'index.html');
    response.sendFile(filePath);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
