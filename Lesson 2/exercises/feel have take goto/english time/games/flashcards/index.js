const containerCards = document.querySelector("#container-cards");
const containerSound = document.querySelector("#container-sound");
let optionWord;
let optionSound;
let num_card = 0;

let words = [
    { img: 'ifeel', name: 'I feel' },
    { img: 'youhave', name: 'You have a cold' },
    { img: 'shefeels', name: 'She feels sick' },
    { img: 'hehas', name: 'He has a cold' },
    { img: 'wetake', name: 'We take cold medicine' },
    { img: 'shetakes', name: 'She takes cold medicine' },
    { img: 'theygo', name: 'They go to the doctors' },
    { img: 'hegoes', name: 'He goes to the doctors' },
];

printCards(words[0])
changeStatusButtons();

let promedio = 0

//funcion para mostrar objetos randomes
function changeWord(type) {
    if (type == "next") {
        num_card++;

    } else {
        num_card--;
    }

    promedio = ((num_card + 1) * 100) / words.length
    setScoreStorage(module = 'M1', lesson = 'L1', { name: 'flashcard', score: promedio, type: 'presentation' })

    if (num_card >= 0 && num_card < words.length) {
        let word = words[num_card];
        printCards(word)
    }

    changeStatusButtons();
}

function printCards(word) {
    optionWord = `
        <div class="front">
            <img src="./assets/img/cards/${word.img}.png" alt="" width="100%" />
        </div>
        <div class="back">
            ${word.name}
        </div>
            `;
    containerCards.innerHTML = optionWord;

    //busca el sonido de las cartas en el array y los inserta en el html
    optionSound = `
            <img onclick="responsiveVoice.speak('${word.name}', 'US English Female', {rate: 0.7})"
                src="./assets/img/sound-icon.svg" alt="sound" width="100%" />
            `;
    containerSound.innerHTML = optionSound;
}

//funcion para rotar la carta y volverla a su estado original
function transform() {
    document.querySelector(".cards").classList.toggle("flip");

    const music = new Audio('./assets/audio/flip.wav');
    music.play();
}

document.querySelector("#btn-flip").onclick = function () {
    transform();
};

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
