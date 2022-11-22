const containerCards = document.querySelector("#container-cards");
const containerSound = document.querySelector("#btn-flip");

let optionWord;
let optionSound;
let num_card = 0;
let accerts = 0;
let intents = 9;


document.body.onload = function () {
    insertPaginator();
}

let getImg = (nameImg) => {
    return `./assets/img/cards/${nameImg}.png`
}

let words = [
    {
        answer: 'ifeelbetter', sound: 'Hoy do  you feel?',
        answers: [
            { img: getImg('ifeelbetter'), val: 'ifeelbetter' },
            { img: getImg('youshouldrinkhothoney'), val: 'youshouldrinkhothoney' },
            { img: getImg('ihaveafever'), val: 'ihaveafever', },
            { img: getImg('itakeabath'), val: 'itakeabath' }
        ]
    },
    {
        answer: 'ihaveaheadache', sound: 'What do you feel?',
        answers: [
            { img: getImg('ifeelsick'), val: 'ifeelsick' },
            { img: getImg('ihaveaheadache'), val: 'ihaveaheadache', },
            { img: getImg('youshouldtakecoldmedicine'), val: 'youshouldtakecoldmedicine' },
            { img: getImg('ifeelhot'), val: 'ifeelhot' }
        ]
    },
    {
        answer: 'youshouldtakeanaspirin', sound: 'What should I do?',
        answers: [
            { img: getImg('ihaveasorethroat'), val: 'ihaveasorethroat', },
            { img: getImg('ifeelbetter'), val: 'ifeelbetter' },
            { img: getImg('youshouldtakeanaspirin'), val: 'youshouldtakeanaspirin' },
            { img: getImg('ifeelcold'), val: 'ifeelcold', }
        ]
    }
]

changeWord()

function changeWord(type = null) {
    if (type == 'next') num_card++
    if (type == 'prev') num_card--

    let word = words[num_card]

    optionSound = `
   
    <div class= "d-in">
        <div class="txtQuestion">${word.sound} -  <div class="d-in fw-bold fs-4 btn-numerator" id="audio-numerator"></div></div>
        <!--<img class="cursor-pointer" onclick="responsiveVoice.speak('${word.sound}', 'US English Female', {rate: 0.75})" src="./assets/img/sound-icon.svg" alt="sound" width="50px"/>-->
       
    </div>
    
    
    `;

    containerSound.innerHTML = optionSound;

    let html = ''
    word.answers.forEach(answer => {
        html += `
            <div class="bg-white border-radius cross-center p-4 me-3 cursor-pointer mt-2 borde imgCard" style="width: 400px; height:160px;" onclick="validateOption('${answer.val}' )" >
                <img src="${answer.img}"  width="100%">
            </div>
        `
    });

    containerCards.innerHTML = html;
    changeStatusButtons();
}


function validateOption(option) {

    if (words[num_card].answer != option) {
        soundIncorrectAnswer();
        alertTryAgain();
        intents++;
        return
    }

    soundCorrectAnswer();

    accerts++;
    // num_card != words.length-1 && alertExcellent()
    alertExcellent()
    document.getElementById('next').classList.add("animate-button");
    if (num_card == words.length - 1) {
        soundGameSuccess();
        alertExcellentWithImage('win');
    }
    score(accerts, intents);
    setScoreStorage(module = 'M2', lesson = 'L2', { name: 'multiple choice', score: promedio, type: 'englishTime' })
    // scoreChooseTheSize(accerts, intents);
}

function score(accerts, intents) {
    promedio = (accerts * 100) / intents;
}

function nextWord() {
    num_card < words.length - 1 && changeWord('next')
    document.getElementById('next').classList.remove("animate-button")
    insertPaginator();
}

function prevWord() {
    num_card > 0 && changeWord('prev')
    num_card > 0 ? num_card-- : '';
    insertPaginator();
}

function insertPaginator() {
    document.getElementById("audio-numerator").innerHTML = `<span class="text-secondary">${num_card + 1}</span>/${words.length}`
    changeStatusButtons();
}


function changeStatusButtons() {
    if (num_card <= 0) {
        document.querySelector("#img-prev").src = "./assets/img/button-back-gray.svg";
        document.querySelector("#prev").disabled = true;
    } else {
        document.querySelector("#img-prev").src = "./assets/img/button-back.svg";
        document.querySelector("#prev").disabled = false;
    }

    if (num_card == words.length - 1) {
        document.querySelector("#img-next").src = "./assets/img/button-next-gray.svg";
        document.querySelector("#next").disabled = true;
    } else {
        document.querySelector("#img-next").src = "./assets/img/button-next.svg";
        document.querySelector("#next").disabled = false;
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
