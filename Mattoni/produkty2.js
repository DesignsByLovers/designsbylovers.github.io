let prev = document.getElementById('prev');
let next = document.getElementById('next');
let image = document.querySelector('.images');
let items = document.querySelectorAll('.images .item');
let contents = document.querySelectorAll('.content .item');

let rotate = 0;
let active = 0;
let countItem = items.length;
let rotateAdd = 360 / countItem;

function show() {
    image.style.setProperty('--rotate', rotate + 'deg');
    contents.forEach((content, key) => {
        if(key == active) {
            content.classList.add('active');
        }
        else {
            content.classList.remove('active');
        }
    })
}
function nextSlider() {
    active = active + 1 > countItem - 1 ? 0 : active + 1;
    rotate = rotate + rotateAdd;
    show();
}
next.onclick = nextSlider;

function prevSlider() {
    active = active - 1 < 0 ? countItem - 1 : active - 1;
    rotate = rotate - rotateAdd;
    show();
}
prev.onclick = prevSlider;

const autoNext = setInterval(nextSlider, 7000);