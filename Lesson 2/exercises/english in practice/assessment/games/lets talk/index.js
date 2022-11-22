$btnComenzarGrabacion = document.querySelector("#btn-record");
$btnDetenerGrabacion = document.querySelector("#btn-stop-record");

$btnComenzarGrabacion2 = document.querySelector("#btn-record-2");
$btnDetenerGrabacion2 = document.querySelector("#btn-stop-record-2");

$btnComenzarGrabacion3 = document.querySelector("#btn-record-3");
$btnDetenerGrabacion3 = document.querySelector("#btn-stop-record-3");


const init = () => {
    //changeButtons('init')

    const tieneSoporteUserMedia = () =>
        !!(navigator.mediaDevices.getUserMedia)

    // Si no soporta...
    // Amable aviso para que el mundo comience a usar navegadores decentes ;)
    if (typeof MediaRecorder === "undefined" || !tieneSoporteUserMedia())
        return alert("Tu navegador web no cumple los requisitos; por favor, actualiza a un navegador decente como Firefox o Google Chrome");

    let mediaRecorder;
    // Consulta la lista de dispositivos de entrada de audio y llena el select
    const listDevices = [];
    const getList = () => {
        navigator.mediaDevices.enumerateDevices().then(dispositivos => {
            dispositivos.forEach((dispositivo, indice) => {
                if (dispositivo.kind === "audioinput") {
                    const opcion = [];
                    opcion.value = dispositivo.deviceId;
                    listDevices.push(opcion);
                }
            })
        })
    };

    // Comienza a grabar el audio con el dispositivo seleccionado
    const initRecord = () => {

        // if(detener_grabacion) {
        //     detenerGrabacion();
        //     return;
        // }

        if (!listDevices.length) return alert("No hay dispositivos");

        // No permitir que se grabe doblemente
        if (mediaRecorder) return alert("Ya se está grabando");

        navigator.mediaDevices.getUserMedia({
            audio: {
                deviceId: listDevices[0].value,
            }
        })
            .then(
                stream => {
                    // Comenzar a grabar con el stream
                    //changeButtons('init',$btnDetenerGrabacion, $btnComenzarGrabacion)
                    mediaRecorder = new MediaRecorder(stream);
                    mediaRecorder.start();
                    // En el arreglo pondremos los datos que traiga el evento dataavailable
                    const fragmentosDeAudio = [];
                    // Escuchar cuando haya datos disponibles
                    mediaRecorder.addEventListener("dataavailable", evento => {
                        // Y agregarlos a los fragmentos
                        fragmentosDeAudio.push(evento.data);
                    });
                    // Cuando se detenga (haciendo click en el botón) se ejecuta esto
                    mediaRecorder.addEventListener("stop", () => {
                        // Detener el stream
                        stream.getTracks().forEach(track => track.stop());

                        // Convertir los fragmentos a un objeto binario
                        const blobAudio = new Blob(fragmentosDeAudio);

                        // Crear una URL o enlace para descargar
                        const urlParaDescargar = URL.createObjectURL(blobAudio);
                        // Crear un elemento <a> invisible para descargar el audio
                        let a = document.createElement("a");
                        document.body.appendChild(a);
                        a.style = "display: none";
                        a.href = urlParaDescargar;
                        a.download = "grabacion.webm";
                        // Hacer click en el enlace
                        a.click();
                        // Y remover el objeto
                        window.URL.revokeObjectURL(urlParaDescargar);
                    });
                }
            )
            .catch(error => {
                // Aquí maneja el error, tal vez no dieron permiso
                console.log(error)
            });

        // detener_grabacion = true;
    };

    const stopRecord = () => {
        if (!mediaRecorder) return alert("No se está grabando");
        mediaRecorder.stop();
        mediaRecorder = null;
        //changeButtons('stop',$btnDetenerGrabacion, $btnComenzarGrabacion)   

        // detener_grabacion = false;
    };

    $btnComenzarGrabacion.addEventListener("click", initRecord);
    $btnDetenerGrabacion.addEventListener("click", stopRecord);

    $btnComenzarGrabacion2.addEventListener("click", initRecord);
    $btnDetenerGrabacion2.addEventListener("click", stopRecord);

    $btnComenzarGrabacion3.addEventListener("click", initRecord);
    $btnDetenerGrabacion3.addEventListener("click", stopRecord);




    // Cuando ya hemos configurado lo necesario allá arriba llenamos la lista
    getList();
}

init();

// function changeButtons(type, buttonStop, buttonPlay){
//     if(type === 'init'){
//         buttonStop.classList = "d-none"
//         buttonPlay.classList = ""
//     }else{
//         buttonStop.classList = ""
//         buttonPlay.classList="d-none"
//     }
// }

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
