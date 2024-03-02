const express = require('express');
const app = express();
const port = process.env.PORT || 5002;
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
        '/static/media/main-image.png', res);
});

app.get('/bydgoszcz', async  function (req, res) {
    const bydgoszczCategoryIdResponse = await axios.get(`https://weckwerthblog.wordpress.com/wp-json/wp/v2/categories?slug=bydgoszcz`);
    const d = await   bydgoszczCategoryIdResponse.data;

    sendHTMLFileWithMetadata(d[0].yoast_head_json.og_title, d[0].yoast_head_json.og_title, '/static/media/bydgoszcz-image.png', res);
});

app.get('/bydgoszcz/:categorySlug', function (req, res) {

    console.log(req.url)

    sendHTMLFileWithMetadata( 'Bydgoszcz Posts', 'Description for Bydgoszcz Posts', `https://${req.host}/static/media/bydgoszcz-posts-image.png`, res);
});
app.get('/bydgoszcz/:categorySlug/:postSlug', async function (req, res) {
    const response = await fetch(
        `https://weckwerthblog.wordpress.com/wp-json/wp/v2/posts?slug=${req.params.postSlug}&_embed=true`
    );
    const d = await response.json();
    console.log(await response.json())
    sendHTMLFileWithMetadata(d[0].yoast_head_json.title, d[0].yoast_head_json.description, d[0].jetpack_featured_media_url, res);
});

app.get('/regiony', function (req, res) {
    sendHTMLFileWithMetadata( 'Regiony', 'Description for Regiony', '/static/media/regiony-image.png', res);
});

app.get('/regiony/:tagSlug', function (req, res) {
    sendHTMLFileWithMetadata( 'Regiony Posts', 'Description for Regiony Posts', '/static/media/regiony-posts-image.png', res);
});
app.get('/regiony/:tagSlug/:postSlug',async function (req, res) {

    const response = await fetch(
        `https://weckwerthblog.wordpress.com/wp-json/wp/v2/posts?slug=${req.params.postSlug}&_embed=true`
    );
    const d = await response.json();
    console.log(await response.json())
    sendHTMLFileWithMetadata( d[0].yoast_head_json.title, d[0].yoast_head_json.description, d[0].jetpack_featured_media_url, res);
});

app.get('/kraje', function (req, res) {
    sendHTMLFileWithMetadata( 'Kraje', 'Description for Kraje', '/static/media/kraje-image.png', res);
});

app.get('/kraje/:tagSlug', function (req, res) {
    sendHTMLFileWithMetadata( 'Kraje Posts', 'Description for Kraje Posts', '/static/media/kraje-posts-image.png', res);
});
app.get('/kraje/:tagSlug/:postSlug', async function (req, res) {
    const response = await fetch(
        `https://weckwerthblog.wordpress.com/wp-json/wp/v2/posts?slug=${req.params.postSlug}&_embed=true`
    );
    const d = await response.json();
    console.log(d[0].yoast_head_json)
    sendHTMLFileWithMetadata('Kraje Posts', 'Description for Kraje Posts', d[0].jetpack_featured_media_url, res);
});

app.get('/artykuly', function (req, res) {
    sendHTMLFileWithMetadata( 'Artykuly', 'Description for Artykuly', '/static/media/artykuly-image.png', res);
});

app.get('/artykuly/:postSlug', async function (req, res) {
    const response = await fetch(
        `https://weckwerthblog.wordpress.com/wp-json/wp/v2/posts?slug=${req.params.postSlug}&_embed=true`
);
    const d = await   response.json();
    console.log(d[0].yoast_head_json)

    sendHTMLFileWithMetadata( d[0].yoast_head_json.title, d[0].yoast_head_json.description, d[0].jetpack_featured_media_url, res);
});

app.get('/wycieczki', function (req, res) {
    sendHTMLFileWithMetadata( 'Wycieczki', 'Description for Wycieczki', '/static/media/wycieczki-image.png', res);
});

app.get('/wycieczki/:projectSlug', async function (req, res) {
    const categoriesResponse = await fetch(
        'https://weckwerthblog.wordpress.com/wp-json/wp/v2/categories?per_page=100'
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
        `https://weckwerthblog.wordpress.com/wp-json/wp/v2/posts?categories=${wycieczkiCategory.id}&slug=${req.params.projectSlug}&_embed=true`
    );

    const d = await response.json();
    console.log(d[0].yoast_head_json)

    sendHTMLFileWithMetadata( d[0].yoast_head_json.title, d[0].yoast_head_json.description, d[0].jetpack_featured_media_url, res);
});

app.get('/wydarzenia', function (req, res) {
    sendHTMLFileWithMetadata( 'Wydarzenia', 'Description for Wydarzenia', '/static/media/wydarzenia-image.png', res);
});

app.get('/wydarzenia/:postSlug', async function (req, res) {

    const response = await fetch(
        `https://weckwerthblog.wordpress.com/wp-json/wp/v2/posts?slug=${req.params.postSlug}&_embed=true`
    );
    const d = await response.json();
    console.log(d[0].yoast_head_json)

    sendHTMLFileWithMetadata(d[0].yoast_head_json.title, d[0].yoast_head_json.description, d[0].jetpack_featured_media_url, res);
});

app.get('/filmy', function (req, res) {
    sendHTMLFileWithMetadata('Filmy', 'Filmy', '/static/media/filmy.png', res);
});

app.get('/wyszukiwarka', function (req, res) {
    sendHTMLFileWithMetadata( 'Wyszukiwarka', 'Description for Wyszukiwarka', '/static/media/wyszukiwarka-image.png', res);
});

app.get('/szlaki/*', async function (req, res) {

    const response = await fetch(
        `https://weckwerthblog.wordpress.com/wp-json/wp/v2/posts?slug=${req.params.postSlug}&_embed=true`
    );
    const d = await response.json();
    console.log(d[0].yoast_head_json)

    sendHTMLFileWithMetadata(d[0].yoast_head_json.title, d[0].yoast_head_json.description, d[0].jetpack_featured_media_url, res);
});

app.get('/declaracja-dostepnosci', function (req, res) {
    sendHTMLFileWithMetadata('Declaracja Dostepnosci', 'Description for Declaracja Dostepnosci', '/static/media/declaracja-dostepnosci-image.png', res);
});

app.get('/o-nas', function (req, res) {
    sendHTMLFileWithMetadata( 'O Nas', 'Description for O Nas', '/static/media/main-about-page.*.png', res);
});


app.use(express.static(path.resolve(__dirname, './build')));

app.get('*', function (request, response) {
    const filePath = path.resolve(__dirname, './build', 'index.html');
    response.sendFile(filePath);
});

app.listen(port, () => console.log(`Listening on port ${port}`));