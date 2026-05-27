const pri = document.querySelector('.pri');
const ese = document.querySelector('.ese');
const och = document.querySelector('.och');

const imgprirodni = document.querySelector('.image .img_box.prirodni');
const imgesence = document.querySelector('.image .img_box.esence');
const imgochucene = document.querySelector('.image .img_box.ochucene');

pri.addEventListener('click', ()=>{
    imgprirodni.style.opacity = '1'
    imgprirodni.style.transform = 'rotate(0deg)'

    imgesence.style.opacity = '0'
    imgesence.style.transform = 'rotate(-90deg)'
    imgochucene.style.opacity = '0'
    imgochucene.style.transform = 'rotate(-90deg)'
})

ese.addEventListener('click', ()=>{
    imgesence.style.opacity = '1'
    imgesence.style.transform = 'rotate(0deg)'

    imgprirodni.style.opacity = '0'
    imgprirodni.style.transform = 'rotate(-90deg)'
    imgochucene.style.opacity = '0'
    imgochucene.style.transform = 'rotate(-90deg)'
})

och.addEventListener('click', ()=>{
    imgochucene.style.opacity = '1'
    imgochucene.style.transform = 'rotate(0deg)'

    imgesence.style.opacity = '0'
    imgesence.style.transform = 'rotate(-90deg)'
    imgprirodni.style.opacity = '0'
    imgprirodni.style.transform = 'rotate(-90deg)'
})

const textprirodni = document.querySelector('.content .text_box.prirodni');
const textesence = document.querySelector('.content .text_box.esence');
const textochucene = document.querySelector('.content .text_box.ochucene');

pri.addEventListener('click', ()=>{
    textprirodni.style.opacity = '1'
    textprirodni.style.transform = 'rotate(0deg)'

    textesence.style.opacity = '0'
    textesence.style.transform = 'rotate(0deg)'
    textochucene.style.opacity = '0'
    textochucene.style.transform = 'rotate(0deg)'
})

ese.addEventListener('click', ()=>{
    textesence.style.opacity = '1'
    textesence.style.transform = 'rotate(0deg)'

    textprirodni.style.opacity = '0'
    textprirodni.style.transform = 'rotate(0deg)'
    textochucene.style.opacity = '0'
    textochucene.style.transform = 'rotate(0deg)'
})

och.addEventListener('click', ()=>{
    textochucene.style.opacity = '1'
    textochucene.style.transform = 'rotate(0deg)'

    textesence.style.opacity = '0'
    textesence.style.transform = 'rotate(0deg)'
    textprirodni.style.opacity = '0'
    textprirodni.style.transform = 'rotate(0deg)'
})

const btnprirodni = document.querySelector('.content .btn_box.prirodni');
const btnesence = document.querySelector('.content .btn_box.esence');
const btnochucene = document.querySelector('.content .btn_box.ochucene');

pri.addEventListener('click', () => {
    btnprirodni.style.display = 'inline-block';
    btnesence.style.display = 'none';
    btnochucene.style.display = 'none';
});

ese.addEventListener('click', () => {
    btnprirodni.style.display = 'none';
    btnesence.style.display = 'inline-block';
    btnochucene.style.display = 'none';
});

och.addEventListener('click', () => {
    btnprirodni.style.display = 'none';
    btnesence.style.display = 'none';
    btnochucene.style.display = 'inline-block';
});

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

const autoNext = setInterval(nextSlider, 4000);