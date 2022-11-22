const containerSound = document.querySelector("#btn-sound-pronunciation");

let posicion = 0;
let number_question = 0;
let options = [];
let accerts = 0;
let intents = 0;


function getImg(name) {
    return `./assets/img/letsplay/${name}.png`
}
let words_options = [
    { img: getImg('doesshegotothehospital'), name: 'Does she go to the hospital?' },
    { img: getImg('doyoufeelbad'), name: 'Do you feel bad?' },
    { img: getImg('hehasanearache'), name: 'he has an earache' },
    { img: getImg('hetakesaspirinforhisheadache'), name: 'He takes aspirin for his headache' },
    { img: getImg('idonotfeelgod'), name: 'I do not feel good' },
    { img: getImg('theytakecoldmedicine'), name: 'They take cold medicine' },
    { img: getImg('itakecoldmedicine'), name: 'I take cold medicine' },
    { img: getImg('itfeelsbad'), name: 'It feels bad' },
    { img: getImg('shedoesnottakeaspirin'), name: 'She does not take aspirin' },
    { img: getImg('shegoestothedoctors'), name: 'She goes to the doctors' },
    { img: getImg('theyhavetheflu'), name: 'They have the flu' },
    { img: getImg('wegotothenursesoffice'), name: "We go to the nurse's office" }
];

function lanzardado() {
    $('#button-roll').removeClass("animate-button");
    const cube = document.querySelector('.cube');
    const time = 2;

    cube.style.transition = '';
    cube.style.transform = `translateY(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)`;
    let randomValue = 0;

    setTimeout(() => {
        cube.style.transition = `transform ${time}s`;
        randomValue = Math.floor((Math.random() * 6) + 1);
        // randomValue = 6;

        switch (randomValue) {
            case 1:
                cube.style.transform = `translateY(0px) rotateX(3600deg) rotateY(3600deg) rotateZ(3600deg)`;
                break;
            case 2:
                cube.style.transform = `translateY(0px) rotateX(4410deg) rotateY(3600deg) rotateZ(3600deg)`;
                break;
            case 3:
                cube.style.transform = `translateY(0px) rotateX(3600deg) rotateY(4410deg) rotateZ(3600deg)`;
                break;
            case 4:
                cube.style.transform = `translateY(0px) rotateX(3600deg) rotateY(2430deg) rotateZ(3600deg)`;
                break;
            case 5:
                cube.style.transform = `translateY(0px) rotateX(2430deg) rotateY(3600deg) rotateZ(3600deg)`;
                break;
            case 6:
                cube.style.transform = `translateY(0px) rotateX(3600deg) rotateY(1980deg) rotateZ(3600deg)`;
                break;
        };

        setTimeout(() => {
            document.getElementById("num_dado").innerHTML = "Result: " + randomValue;

            if (posicion + randomValue <= 70) {
                posicion += randomValue;

                imprimirPin();
            } else {
                posicion += randomValue;

                let devolver_posiciones = posicion - 70;
                posicion -= devolver_posiciones * 2;

                imprimirPin();
            }
        }, 1000);
    }, time * 10);

    showQuestion();
}

function imprimirPin() {
    let elem = document.querySelector(".number-" + posicion);
    // Asignando las coordenadas, no olvides "px"!
    let coords = elem.getBoundingClientRect();

    document.getElementById("contenedor-pin").style.cssText = `
                                        visibility: visible;
                                        top: ${coords.top - 6}px;
                                        left: ${coords.left - 7}px;
                                        right: ${coords.right}px;
                                        bottom: ${coords.bottom}px`;
}

function showQuestion() {
    let words_repeat = [];
    let position_correct = Math.floor(Math.random() * 3);
    let i = 0;

    while (i < 4) {
        let num_position = Math.floor(Math.random() * words_options.length);

        if (position_correct == i && !words_repeat.includes(words_options[number_question].name)) {
            if (words_options[number_question].name !== undefined) {
                options[i] = words_options[number_question].name;
                words_repeat.push(words_options[number_question].name);
            }
            i++;
        }

        if (!words_repeat.includes(words_options[num_position].name)) {
            if (words_options[num_position].name !== undefined) {
                options[i] = words_options[num_position].name;
                words_repeat.push(words_options[num_position].name);
            }
            i++;
        }

    }

    setTimeout(() => {
        Swal.fire({
            html:
                `<div class="row w-100 m-0 cross-center" style="height: 450px;">
                    <div class="col-6 cross-center flex-column">
                        <img class="cursor-pointer w-50 mb-3" onclick="responsiveVoice.speak('${words_options[number_question].name}')" src="./assets/img/sound-icon.svg" alt="sound img">
                        <div>
                            <a href="#" class="btn btn-outline-primary d-block mb-2 border-radius" onmouseover="playSpeak('${options[0]}')" onclick="playSpeak('${options[0]}')"> ${options[0]}</a>
                            <a href="#" class="btn btn-outline-primary d-block mb-2 border-radius" onmouseover="playSpeak('${options[1]}')" onclick="playSpeak('${options[1]}')"> ${options[1]}</a>
                            <a href="#" class="btn btn-outline-primary d-block mb-2 border-radius" onmouseover="playSpeak('${options[2]}')" onclick="playSpeak('${options[2]}')"> ${options[2]}</a>
                        </div>
                    </div>
                    <div class="col-6 cross-center">
                        <img src="${words_options[number_question].img}" width="100%" height="100%" alt="img options">
                    </div>
                    <button class="fs-5 px-4 bg-warning cursor-pointer w-25 button-roll" onclick="validOptions(event)">ok</button>
                    
                </div>`,
            showConfirmButton: false,
            allowOutsideClick: false,
        });
        number_question++;
    }, 2000);
}

const playSpeak = (option) => {
    localStorage.setItem('optionSelected', option)
    responsiveVoice.speak(option, 'US English Female', { rate: 0.7 });
}

function validOptions(event, optionSelected = localStorage.getItem('optionSelected')) {
    $('.option-alert').removeClass('button-selected');
    $(event.target).addClass('button-selected');

    intents++

    if (optionSelected == words_options[number_question - 1].name) {
        accerts++
        alertExcellent();
        soundCorrectAnswer();
    } else {
        alertTryAgain();
        soundIncorrectAnswer();
    }

    if (number_question == words_options.length) {
        $('#button-roll').addClass('disabled-button');
        setScoreStorage(module = 'M6', lesson = 'L3', { name: 'board ladder', score: (accerts * 100) / intents, type: 'assessment' });
        alertExcellentWithImage({ modulo: 'M1', lesson: 'L1' });
        return;
    }

    $('#button-roll').addClass("animate-button");
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
