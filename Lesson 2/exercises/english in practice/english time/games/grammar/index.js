let words = [
    { 'i feel terrible': 'i feel terrible' },
    { 'i feel hot': 'i feel hot' },
    { 'i feel cold': 'i feel cold' },
    { 'i feel sick': 'i feel sick' },
    { 'i do not feel good': 'i do not feel good' },
    { 'i feel tired': 'i feel tired' },
    { 'i feel bad': 'i feel bad' },
    { 'i do not feel so great': 'i do not feel so great' },
    { 'i feel chilly': 'i feel chilly' },

    { 'i have a headache': 'i have a headache' },
    { 'i have a sore throat': 'i have a sore throat' },
    { 'i have an earache': 'i have an earache' },
    { 'i have a runny nose': 'i have a runny nose' },
    { 'i have a fever': 'i have a fever.' },
    { 'i have a stomachache': 'i have a stomachache' },
    { 'i have a body ache': 'i have a body ache' },
    { 'i have a cold': 'i have a cold.' },
    { 'i have the flu': 'i have the flu' },

    { 'you should take an aspirin': 'you should take an aspirin' },
    { 'you should drink hot honey': 'you should drink hot honey' },
    { 'you should take ear drops': 'you should take ear drops' },
    { 'you should use nasal spray': 'you should use nasal spray' },
    { 'you should take a bath': 'you should take a bath' },
    { 'you should drink tea': 'you should drink tea' },
    { 'you should try to sleep': 'you should try to sleep' },
    { 'you should take cold medicine': 'you should take cold medicine' },
    { 'you should go to the doctors': 'you should go to the doctors' }

]
//let intents = 0;


window.onload = () => {
    _.forEach(words, function (person, key) {
        console.log(key)
        var element = document.getElementById(Object.keys(person));
        //element.style.cssText = "opacity: 0.6;";

        if (key == words.length - 1 && window.innerWidth < 820) {
            element.classList.add("animate-element");
        }

        element.addEventListener("mouseenter", function () {
            element.classList.remove("animate-element");
            responsiveVoice.speak(`${Object.values(person)}`)

            //intents++;
            //let score = (words.length * 100) / intents
            //setScoreStorage('M8', 'L1', { name: 'poster', score: score, type: 'englishTime' })
        });

        element.addEventListener("mouseover", function () {
            element.style.cssText = "opacity: 1;";
        });

        element.addEventListener("mouseout", function () {
            element.style.cssText = "opacity: 0.6;";
        });
    });
}
