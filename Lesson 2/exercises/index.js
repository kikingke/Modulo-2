let url = window.location.href.replace(/%20/g, ' ').split('/')
let titlePage = url[url.length - 3].toUpperCase()
let currentSection = url[url.length - 2].toUpperCase()
let swiperMenu = []

let configActivity = {
    filesBase: [
        { type: 'style', url: '../../assets/css/libraries/bootstrap.min.css' },
        {
            type: 'style',
            url: '../../assets/css/libraries/swiper-bundle.min.css',
        },
        { type: 'style', url: '../../assets/css/index.css' },
        { type: 'script', url: '../../assets/libs/jquery.min.js' },
        { type: 'script', url: '../../assets/libs/swiper-bundle.min.js' },
    ],
    'FEEL HAVE TAKE GOTO': {
        // el unico que tiene los juegos adaptados
        'ENGLISH TIME': {
            'PRESENTATION': [{ title: 'GRAMMAR', img: './img/card-img-1.png', bg: '#009BDC', game: 'grammar', },
            { title: 'FLASHCARDS', img: './img/card-img-2.png', bg: '#dc3545', game: 'flashcards', },
            ],
            'ENGLISH TIME': [
                {
                    title: 'READING COMPREHENSION',
                    img: './img/card-img-3.png',
                    bg: '#01C851',
                    game: 'reading comprehension',
                },
                {
                    title: 'LISTEN AND CHOOSE',
                    img: './img/card-img-4.png',
                    bg: '#B751F7',
                    game: 'listen and choose',
                },
                {
                    title: 'LETS REVIEW',
                    img: './img/card-img-5.png',
                    bg: '#B751F7',
                    game: 'lets review',
                }
            ],
        },
        //
        'ASSESSMENT': {
            'SELF CHECK': [
                {
                    title: 'MEMORY GAME',
                    img: './img/card-img-1.png',
                    bg: '#009bdc',
                    game: 'memory game',
                },
                {
                    title: 'FILL IN',
                    img: './img/card-img-2.png',
                    bg: '#df3629',
                    game: 'fill in',
                },
            ],
            'ASSESMENT': [
                {
                    title: 'ORDER THE SENTENCES',
                    img: './img/card-img-3.png',
                    bg: '#B751F7',
                    game: 'order the sentences',
                },
                {
                    title: 'LET’S PLAY',
                    img: './img/card-img-4.png',
                    bg: '#DF3629',
                    game: 'lets play',
                },
            ],
        },
    },
    'ENGLISH IN PRACTICE': {
        'ENGLISH TIME': {
            'PRESENTATION': [
                {
                    title: 'GRAMMAR',
                    img: './img/card-img-1.png',
                    bg: '#009bdc',
                    game: 'grammar',
                },
                {
                    title: 'VIDEO COMPREHENSION',
                    img: './img/card-img-2.png',
                    bg: '#DF3629',
                    game: 'video comprehension',
                },
            ],
            'ENGLISH TIME': [
                {
                    title: 'DRAG AND DROP',
                    img: './img/card-img-3.png',
                    bg: '#B751F7',
                    game: 'drag and drop',
                },
                {
                    title: 'MATCH',
                    img: './img/card-img-4.png',
                    bg: '#01c851',
                    game: 'match',
                },
                {
                    title: 'DRAG AND DROP THE QUESTION',
                    img: './img/card-img-5.png',
                    bg: '#fe4b90',
                    game: 'drag question',
                }
            ],
        },
        'ASSESSMENT': {
            'SELF CHECK': [
                {
                    title: 'MULTIPLE CHOICE',
                    img: './img/card-img-1.png',
                    bg: '#009bdc',
                    game: 'multiple choice',
                },
                {
                    title: 'ORDER THE CONVERSATION',
                    img: './img/card-img-2.png',
                    bg: '#DF3629',
                    game: 'order',
                },
            ],
            'ASSESMENT': [
                {
                    title: "LET'S TALK",
                    img: './img/card-img-3.png',
                    bg: '#b751f7',
                    game: 'lets talk',
                },
                {
                    title: "CHOOSE THE CORRECT OPTION",
                    img: './img/card-img-4.png',
                    bg: '#009BDC',
                    game: 'listen and choose',
                },
            ],
        },
    },
}

getFilesImport(configActivity['filesBase'])
setConfigActivity()

