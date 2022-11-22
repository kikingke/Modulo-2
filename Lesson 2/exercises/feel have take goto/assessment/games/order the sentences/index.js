function getImg(name) { return `./assets/img/match/${name}.png` }


const contentDrag = document.getElementById("contenedor-drag")
const words_options = [
    {
        voice: "Do you feel okay?, Do they have the flu?, Does she go to the hospital?, He has an earache,She has a stomachache, We go to the nurse's office, They take cold medicine",
        options: [
            { img: getImg('doyoufeelok'), name: 'doyoufeelok', greeting: 'Do you feel okay?' },
            { img: getImg('dotheyhavetheflu'), name: 'dotheyhavetheflu', greeting: 'Do they have the flu?' },
            { img: getImg('doesshegotothehospital'), name: 'doesshegotothehospital', greeting: 'Does she go to the hospital?' },
            { img: getImg('hehasanearache'), name: 'hehasanearache', greeting: 'He has an earache' },
            { img: getImg('shehasastomachache'), name: 'shehasastomachache', greeting: 'She has a stomachache' },
            { img: getImg("wegotothenursesoffice"), name: 'wegotothenursesoffice', greeting: "We go to the nurse's office" },
            { img: getImg('theytakecoldmedicine'), name: 'theytakecoldmedicine', greeting: 'They take cold medicine' }
        ]
    },
]

let currentSlide = 0
let accerts = []
let intents = 0
let currentWordOption = () => words_options[currentSlide]
let countAllOptions = () => {
    let count = 0
    words_options.forEach(word => count += word.options.length)
    return count
}
let isLastSlide = () => { return accerts.length == countAllOptions() }



document.addEventListener('DOMContentLoaded', () => {
    showSection()
})


function showSection() {
    changeStatusButtons()
    let randomOptions = getRandomArray(currentWordOption().options)

    contentDrag.style.gridTemplateColumns = `repeat(${randomOptions.length}, 1fr)`
    let contenedorDragHtml = ''

    currentWordOption().options.forEach((option, key) => {
        contenedorDragHtml += `
            <div class="mt-3">
                <div class="card draggable mb-3" id="${randomOptions[key].name}" data-partbody="${randomOptions[key].name}">
                    <img src="${randomOptions[key].img}" class="w-100"/>
                </div>
                <div class="card droppable" id="${option.name}-drop">
                    
                </div>
            </div>
        `
    });
    contentDrag.innerHTML = contenedorDragHtml
    addDraggableElements(randomOptions)
}


function addDraggableElements(options) {


    options.forEach(drag => {
        let overlapThreshold = "80%";

        let elementDrag = document.getElementById(drag.name)
        let elementDrop = document.getElementById(`${drag.name}-drop`)

        Draggable.create(elementDrag, {
            bounds: "div",
            type: "x,y",
            cursor: "pointer",
            activeCursor: "grab", activeCursor: "grabbing",
            onClick: function (e) {
                responsiveVoice.speak(drag.greeting);
            },
            onDragStart: function (e) {
                responsiveVoice.speak(drag.greeting);
            },
            onPress: function (e) {
                // if(intents == 0) this.kill(), soundIncorrectAnswer(), alertTryAgain();
            },
            onDrag: function (e) {
                if (this.hitTest(elementDrop, overlapThreshold)) $(this.target).attr("id", "correct");
                else $(this.target).removeAttr("id", "correct");
            },
            onDragEnd: function (e) {
                let isCorrect = $(this.target).attr("id")
                let partbody = $(this.target).data('partbody')

                if (accerts.includes(partbody)) return /* Ya se dio esta respuesta */

                intents++
                if (!isCorrect) {
                    TweenLite.to(this.target, 0.2, {
                        x: 0,
                        y: 0
                    })
                    soundIncorrectAnswer();
                    return
                }

                accerts.push(partbody)
                this.kill()

                if (isLastSlide()) soundGameSuccess(), alertExcellentWithImage()
                else soundCorrectAnswer()

                let score = (accerts.length * 100) / intents
                setScoreStorage('M1', 'L1', { name: 'order the pictures', score: score, type: 'selftCheck' })
            }
        });

    })
}



function changeWord(type) {
    switch (type) {
        case 'next': currentSlide < words_options.length - 1 && currentSlide++; break
        case 'prev': currentSlide > 0 && currentSlide--; break
    }
    showSection()
}

function playVoice() { responsiveVoice.speak(currentWordOption().voice) }

function changeStatusButtons() {
    if (words_options.length - 1 == 0) {
        document.querySelector("#btn-prev").classList.add("d-none");
        document.querySelector("#btn-next").classList.add("d-none");
    }

    if (currentSlide <= 0) {
        document.querySelector("#img-prev").src =
            "./assets/img/button-back-gray.svg";
        document.querySelector("#btn-prev").disabled = true;
    } else {
        document.querySelector("#img-prev").src = "./assets/img/button-back.svg";
        document.querySelector("#btn-prev").disabled = false;
    }

    if (currentSlide == words_options.length - 1) {
        document.querySelector("#img-next").src =
            "./assets/img/button-next-gray.svg";
        document.querySelector("#btn-next").disabled = true;
    } else {
        document.querySelector("#img-next").src = "./assets/img/button-next.svg";
        document.querySelector("#btn-next").disabled = false;
    }
}

function soundGameSuccess() {
    const music = new Audio("./assets/audios/game-success.mp3");
    music.play();
}

function soundCorrectAnswer() {
    const music = new Audio("./assets/audios/correct-answer.mp3");
    music.play();
}

function soundIncorrectAnswer() {
    const music = new Audio("./assets/audios/incorrect-answer.mp3");
    music.play();
}



function getRandomArray(data) {
    return data
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
}