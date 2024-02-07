const navLinksDataBydgoszcz = [
    {
        url: '/bydgoszcz',
        title: 'Bydgoszcz',
        subLinks: [
            {url: '/bydgoszcz/cykl-bydgoszcz-przez-dziurke-od-klucza', subTitle: 'BYDGOSZCZ PRZEZ DZIURKĘ OD KLUCZA'},
            {url: '/bydgoszcz/cykl-bydgoskie-osiedla-bez-filtrow', subTitle: 'BYDGOSKIE OSIEDLA BEZ FILTRÓW'},
            {url: '/bydgoszcz/cykl-bydgoszcz-narodzona-z-wody', subTitle: 'BYDGOSZCZ – NARODZONA Z WODY'},
            {url: '/bydgoszcz/cykl-cuda-bydgoskie', subTitle: 'CUDA BYDGOSKIE'},
            {url: '/bydgoszcz/inne-bydgoskie', subTitle: 'INNE BYDGOSKIE'},
            {url: '/artykuly/bartodzieje-szlak', subTitle: 'SZLAKIEM BYDGOSKICH OSIEDLI #1 – BARTODZIEJE'},

        ].sort((a, b) => a.subTitle.localeCompare(b.subTitle)),
    },
    // {
    //     url: 'https://turystykabezfiltrow.com/wycieczki/',
    //     text: 'Sklep',
    // },
];

const navLinksDataRegiony = [
    {
        url: '/regiony',
        title: 'Regiony',
        subLinks: [
            {url: '/regiony/wloclawek', subTitle: 'WŁOCŁAWEK'},
            {url: '/regiony/inowroclaw', subTitle: 'INOWROCŁAW'},
            {url: '/regiony/krakow', subTitle: 'KRAKÓW'},
            {url: '/regiony/szczecin', subTitle: 'SZCZECIN'},
            {url: '/regiony/grudziadz', subTitle: 'GRUDZIĄDZ'},
            {url: '/regiony/chojnice', subTitle: 'CHOJNICE I OKOLICE'},
            {url: '/regiony/dolnyslask', subTitle: 'GÓRY SOWIE'},
        ].sort((a, b) => a.subTitle.localeCompare(b.subTitle)),
    },
];

const navLinksDataKraje = [
    {
        url: '/kraje',
        title: 'Kraje',
        subLinks: [
            {url: '/kraje/ukraina', subTitle: 'UKRAINA'},
            {url: '/kraje/wycieczkazagraniczna', subTitle: 'NIEMCY'},
        ],
    },
];

const navLinksDataFilmyAndOther = [
    {
        url: '/filmy',
        title: 'Filmy',
    },
    {
        url: 'https://pisanieiprojekty.com/',
        title: 'Firma P&P',
        openInNewTab: true
    },
    {
        //TODO: change url
        url: 'https://patronite.pl/turystykabezfiltrow',
        title: 'Wesprzyj nas!',
        openInNewTab: true
    },
];

const navLinksDataWydarzenia = [
    {
        url: '/wydarzenia',
        title: 'Wydarzenia',
        subLinks: [
            {url: '/wydarzenia', subTitle: 'Weź udział!'},
            {url: '/wycieczki', subTitle: 'Co zrealizowaliśmy?'},
            {
                url: 'https://www.instagram.com/carfortrip_/?fbclid=IwAR0AnzB3bveYLQbilGia_XFBPek4C9zSQop5rmu-Gd8MLlX5FpKx_fnkDTQ',
                subTitle: 'Wycieczki do Gruzji',
                openInNewTab: true,
            },
        ],
    },
];

const navLinksDataONas = [
    {
        url: '/o-nas',
        title: 'O nas',
        subLinks: [
            {url: '/o-nas', sectionId: 'bez-filtrow', subTitle: 'BEZ FILTRÓW - czyli?'},
            {url: '/o-nas', sectionId: 'projekty', subTitle: 'Projekty'},
            {url: '/o-nas', sectionId: 'publikacje', subTitle: 'Publikacje'},

        ],
    },
];

export {
    navLinksDataBydgoszcz,
    navLinksDataRegiony,
    navLinksDataKraje,
    navLinksDataFilmyAndOther,
    navLinksDataWydarzenia,
    navLinksDataONas,
}