function setConfigActivity() {
    // document.getElementById('title').innerHTML = titlePage
    let currentActivities = configActivity[titlePage][currentSection]
    let htmlContentHead = `
        <div class="mb-4 pt-3 d-flex justify-content-between" id="container-ports">
            <a href="../../../index.html" onclick="setDirection()" class="btn-action-circle">
                <img src="../../assets/img/icon-home.svg" width="100%" alt="">
            </a>
            <h1 class="title-activity" id="title"> ${titlePage}... </h1>
            <a href="#" class="btn-action-circle">
                <img src="../../assets/img/icon-slide-next.svg" width="100%" alt="">
            </a>
        </div>
    `
    let htmlContentSections = `
        <div class="container">
            <div class="row">
    `

    Object.keys(currentActivities).forEach((nameSection) => {
        htmlContentSections += `
            <div class="col-12 col-lg-6 custom-scrollbar">
                <h3 class="subtitle-activity">${nameSection}</h3>
        `
        currentActivities[nameSection].forEach((activity) => {
            swiperMenu.push(activity)

            htmlContentSections += `
                <a href="#" class="content-cards" onclick="selectActivity('${activity.game}')">
                    <img src="${activity.img}">
                    <div class="content-cards--description">${activity.title}</div>
                </a>
            `
        })

        htmlContentSections += `
            </div>
        `
    })

    htmlContentSections += `
        </div>
    </div>
    `
    document.getElementById('content-head').innerHTML = htmlContentHead
    document.getElementById('content-sections').innerHTML = htmlContentSections
}

function getFilesImport(files) {
    files.forEach((file) => {
        file.type == 'style' && setFileStyle(file.url)
        file.type == 'script' && setFileScript(file.url)
    })
}

function setFileStyle(url) {
    document.querySelector(
        'head'
    ).innerHTML += ` <link rel="stylesheet" href="${url}"> `
}

function setFileScript(url) {
    var s = document.createElement('script')
    s.src = url
    document.querySelector('head').appendChild(s)
}

function setDirection() {
    window.parent.postMessage({ message: 'Hello world' }, '*')
}

function selectActivity(activity) {
    let titleActivity = activity.toUpperCase()
    let htmlActivityHead = ``
    let htmlActivity = `<iframe name="iframe-activity" title="${titleActivity}" src="./games/${activity}/index.html"> </iframe> `

    htmlActivityHead += `
        <div class="mb-4 pt-3 d-flex justify-content-between" id="container-ports">
            <a href="index.html" class="btn-action-circle">
                <img src="../../assets/img/icon-home.svg" width="100%" alt="">
            </a>
            <a class="swiper-prev btn-action-circle">
                <img src="../../assets/img/icon-slide-back.svg" width="100%" alt="">
            </a>
            <div class="swiper swiper-flashcards">
                <div class="swiper-wrapper">
    `

    swiperMenu.forEach((item) => {
        let isStyle =
            titleActivity == item.game.toUpperCase() &&
            `background: ${item.bg}; color: white`
        //console.log(isStyle)
        htmlActivityHead += `
            <div class="swiper-slide botones-superiores" onclick="selectActivity('${item.game}')" style="${isStyle}">
                ${item.title}
            </div>
        `
    })

    htmlActivityHead += `
                </div>
            </div>
            <a class="swiper-next btn-action-circle">
            <img src="../../assets/img/icon-slide-next.svg" width="100%" alt="">
        </a>
    </div>
    `

    document.getElementById('content-head').innerHTML = htmlActivityHead
    document.getElementById('content-sections').innerHTML = htmlActivity

    if (document.querySelector('.swiper-flashcards')) {
        new Swiper('.swiper-flashcards', {
            slidesPerView: 1,
            spaceBetween: 10,
            navigation: {
                nextEl: '.swiper-next',
                prevEl: '.swiper-prev',
            },
            breakpoints: {
                640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 15,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 10,
                },
            },
        })
    }
}

function getQueryVariable(variable) {
    let url = window.location.href.replace(/%20/g, ' ').split('/')

    try {
        let groupVars = url[url.length - 1].split('?')[1]
        let vars = groupVars.split('&')

        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split('=')
            if (pair[0] == variable) {
                return pair[1]
            }
        }
        return false
    } catch (err) {
        return false
    }
}
