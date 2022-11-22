const containerCards = document.querySelector("#container-cards");
const containerSound = document.querySelector("#btn-sound-pronunciation");

let optionWord;
let optionSound;
let num_card = 0;
let accerts = 0;
let intents = 0;


let text = ""
var recognition = new webkitSpeechRecognition();
recognition.lang = "en-US";
recognition.continuous = false;
recognition.interimResults = false;

function getImg(name){
    return `./assets/img/guys/${name}.png` 
}


let words = [
    { 'name': 'She is a Maria', 'img': getImg('maria') },
    { 'name': 'He is a Carlos', 'img': getImg('carlos') },
    { 'name': 'He is a Jimmy', 'img': getImg('jimmy') },
    { 'name': 'She is a Sara', 'img': getImg('sara') },
    { 'name': 'He is a Pedro', 'img': getImg('pedro') },
    { 'name': 'She is a Claudia', 'img': getImg('claudia') },
];

optionWord = `<img src="${words[0].img}" height="80%" width="90%" alt="">`;
containerCards.innerHTML = optionWord;

//busca el sonido de las cartas en el array y los inserta en el html
optionSound = `
    <img src="./assets/img/sound-icon.svg" class="h-100" width="100%" onclick="responsiveVoice.speak('${words[0].name}')" alt="sound"/>
        `;
containerSound.innerHTML = optionSound;

changeStatusButtons();

//funcion para mostrar objetos randomes
function changeWord(type) { 
    if(type == "next") num_card++, document.getElementById('next').classList.remove("animate-button")
    else num_card--;
    
    if(num_card >= 0 && num_card < words.length){
        let word = words[num_card];
        let optionWord = `
            <img src="${word.img}" height="80%" width="90%" alt="">
                `;
        containerCards.innerHTML = optionWord;

        //busca el sonido de las cartas en el array y los inserta en el html
        optionSound = `
            <img src="./assets/img/sound-icon.svg" class="h-100" onclick="responsiveVoice.speak('${word.name}')" alt="sound"/>
                `;
        containerSound.innerHTML = optionSound;
    }

    changeStatusButtons(); 
}

function record() {
    text = ""
    recognition.start()
}

function stop() {
    recognition.stop()
    
    text = text.replace('.', '');
    intents++;
    if (text == words[num_card].name) {
        document.getElementById('next').classList.add("animate-button");
        accerts++;

        if(num_card == words.length-1) {
            alertExcellentWithImage('win');
            return;
        }
        
        soundCorrectAnswer();
        alertExcellent();
    } else {
        alertTryAgain();
        soundIncorrectAnswer();
    }

    // scoreLetsTalk(accerts, intents);
}


recognition.onresult = function (event) {
    const result = event.results;
    text = result[result.length - 1][0].transcript;

    stop();
}

function changeStatusButtons() {
    if(num_card <= 0) {
        document.querySelector("#img-prev").src = "./assets/img/button-back-gray.svg";
        document.querySelector("#prev").disabled = true;
        document.querySelector("#prev").classList.remove("boton-presionado");
    }else{
        document.querySelector("#img-prev").src = "./assets/img/button-back.svg";
        document.querySelector("#prev").disabled = false;
        document.querySelector("#prev").classList.add("boton-presionado");
    }
    
    if(num_card == words.length-1) {
        document.querySelector("#img-next").src = "./assets/img/button-next-gray.svg";
        document.querySelector("#next").disabled = true;
        document.querySelector("#next").classList.remove("boton-presionado");
    }else{
        document.querySelector("#img-next").src = "./assets/img/button-next.svg";
        document.querySelector("#next").disabled = false;
        document.querySelector("#next").classList.add("boton-presionado");
    }
}
