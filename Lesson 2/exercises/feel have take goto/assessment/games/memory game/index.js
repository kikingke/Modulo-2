let words_options = getRandomArray([
  { name: 'ifeelsick', sound: 'I feel sick.' },
  { name: 'hehasacold', sound: 'He has a cold.' },
  { name: 'hegoestothedoctos', sound: 'He goes to the doctors.' },
  { name: 'shefeelssick', sound: 'She feels sick.' },
  { name: 'shetakescoldmedicine', sound: 'She takes cold medicine.' },
  { name: 'theygotothedoctors', sound: 'They go to the doctors.' },
  { name: 'wetakecoldmedicine', sound: 'We take cold medicine.' },
  { name: 'youhaveacold', sound: 'You have a cold.' }
])

let words_random = [];

let counter = 0;
let firstSelection = "";
let secondSelection = "";
let totalCards = 0;
let carta;

let accerts = 0;

document.body.onload = function () {
  addNumberOptionsRandom();
};

function addNumberOptionsRandom() {
  let duplicateArray = 0;
  words_options.forEach(function (element, key) {
    duplicateArray = words_options.length + key;
    words_random[key] = { name: element.name, audio: false, sound: element.sound };
    words_random[duplicateArray] = { name: element.name, audio: true, sound: element.sound };
  });

  for (let i = words_random.length - 1; i > 0; i--) {
    let indiceAleatorio = Math.floor(Math.random() * (i + 1));
    let temporal = words_random[i];

    words_random[i] = words_random[indiceAleatorio];
    words_random[indiceAleatorio] = temporal;
  }
  addCardsRandom();
}

function addCardsRandom() {
  words_random.forEach((card) => {
    if (card.audio) {
      document.querySelector(".cards").innerHTML += `
      <div class="border-radius card chg-s p-3" bodypart="${card.name}" audio="${card.audio}" sound="${card.sound}">
          <p class="textoInterno">${card.sound}</p>
          <!--<img src="./assets/img/sound-icon.svg" alt="" />-->

      </div>`;
    }
    else {
      console.log("checking=> ", card);
      document.querySelector(".cards").innerHTML += `
  <div class="border-radius card chg-s" bodypart="${card.name}" audio="${card.audio}">
       <p class="textoInterno">${card.sound}</p>
       <!--<img src="./assets/img/cards/${card.name}.png" alt="" />-->
  </div>`;
    }
  });

  words_options.forEach((option) => {
    document.querySelector(".questions").innerHTML += `
            <div class="border-radius questioncard bg-white text-animate container-port" data-bodypart="${option.name}">
                <div>${option.sound}</div>
            </div>`;
  });
  animateCards();
  validateSelectionCard();
}

function animateCards() {
  anime({
    targets: ".card",
    scale: [
      { value: 0.1, easing: "easeOutSine", duration: 500 },
      { value: 1, easing: "easeInOutQuad", duration: 1200 },
    ],
    delay: anime.stagger(200, { grid: [14, 5], from: "center" }),
  });
}

function validateSelectionCard() {
  const cards = document.querySelectorAll(".cards .card");

  cards.forEach((card) => {
    totalCards++;

    card.addEventListener("click", async () => {
      card.classList.add("clicked");

      let audio = card.getAttribute("audio");
      let sound = card.getAttribute("sound");

      if (counter === 0) {
        firstSelection = card.getAttribute("bodypart");
        $(card).css("pointer-events", "none");
        carta = card;
        counter++;

        if (audio == 'true') { responsiveVoice.speak(sound) }

      } else {
        secondSelection = card.getAttribute("bodypart");
        counter = 0;
        if (firstSelection === secondSelection) {
          accerts++
          const correctCards = document.querySelectorAll(
            ".card[bodypart='" + firstSelection + "']"
          );
          correctCards.forEach((card) => {
            card.classList.add("checked");
            card.classList.remove("clicked");
          });

          let checked = document.querySelectorAll(".checked");

          if (audio == 'true') { responsiveVoice.speak(sound) }


          setTimeout(() => {
            if (checked.length == totalCards) {
              let score = (accerts * 100) / words_options.length
              setScoreStorage(module = 'M1', lesson = 'L1', { name: 'memory game', score: score, type: 'selftCheck' })
              alertExcellent()
            };

            soundCorrectAnswer();
            validatePartners(firstSelection);
          }, 2000);
        } else {
          const incorrectCards = document.querySelectorAll(".card.clicked");

          if (audio == 'true') { responsiveVoice.speak(`${sound}`) }

          incorrectCards[0].classList.add("shake");
          incorrectCards[1].classList.add("shake");
          soundIncorrectAnswer();
          setTimeout(() => {
            incorrectCards.forEach((card) => {
              card.classList.remove("shake");
              card.classList.remove("clicked");
            });
          }, 800);

        }
        $(carta).css("pointer-events", "auto");
      }
    });
  });
}

function validatePartners(partnerCorrect) {
  let options = document.querySelectorAll(".questioncard");

  options.forEach((card) => {
    if (card.dataset.bodypart == partnerCorrect) {
      card.innerHTML = `${partnerCorrect}<img src="./assets/img/cards/${partnerCorrect}.png" onclick="responsiveVoice.speak('${partnerCorrect}')" width="100%" height="65%">`;
      card.style.color = "#ffffff";
    }
  });
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

