function getImg(name) {
    return `./assets/img/readingcomprehension/${name}.png`
}

let words = [
    { 'name': 'all of the students have a cold', 'img': getImg('allofthestudents') },
    { 'name': 'one students has a fever', 'img': getImg('onestudents') },
    { 'name': 'she goes to the doctor with her mother', 'img': getImg('shegoes') },
    { 'name': 'she takes an aspirin', 'img': getImg('shetakes') },
    { 'name': 'some students do not feel good', 'img': getImg('somestudents') },
    { 'name': 'the teachers feel good', 'img': getImg('theteachers') },
];


let ordered_words = _.sortBy(words, "name");

let num_page = 0;
let accerts = 0;
let intents = 0;
let promedio = 0;

document.body.onload = function () {
    imprimirOpcionesAleatorias();
    insertPaginator();
    animatePage();
    addGrayScale();
}

function addGrayScale() {
    let imagenes = document.querySelectorAll(".img-card-options");
    imagenes.forEach(image => {
        // Creamos el evento mouseover para cada imagen
        image.addEventListener("mouseover", function (e) {
            image.classList.remove('escala-grises');
        });

        // Creamos el evento mouseout para cada imagen
        image.addEventListener("mouseout", function (e) {
            if (image.getAttribute('data-partbody') != "true") image.classList.add('escala-grises');
        });
    });
}

function animatePage() {
    anime({
        targets: '.option-listen',
        scale: [
            { value: .1, easing: 'easeOutSine', duration: 500 },
            { value: 1, easing: 'easeInOutQuad', duration: 1200 }
        ],
        delay: anime.stagger(200, { grid: [14, 5], from: 'center' })
    });
}

function validateOption(option_selected, event) {
    // intents++;

    responsiveVoice.speak(option_selected, 'US English Female', { rate: 0.6 });

    if (words[num_page].name == option_selected) {
        accerts++;
        nextWord()
        // scoreChooseThePicture2(accerts, intents);
        // Quitar la escala de grises de la opcion correcta
        event.target.classList.remove('escala-grises');
        event.target.dataset.partbody = true;

        if (num_page == words.length - 1) {
            soundGameSuccess();
            alertExcellentWithImage('win');
            return;
        }

        document.getElementById('next').classList.add("animate-button");

        alertExcellent();
        soundCorrectAnswer();
    } else {
        alertTryAgain()
        soundIncorrectAnswer();
    }
    if (intents <= words.length - 1) intents++, promedio = Math.round((accerts * 100) / (words.length));
    console.log(promedio);
    setScoreStorage(module = 'M2', lesson = 'L1', { name: 'multiple choice', score: promedio, type: 'englishTime' })

    // scoreChooseThePicture2(accerts, intents);
}

function imprimirOpcionesAleatorias() {
    document.querySelector('#contenedor-opciones').innerHTML = '';

    ordered_words.forEach(person => {
        document.querySelector('#contenedor-opciones').innerHTML +=
            `<div onclick="validateOption('${person.name}', event)" class="navigation-buttons-pink border-radius cursor-pointer d-flex align-items-center bg-white option-listen cross-center m-2" >
            <img src="${person.img}" data-partbody="false" class="escala-grises img-card-options" width="100%" height="100%" alt="">
        </div>`;
    });
    changeStatusButtons();
    // insertText();
}

function sound() {
    responsiveVoice.speak(words[num_page].name, 'US English Female', { rate: 0.4 });
    // Remover animación del boton de sonido
    document.getElementById('btn-sound').classList.remove("animate-button");
}

function nextWord() {
    num_page + 1 < words.length ? num_page++ : '';

    document.getElementById('next').classList.remove("animate-button");
    // Animar boton de sonido
    document.getElementById('btn-sound').classList.add("animate-button");

    insertPaginator();
    animatePage();
    changeStatusButtons();
}

function insertPaginator() {
    document.getElementById("audio-numerator").innerHTML = `<span class="text-secondary">${num_page + 1}</span>/${words.length}`;
    changeStatusButtons();
}

function prevWord() {
    num_page > 0 ? num_page-- : '';

    insertPaginator();
    animatePage();
    changeStatusButtons();
}

function changeStatusButtons() {
    if (num_page <= 0) {
        document.querySelector("#img-prev").src = "./assets/img/button-back-gray.svg";
        document.querySelector("#prev").disabled = true;
        document.querySelector("#prev").classList.remove("boton-presionado");
    } else {
        document.querySelector("#img-prev").src = "./assets/img/button-back.svg";
        document.querySelector("#prev").disabled = false;
        document.querySelector("#prev").classList.add("boton-presionado");
    }

    if (num_page == words.length - 1) {
        document.querySelector("#img-next").src = "./assets/img/button-next-gray.svg";
        document.querySelector("#next").disabled = true;
        document.querySelector("#next").classList.remove("boton-presionado");
    } else {
        document.querySelector("#img-next").src = "./assets/img/button-next.svg";
        document.querySelector("#next").disabled = false;
        document.querySelector("#next").classList.add("boton-presionado");
    }
}

function soundGameSuccess() {
    const music = new Audio('./assets/audios/game-success.mp3');
    music.play();
}

function soundCorrectAnswer() {
    const music = new Audio('./assets/audios/correct-answer.mp3');
    music.play();
}

function soundIncorrectAnswer() {
    const music = new Audio('./assets/audios/incorrect-answer.mp3');
    music.play();
}

function soundAddStar() {
    const music = new Audio('./assets/audios/points.mp3');
    music.play();
}
