
let words_options = getRandomArray([
    { img: 'ifeelsick', name: 'I feel sick.' },
    { img: 'doyouhaveacold', name: 'Do you have a cold?' },
    { img: 'wetakecoldmedicine', name: 'We take cold medicine.' },
    { img: 'theydonotgotothedoctors', name: 'They do not go to the doctors.' },
    { img: 'shedoesnotfeelsick', name: 'She does not feel sick.' },
    { img: 'hehasacold', name: 'He has a cold.' },
    { img: 'shetakescoldmedicine', name: 'She takes cold medicine.' },
    { img: 'doeshegotothedoctors', name: 'Does he go to the doctors?' }
])
function getRandomArray(data) {
    return data
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
}
let options_sort = _.orderBy(words_options, 'img');
let num_pages = [];
let num_page = 0;
let accerts = [];
let intents = 0;


let getImg = (nameImg) => {
    return `./assets/img/letsreview/${nameImg}.png`
}


document.body.onload = function () {
    imprimirOpcionesAleatorias();
}

function imprimirOpcionesAleatorias() {
    document.getElementById("container-drop").innerHTML = `
            <div class="cursor-pointer col-2 h-100 cross-center" onclick="responsiveVoice.speak('${words_options[num_page].name}', 'US English Female', {rate: 0.7})">
                <img class="" src="./assets/img/sound-icon.svg" alt="" style="height: 100%">
            </div>
            <div id="${words_options[num_page].name}-drop" class="h-100 bg-white col-4 cross-center border-radius droppable">
                
            </div>

            <div class="cursor-pointer col-2 h-100 cross-center" onclick="responsiveVoice.speak('${words_options[num_page + 1].name}', 'US English Female', {rate: 0.7})">
                <img class="" src="./assets/img/sound-icon.svg" alt="" style="height: 100%">
            </div>
            <div id="${words_options[num_page + 1].name}-drop" class="h-100 bg-white col-4 cross-center border-radius droppable">
                
            </div>`;

    document.getElementById("container-drag").innerHTML = '';

    options_sort.forEach(element => {
        document.getElementById("container-drag").innerHTML += `   
        <div id="${element.name}" data-draggable="${element.name}" class="cursor-pointer draggable option-listen">
            <img class="img-size ms-3" src="${getImg(element.img)}" alt="">
        </div>`;

        addDraggableElements();
    });


    changeStatusButtons();
}

function addDraggableElements() {

    words_options.forEach((drag) => {

        let overlapThreshold = "80%";

        let elementDrag = document.getElementById(drag.name);
        let elementDrop;

        if (document.getElementById(`${drag.name}-drop`) !== null) elementDrop = document.getElementById(`${drag.name}-drop`);
        else elementDrop = document.getElementById(`${words_options[num_page].name}-drop`);

        Draggable.create(elementDrag, {
            bounds: "div",
            type: "x,y",
            cursor: "pointer",
            activeCursor: "grab",
            activeCursor: "grabbing",
            onClick: function (e) {
                responsiveVoice.speak(drag.name);
            },
            onDragStart: function (e) {
                responsiveVoice.speak(drag.name);
            },
            onDrag: function (e) {
                if (this.hitTest(elementDrop, overlapThreshold))
                    $(this.target).attr("id", "correct");
                else $(this.target).removeAttr("id", "correct");
            },
            onDragEnd: function (e) {
                // valida si el elemento tiene el id correct si no lo tiene lo devuelve a su posicion inicial
                intents++;
                if (!$(this.target).attr("id") || $(this.target).data('draggable') != $(elementDrop).attr("id").replace('-drop', '')) {
                    // move to original pos
                    TweenLite.to(this.target, 0.1, {
                        x: 0,
                        y: 0,
                    });
                    soundIncorrectAnswer();
                } else {
                    if (!accerts.includes($(this.target).data("draggable"))) {
                        accerts.push($(this.target).data("draggable"));
                        soundCorrectAnswer();
                        this.kill();
                    }

                    if (accerts.length == words_options.length) {
                        alertExcellent();
                        return;
                    }

                    if (accerts.length % 2 == 0) {
                        document.getElementById('next').classList.add("animate-button");
                        $(".option-listen").css('pointer-events', 'none');
                    }
                    changeStatusButtons();
                }
                let score = (accerts.length * 100) / intents
                setScoreStorage(module = 'M1', lesson = 'L1', { name: 'drag and drop', score: score, type: 'selftCheck' })
            },
        });
    });
}

function nextWord() {
    if (num_page + 1 < words_options.length) num_page += 2;
    $(".option-listen").css('pointer-events', '');
    document.getElementById('next').classList.remove("animate-button");
    imprimirOpcionesAleatorias();
    // Animar boton de sonido

    changeStatusButtons();
}

function prevWord() {
    num_page > 0 ? num_page -= 2 : '';
    imprimirOpcionesAleatorias();

    changeStatusButtons();
}

function changeStatusButtons() {
    if (num_page <= 0) {
        document.querySelector("#img-prev").src = "./assets/img/button-back-gray.svg";
        document.querySelector("#prev").disabled = true;
        document.querySelector("#prev").classList.remove("boton-presionado");
    } else {
        document.querySelector("#img-prev").src = "./assets/img/button-back.svg";
        document.querySelector("#prev").disabled = false;
        document.querySelector("#prev").classList.add("boton-presionado");
    }

    if (num_page == words_options.length - 2) {
        document.querySelector("#img-next").src = "./assets/img/button-next-gray.svg";
        document.querySelector("#next").disabled = true;
        document.querySelector("#next").classList.remove("boton-presionado");
    } else {
        document.querySelector("#img-next").src = "./assets/img/button-next.svg";
        document.querySelector("#next").disabled = false;
        document.querySelector("#next").classList.add("boton-presionado");
    }
}




function soundCorrectAnswer() {
    alertExcellent()
    const music = new Audio('./assets/audios/correct-answer.mp3');
    music.play();
}

function soundIncorrectAnswer() {
    alertTryAgain()
    const music = new Audio('./assets/audios/incorrect-answer.mp3');
    music.play();
}
