const containerCards = document.querySelector("#container-cards");
const containerSound = document.querySelector("#btn-sound-pronunciation");

let optionWord;
let optionSound;
let num_card = 0;

let errors = 3;
let accerts = 0;
let intents = 0;

let words = [
    { name: "I _ sick.", img: "./assets/img/cards/wordbox.png", complete: "feel" },
    { name: "He _ an earache.", img: "./assets/img/cards/wordbox.png", complete: "has" },
    { name: "_ you feel bad?", img: "./assets/img/cards/wordbox.png", complete: "Do" },
    { name: "She _ take aspirin.", img: "./assets/img/cards/wordbox.png", complete: "doesn't" },
    { name: "It _ bad.", img: "./assets/img/cards/wordbox.png", complete: "feels" },
    { name: "They _ the flu.", img: "./assets/img/cards/wordbox.png", complete: "have" },
    { name: "I _ cold medicine.", img: "./assets/img/cards/wordbox.png", complete: "take" },
    { name: "_ she go to the hospital?", img: "./assets/img/cards/wordbox.png", complete: "Does" },
    { name: "He _ aspirin for his headache.", img: "./assets/img/cards/wordbox.png", complete: "takes" },
    { name: "We _ to the nurse's office.", img: "./assets/img/cards/wordbox.png", complete: "go" },
    { name: "She _ to the doctor.", img: "./assets/img/cards/wordbox.png", complete: "goes" },
    { name: "I _ don't feel good.", img: "./assets/img/cards/wordbox.png", complete: "don't" }
]

let aciertos = []

document.getElementById("img-parts-body").innerHTML = `<img src="${words[num_card].img}" class="py-2 px-2" height="300px">`;

changeStatusButtons();
printOptions()


function changeWord(type) {
    if (type == "next") num_card++, document.getElementById('next').classList.remove("animate-button")
    else num_card--;

    errors = 3;
    $(".option-listen").css('pointer-events', '');
    document.getElementById("img-parts-body").innerHTML = `<img src="${words[num_card].img}" class="py-2 px-2" height="300px">`;
    changeStatusButtons();
    printOptions()
}
function printOptions() {
    document.getElementById("container-buttons-roulette").innerHTML = "";

    let cardObject = words[num_card].name.split('_')
    let wordComplete = cardObject[0] + words[num_card].complete + cardObject[1]
    let maxlength = words[num_card].complete.length
    let input = `
    
        <input type="text" maxlength="${maxlength}" class="input-replace-input" style="width: ${70 * maxlength}px"/>
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
        (accerts, intents);
        soundIncorrectAnswer();
        errors--;
        return
    }

    accerts++

    // scoreTextReplace(accerts,intents);
    soundAddStar();
    aciertos.push(wordComplete);

    $("#container-buttons-roulette button").attr('disabled', true)



    let promedio = (accerts * 100) / intents
    setScoreStorage(module = 'M8', lesson = 'L1', { name: 'fill in', score: promedio, type: 'english time' })
    alertExcellent();
    //alertExcellentWithImage();
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
        document.querySelector("#img-next").src = "./assets/img/button-back-next.svg";
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
