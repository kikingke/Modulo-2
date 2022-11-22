let numPages = 3
let currentPage = 0

window.onload = () => {
    showSection(currentPage)
}


function hideOrShowPage(part, type){
    let containerPage = document.getElementById(`container-${part}-activity`)
    containerPage.classList = `row container-${part}-activity ${part === 'first' ? 'container bg-image' : ''} ${ type === 'show' ? '': 'd-none'}`
}

function printActivity(){
    console.log('si activity')
    let container = document.getElementById('container-second-activity')
    container.innerHTML = `
        <iframe src="../choose the image/index.html"></iframe> 
    `
}

function printVideo(){
    console.log('si video')
    let container = document.getElementById('container-first-activity')
    container.innerHTML = `
        <div class="col-12 col-lg-8 ">
            <p class="subtitle-activity text-start">Watch the video and answer.</p>
            <div id="container-cards" class="cross-center p-4 bg-white border-radius">
                <div class="content-video">
                    <video src="./assets/videos/Good Morning Song.mp4" id="video" controls></video>
                </div>
            </div>
        </div>
        <div class="col-12 col-lg-4 cross-center">
            <img src="./assets/img/boy.png" alt="">
        </div>
        `
    const player = new Plyr('#video');  
}

function showSection(section){
    console.log(section, 'show')
    if(section === 0) {
        hideOrShowPage('second', 'hide')
        hideOrShowPage('first', 'show')
        printVideo()
    }
    if(section === 2){
        hideOrShowPage('first', 'hide')
        hideOrShowPage('second', 'show')
        printActivity()
    }
}

function isPaginate(){

    document.getElementById('btn-back').classList.add('d-none')
    document.getElementById('btn-next').classList.add('d-none')
}

function next(){
    currentPage <= numPages && currentPage++
    showSection(currentPage+1)
    changeStatusButtons()
}

function back(){
    currentPage >= 0 &&  currentPage--
    showSection(currentPage-1)
    changeStatusButtons()
}

function changeStatusButtons() {
    if(currentPage <= 0) {
        document.querySelector("#img-prev").src = "./assets/img/button-back-gray.svg";
        document.querySelector("#back").disabled = true;
    }else{
        document.querySelector("#img-prev").src = "./assets/img/button-back.svg";
        document.querySelector("#back").disabled = false;
    }
    
    if(currentPage == numPages) {
        document.querySelector("#img-next").src = "./assets/img/button-next-gray.svg";
        document.querySelector("#next").disabled = true;
    }else{
        document.querySelector("#img-next").src = "./assets/img/button-next.svg";
        document.querySelector("#next").disabled = false;
    }
}
