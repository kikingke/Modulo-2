const containerCards = document.querySelector("#container-cards");

let optionWord;
let num_card = 0;
let errors = 3;
let accerts = 0;
let intents = 0;
let promedio = 0;
const music = new Audio();


function getImg(name) {
    return `./assets/img/listeandchoose/${name}.png`;
}

let words = [
    { name: "I feel sick", img: getImg('isick') },
    { name: "She feels sick", img: getImg('shesick') },
    { name: "You have a cold", img: getImg('youcold') },
    { name: "He has a cold", img: getImg('hecold') }
];

optionWord = `<img src="${words[0].img}" height="80%" width="90%" alt="">`;
containerCards.innerHTML = optionWord;


imprimirOpcionesAleatorias(words[0].name);
let buttons = document.querySelectorAll('.button-sound');
buttonSelected();

changeStatusButtons();

function imprimirOpcionesAleatorias(option) {
    document.getElementById("container-option-sound").innerHTML = "";

    let words_repeat = [];
    let position_correct = Math.floor(Math.random() * 4);
    let i = 0;

    while (i < 4) {
        let num_position = Math.floor(Math.random() * words.length);

        if (!words_repeat.includes(option) || !words_repeat.includes(words[num_position].name)) {
            if (position_correct == i) {

                document.getElementById("container-option-sound").innerHTML += `
                    <div id="btn-record-pronunciation" onclick="responsiveVoice.speak('${option}', 'US English Female', {rate: 0.9})" data-text="${option}" class="cursor-pointer button-sound">
                        <img src="./assets/img/sound-icon.svg" class="w-100" alt="microphone" />
                    </div>
                `;
                words_repeat.push(option);
                i++;
            } else {
                document.getElementById("container-option-sound").innerHTML += `
                    <div id="btn-record-pronunciation" onclick="responsiveVoice.speak('${words[num_position].name}', 'US English Female', {rate: 0.9})" data-text="${words[num_position].name}" class="cursor-pointer button-sound">
                        <img src="./assets/img/sound-icon.svg" class="w-100" alt="microphone" />
                    </div>
                `;
                words_repeat.push(words[num_position].name);
                i++;
            }
        }
    }
}

function sound(name_sound) {
    music.src = `./audios/${name_sound}.mp3`;
    music.play();
}

function buttonSelected() {
    buttons = document.querySelectorAll('.button-sound');

    buttons.forEach(button => {
        button.addEventListener("click", function () {
            $('.button-sound').find('img').attr("src", "./assets/img/sound-icon.svg");
            $('.button-sound').removeClass('button-selected');

            $(this).addClass('button-selected');
            $(this).find('img').attr("src", "./assets/img/sound-icon-press.svg");
        });
    });
}

function validateOption() {
    intents++;
    if ($('.button-selected').data('text') == words[num_card].name) {
        accerts++;

        if (num_card == words.length - 1) {
            // alertExcellent();
            soundGameSuccess()
            alertExcellentWithImage('win');
            return;
        }

        // score {modulo: 'M2', lesson: 'L2'}

        $('.button-sound').css('pointer-events', 'none');
        $('#btn-ok').css('pointer-events', 'none');
        document.getElementById('next').classList.add("animate-button");

        soundCorrectAnswer();
        alertExcellent();
    } else {
        soundIncorrectAnswer();
        alertTryAgain();
    }
    scoreMatch(accerts, intents);
    setScoreStorage(module = 'M2', lesson = 'L2', { name: 'match audios', score: promedio, type: 'englishTime' });
}

function scoreMatch(accerts, intents) {
    promedio = (accerts * 100) / intents;
}

function changeWord(type) {
    if (type == "next") num_card++, errors = 3, document.getElementById('next').classList.remove("animate-button")
    else num_card--;

    $('#btn-ok').css('pointer-events', '');

    if (num_card >= 0 && num_card < words.length) {
        let word = words[num_card];
        let optionWord = `
            <img src="${word.img}" height="80%" width="90%" alt="">
                `;
        containerCards.innerHTML = optionWord;

        imprimirOpcionesAleatorias(word.name);
        buttonSelected();
    }

    changeStatusButtons();
}

function changeStatusButtons() {
    if (num_card <= 0) {
        document.querySelector("#img-prev").src = "./assets/img/button-back-gray.svg";
        document.querySelector("#prev").disabled = true;
        document.querySelector("#prev").classList.remove("boton-presionado");
    } else {
        document.querySelector("#img-prev").src = "./assets/img/button-back.svg";
        document.querySelector("#prev").disabled = false;
        document.querySelector("#prev").classList.add("boton-presionado");
    }

    if (num_card == words.length - 1) {
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
