const containerCards = document.querySelector("#container-cards");

let optionWord;
let num_card = 0;
let errors = 3;
let accerts = [];
let intents = 0;
const music = new Audio();


function getImg(name) {
    return `./assets/img/cards/${name}.png`
}

let words = [
    { question: "How do you feel?", name: "I feel bad.", img: getImg('apple') },
    { question: "How do you feel?", name: "I don't feel good.", img: getImg('banana') },
    { question: "How do you feel?", name: "I don't feel so great.", img: getImg('blackberry') },
    { question: "How do you feel?", name: "I feel chilly.", img: getImg('grapes') },
    { question: "What do you feel?", name: "I have an earache.", img: getImg('guava') },
    { question: "What do you feel?", name: "I have a runny nose.", img: getImg('mango') },
    { question: "What do you feel?", name: "I have a fever.", img: getImg('passion fruit') },
    { question: "What do you feel?", name: "I have a body ache.", img: getImg('pear') },
    { question: "What should I do?", name: "You should take ear drops.", img: getImg('plum') },
    { question: "What should I do?", name: "You should use nasal spray.", img: getImg('plum') },
    { question: "What should I do?", name: "You should take a bath.", img: getImg('plum') },
    { question: "What should I do?", name: "You should try to sleep.", img: getImg('plum') }
]

optionWord = `<div style="color: #016429;font-size: 4rem;">${words[0].question}</div>`;//`<img src="${words[0].img}" height="80%" width="90%" alt="">`;
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

        if (position_correct == i && !words_repeat.includes(option)) {
            document.getElementById("container-option-sound").innerHTML += `
                    <div id="btn-record-pronunciation" onclick="responsiveVoice.speak('${option}')" data-text="${option}" class="cursor-pointer button-sound">
                        <img src="./assets/img/sound-icon.svg" class="w-100" alt="microphone" />
                    </div>
                `;
            words_repeat.push(option);
            i++;
        }

        if (!words_repeat.includes(words[num_position].name)) {

            document.getElementById("container-option-sound").innerHTML += `
                <div id="btn-record-pronunciation" onclick="responsiveVoice.speak('${words[num_position].name}')" data-text="${words[num_position].name}" class="cursor-pointer button-sound">
                    <img src="./assets/img/sound-icon.svg" class="w-100" alt="microphone" />
                </div>
            `;
            words_repeat.push(words[num_position].name);
            i++;
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
            $(this).find('img').attr("src", "./assets/img/sound-icon.svg");
        });
    });
}

function validateOption() {
    intents++;
    if ($('.button-selected').data('text') == words[num_card].name && !accerts.includes($('.button-selected').data('text'))) {
        accerts.push(words[num_card].name);

        let score = (accerts.length * 100) / intents
        setScoreStorage('M1', 'L1', { name: 'match audios', score: score, type: 'englishTime' })

        if (num_card == words.length - 1) {
            soundGameSuccess()
            alertExcellentWithImage();
            return;
        }

        $('.button-sound').css('pointer-events', 'none');
        $('#btn-ok').css('pointer-events', 'none');
        document.getElementById('next').classList.add("animate-button");

        soundCorrectAnswer();
        alertExcellent();
    } else {
        soundIncorrectAnswer();
        alertTryAgain();
    }
    let score = (accerts.length * 100) / intents
    setScoreStorage('M1', 'L1', { name: 'match audios', score: score, type: 'englishTime' })
}

function changeWord(type) {
    if (type == "next") num_card++, errors = 3, document.getElementById('next').classList.remove("animate-button")
    else num_card--;

    $('#btn-ok').css('pointer-events', '');

    if (num_card >= 0 && num_card < words.length) {
        let word = words[num_card];
        let optionWord = `<div style="color: #016429;font-size: 4rem;">${word.question}</div>`; //`<img src="${word.img}" height="80%" width="90%" alt="">`;
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
