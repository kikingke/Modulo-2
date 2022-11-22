let words_options = [
    [
        { question: 'How do you feel?', name: 'trees', greeting: 'I feel terrible.' },
        { question: 'What do you feel?', name: 'monkeys', greeting: 'I have a cold.' },
        { question: 'What should I do?', name: 'parrots', greeting: 'You should take cold medicine.' }
    ],
    [
        { question: 'How do you feel?', name: 'trees', greeting: 'I don’t feel good.' },
        { question: 'What do you feel?', name: 'monkeys', greeting: 'I have a sore throat.' },
        { question: 'What should I do?', name: 'parrots', greeting: 'You should take some tea.' }
    ],
    [
        { question: 'How do you feel?', name: 'trees', greeting: 'I feel chilly and tired.' },
        { question: 'What do you feel?', name: 'monkeys', greeting: 'I have a fever and a body ache' },
        { question: 'What should I do?', name: 'parrots', greeting: 'You should go to the doctors.' }
    ]

]

let accerts = [];
let intents = 0;

let numPages = null
let currentPage = null


window.onload = () => {
    numPages = words_options.length;
    currentPage = 0;

    showSection()
}


/*function getImg(name) {
    return `./assets/img/match/${name}.png`
}*/

function showSection() {
    let correctOptions = words_options[currentPage]
    let randomOptions = getRandomArray(correctOptions)

    let contentOptions = document.getElementById("contenedor-drag")

    contentOptions.classList.add(`row-cols-${correctOptions.length}`)
    contentOptions.innerHTML = ''

    correctOptions.forEach((option, key) => {

        contentOptions.innerHTML += `
            <div class="h-100">
                <div class="card cursor-pointer" >
                    <img src="./assets/img/sound-icon.svg" class="btn-sound cursor-pointer mt-2" onclick="responsiveVoice.speak('${option.question}')" alt="">
                    <div class="cross-center h-100">
                        <!--<img src="${option.question}" height="90%" alt="">-->
                        <div class="d-flex justify-content-center text-purple align-items-center h-100">
                            ${option.question}
                        </div>
                    </div>
                </div>

                <div class="bg-transparent my-4 w-100 droppable" id="${option.name}-drop">
                
                </div>

                <div class="card cursor-pointer" id="${randomOptions[key].name}" data-partbody="${randomOptions[key].name}" data-speak="${randomOptions[key].greeting}">
                    <img src="./assets/img/sound-icon.svg" class="btn-sound mt-2" height="30px" alt="">
                    <div class="d-flex justify-content-center text-purple align-items-center h-100">
                        ${randomOptions[key].greeting}
                    </div>
                </div>
                
            </div>
        `
    })

    isPaginate()
    addDraggableElements(randomOptions)
}

function addDraggableElements(options) {
    let numOptions = 0

    options.forEach(drag => {
        let overlapThreshold = "80%";

        let elementDrag = document.getElementById(drag.name)
        let elementDrop = document.getElementById(`${drag.name}-drop`)

        if (elementDrag) {
            Draggable.create(elementDrag, {
                bounds: "div",
                type: "x,y",
                cursor: "pointer",
                activeCursor: "grab", activeCursor: "grabbing",
                onClick: function (e) {
                    responsiveVoice.speak(`${$(this.target).data('speak')}`);
                },
                onDragStart: function (e) {
                    responsiveVoice.speak(`${$(this.target).data('speak')}`);
                },
                onDrag: function (e) {
                    if (this.hitTest(elementDrop, overlapThreshold)) $(this.target).attr("id", "correct");
                    else $(this.target).removeAttr("id", "correct");
                },
                onDragEnd: function (e) {
                    // valida si el elemento tiene el id correct si no lo tiene lo devuelve a su posicion inicial 
                    intents++;
                    if (!$(this.target).attr("id")) {
                        // move to original pos
                        TweenLite.to(this.target, 0.2, {
                            x: 0,
                            y: 0
                        });
                        soundIncorrectAnswer();
                    } else {
                        let partbody = `item${currentPage}${$(this.target).data('partbody')}`


                        if (accerts.includes(partbody)) return

                        numOptions++
                        let isLastOption = words_options[currentPage].length == numOptions
                        let isLastPage = words_options.length - 1 == currentPage

                        accerts.push(partbody);

                        if (isLastPage && isLastOption) {
                            soundGameSuccess()
                            alertExcellentWithImage()

                        } else if (!isLastPage && isLastOption) {
                            alertExcellent()
                            soundCorrectAnswer()

                        } else if (!isLastOption) {
                            soundCorrectAnswer();

                        }

                        this.kill();
                    }

                    let score = (accerts.length * 100) / intents
                    setScoreStorage('M2', 'L1', { name: 'match images', score: score, type: 'presentation' })

                }
            });
        }
    });
}


function isPaginate() {
    if (words_options.length > 1) return

    document.getElementById('btn-back').classList.add('d-none')
    document.getElementById('btn-next').classList.add('d-none')
}

function next() {
    currentPage < words_options.length - 1 && currentPage++
    showSection()
    changeStatusButtons()
}
function back() {
    currentPage > 0 && currentPage--
    showSection()
    changeStatusButtons()
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

function getRandomArray(data) {
    return data
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
}

function changeStatusButtons() {
    if (currentPage <= 0) {
        document.querySelector("#img-prev").src = "./assets/img/button-back-gray.svg";
        document.querySelector("#btn-back").disabled = true;
    } else {
        document.querySelector("#img-prev").src = "./assets/img/button-back.svg";
        document.querySelector("#btn-back").disabled = false;
    }

    if (currentPage == words_options.length - 1) {
        document.querySelector("#img-next").src = "./assets/img/button-next-gray.svg";
        document.querySelector("#btn-next").disabled = true;
    } else {
        document.querySelector("#img-next").src = "./assets/img/button-next.svg";
        document.querySelector("#btn-next").disabled = false;
    }
}