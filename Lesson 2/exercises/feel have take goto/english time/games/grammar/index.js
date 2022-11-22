let words_options = [
    { 's1': 'I feel', 's2': 'You feel', 's3': 'We feel', 's4': 'They feel' },
    { 's1': 'I have', 's2': 'You have', 's3': 'We have', 's4': 'They have' },
    { 's1': 'I take', 's2': 'You take', 's3': 'We take', 's4': 'They take' },
    { 's1': 'I go to', 's2': 'You go to', 's3': 'We go to', 's4': 'They go to' },

    { 's1': 'She feels', 's2': 'He feels', 's3': 'It feels' },
    { 's1': 'She has', 's2': 'He has', 's3': 'It has' },
    { 's1': 'She takes', 's2': 'He takes', 's3': 'It takes' },
    { 's1': 'She goes to', 's2': 'He goes to', 's3': 'It goes to' },

    { 's1': 'Do you I / we / they feel + adjective?', 's2': 'Does she / he / it feel + adjective?' },
    { 's1': 'Do you I / we / they have + adjective?', 's2': 'Does she / he / it have + adjective?' },
    { 's1': 'Do you I / we / they take + adjective?', 's2': 'Does she / he / it take + adjective?' },
    { 's1': 'Do you I / we / they go to + adjective?', 's2': 'Does she / he / it go to + adjective?' }
];

var linea1 = words_options[0].s1 + words_options[0].s2 + words_options[0].s3 + words_options[0].s4;
var linea2 = words_options[1].s1 + words_options[1].s2 + words_options[1].s3 + words_options[1].s4;
var linea3 = words_options[2].s1 + words_options[2].s2 + words_options[2].s3 + words_options[2].s4;
var linea4 = words_options[3].s1 + words_options[3].s2 + words_options[3].s3 + words_options[3].s4;

var linea5 = words_options[4].s1 + words_options[4].s2 + words_options[4].s3;
var linea6 = words_options[5].s1 + words_options[5].s2 + words_options[5].s3;
var linea7 = words_options[6].s1 + words_options[6].s2 + words_options[6].s3;
var linea8 = words_options[7].s1 + words_options[7].s2 + words_options[7].s3;

var linea9 = words_options[8].s1 + words_options[8].s2;
var linea10 = words_options[9].s1 + words_options[9].s2;
var linea11 = words_options[10].s1 + words_options[10].s2;
var linea12 = words_options[11].s1 + words_options[11].s2;

let num_pages = []
let array_medium = 1;
let accerts = []
let long = array_medium;
let i = 07
let intents = 0;
const music = new Audio();

window.onload = () => {
    initialize('firstPart');
}

function initialize(progress) {
    if (progress == 'firstPart') {
        long = array_medium;
        i = 0;

        //   disabledButtonBack();
    } else {
        long = words_options.length;
        i = array_medium;
        document.getElementById('btn-next').classList.remove("animate-button");

        //  disabledButtonNext();
    }

    document.getElementById("contenedor-drag").innerHTML = `<p class="subtitle-activity">Move your mouse over the chart.</p>`
    num_pages = [];

    while (i < long) {
        let random = 0;
        let acept = false;

        while (!acept) {
            if (progress == 'firstPart') random = Math.floor(Math.random() * array_medium)
            else random = Math.floor(Math.random() * (long - array_medium)) + array_medium

            if (!num_pages.includes(random)) {
                num_pages.push(random);
                acept = true;
            }
        }

        document.getElementById("contenedor-drag").innerHTML += `
        <div class="bg-white border-radius p-5" style="width: 100%;">
    <h2 class="text-center text-blue mb-5">SIMPLE PRESENT WITH<br>FEEL / HAVE / TAKE / GO TO</h2>
    <div class="row">
        <div class="col-md-4">
            <div class="firstSquare">
                <div class="bg-blue-1 text-white border-radius cursor-pointer cross-center p-2 div1" 
                onMouseOver="responsiveVoice.speak('${linea1}')">
                    ${words_options[0].s1} <br>${words_options[0].s2}<br> ${words_options[0].s3}<br> ${words_options[0].s4}
                </div>
                <div class="bg-blue-2 text-white border-radius cursor-pointer cross-center p-2 div2" 
                onMouseOver="responsiveVoice.speak('${linea2}')">
                    ${words_options[1].s1} <br>${words_options[1].s2}<br> ${words_options[1].s3}<br> ${words_options[1].s4}
                </div>
                <div class="bg-blue-3 text-blue border-radius cursor-pointer cross-center p-2 div3" 
                onMouseOver="responsiveVoice.speak('${linea3}')">
                    ${words_options[2].s1} <br>${words_options[2].s2}<br> ${words_options[2].s3}<br> ${words_options[2].s4}
                </div>
                <div class="bg-blue-4 text-blue border-radius cursor-pointer cross-center p-2 div4" 
                onMouseOver="responsiveVoice.speak('${linea4}')">
                    ${words_options[3].s1} <br>${words_options[3].s2}<br> ${words_options[3].s3}<br> ${words_options[3].s4}
                </div>
            </div>
        </div>
        <div class="col-md-4">
        <div class="firstSquare">
        <div class="bg-blue-1 text-white border-radius cursor-pointer cross-center p-2 div1" 
        onMouseOver="responsiveVoice.speak('${linea5}')">
            ${words_options[4].s1} <br>${words_options[4].s2}<br> ${words_options[4].s3}<br> ${words_options[4].s4}
        </div>
        <div class="bg-blue-2 text-white border-radius cursor-pointer cross-center p-2 div2" 
        onMouseOver="responsiveVoice.speak('${linea6}')">
            ${words_options[5].s1} <br>${words_options[5].s2}<br> ${words_options[5].s3}<br> ${words_options[5].s4}
        </div>
        <div class="bg-blue-3 text-blue border-radius cursor-pointer cross-center p-2 div3" 
        onMouseOver="responsiveVoice.speak('${linea7}')">
            ${words_options[6].s1} <br>${words_options[6].s2}<br> ${words_options[6].s3}<br> ${words_options[6].s4}
        </div>
        <div class="bg-blue-4 text-blue border-radius cursor-pointer cross-center p-2 div4" 
        onMouseOver="responsiveVoice.speak('${linea8}')">
            ${words_options[7].s1} <br>${words_options[7].s2}<br> ${words_options[7].s3}<br> ${words_options[7].s4}
        </div>
    </div>
        </div>
        <div class="col-md-4">
        <div class="thirdSquare">
        <div class="bg-blue-1 text-white border-radius cursor-pointer cross-center p-2 mb-2" s
        onMouseOver="responsiveVoice.speak('${linea9}')">
            ${words_options[8].s1} <br>${words_options[8].s2}}
        </div>
        <div class="bg-blue-2 text-white border-radius cursor-pointer cross-center p-2 mb-2" 
        onMouseOver="responsiveVoice.speak('${linea10}')">
            ${words_options[9].s1} <br>${words_options[9].s2}}
        </div>
        <div class="bg-blue-3 text-blue border-radius cursor-pointer cross-center p-2 mb-2" 
        onMouseOver="responsiveVoice.speak('${linea11}')">
            ${words_options[10].s1} <br>${words_options[10].s2}}
        </div>
        <div class="bg-blue-4 text-blue border-radius cursor-pointer cross-center p-2 "
        onMouseOver="responsiveVoice.speak('${linea12}')">
            ${words_options[11].s1} <br>${words_options[11].s2}}
        </div>
    </div>
        </div>
    </div>

</div>    
        `;
        i++;
    }

}


function gameSuccess() {
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