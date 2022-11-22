const containerCards = document.querySelector("#container-cards");
const containerSound = document.querySelector("#btn-sound-pronunciation");

let optionWord;
let optionSound;
let num_card = 0;

let errors = 3;
let accerts = 0;
let intents = 0;

function getImg(name) {
    return `./assets/img/cards/${name}.png`
}

let words = getRandomArray([
    { img: getImg('chilly'), complete: "how do you feel?", name: '_ I feel chilly.' },
    { img: getImg('medicine'), complete: "what should i do?", name: '_ You should take cold medicine.' },
    { img: getImg('runnynose'), complete: "what do you feel?", name: '_ I have a runny nose.' }
])

let aciertos = []

document.getElementById("img-parts-body").innerHTML = `<img src="${words[num_card].img}" class="py-2 px-2" height="200px">`;

changeStatusButtons();
printOptions()


function changeWord(type) {
    if (type == "next") num_card++, document.getElementById('next').classList.remove("animate-button")
    else num_card--;

    errors = 3;
    $(".option-listen").css('pointer-events', '');
    document.getElementById("img-parts-body").innerHTML = `<img src="${words[num_card].img}" class="py-2 px-2" height="200px">`;
    changeStatusButtons();
    printOptions()
}
function printOptions() {
    document.getElementById("container-buttons-roulette").innerHTML = "";

    let cardObject = words[num_card].name.split('_')
    let wordComplete = cardObject[0] + words[num_card].complete + cardObject[1]
    let maxlength = words[num_card].complete.length
    let input = `
    
        <input type="text" maxlength="${maxlength}" class="input-replace-input" style="width: ${15 * maxlength}px"/>
    `

    document.getElementById("container-buttons-roulette").innerHTML += `
        <div id="option-listen" class="text-replace-content-answer" >
            <span>${cardObject[0]}</span>
            ${input}
            <span>${cardObject[1]}</span>
        </div>

        <button class="btn btn-lg bg-dark text-white my-4" onclick="validarOpcionSeleccionada('${words[num_card].complete}', '${wordComplete}')">
            Submit
        </button>
    `;

}

function validarOpcionSeleccionada(option, wordComplete) {
    intents++;

    let input = $('#option-listen input')

    if (input.val().toLowerCase() !== option) {
        soundIncorrectAnswer();
        alertTryAgain();
        errors--;
        return
    } else {
        soundCorrectAnswer();
        alertExcellent();
        aciertos.push(wordComplete);
    }
    accerts++
    let score = (aciertos.length * 100) / intents
    setScoreStorage(module = 'M1', lesson = 'L1', { name: 'fill in', score: score, type: 'selftCheck' })

    $("#container-buttons-roulette button").attr('disabled', true)
    num_card == words.length - 1 && alertExcellentWithImage("win");
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
    alertExcellent();
    const music = new Audio('./assets/audios/correct-answer.mp3');
    music.play();
}

function soundIncorrectAnswer() {
    alertTryAgain();
    const music = new Audio('./assets/audios/incorrect-answer.mp3');
    music.play();
}

function soundAddStar() {
    const music = new Audio('./assets/audios/points.mp3');
    music.play();
}

