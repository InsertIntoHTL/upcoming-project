/*
    Toggle Navbar and blur
 */

const navbar = document.querySelector('.nav-blurry');

const nav = document.querySelector('nav');

const menu = document.querySelector('#menu');

const body = document.querySelector('body');

let menu_state = false;

const burger = document.querySelector('.burger');
const burger2 = document.querySelector('#span2');


function toggleBlur(state) {
    if (state == "on") {
        navbar.classList.add("nav-blurry");
        nav.style.backgroundColor = "hsla(0, 0%, 0%, 0.1)";
    } else if (state == "off") {
        navbar.classList.remove("nav-blurry");
        nav.style.backgroundColor = "hsl(257,100%,26%)";
    } else {
        throw "toggleBlur: state is not valid!"
    }
}

document.addEventListener('scroll', windowScroll, false)

function windowScroll() {
    if (!menu_state) {
        if (window.scrollY > 100) {
            toggleBlur("off")
        } else {
            toggleBlur("on")
        }
    }
}

function toggleBurger() {
    if (!menu_state) {
        burger2.style.transitionDelay = "0s"
        burger.classList.add("open");
    } else {
        burger2.style.transitionDelay = ".1s"
        burger.classList.remove("open");
    }
}

document.querySelector('#burger').addEventListener('click', toggleMenu, false)

document.querySelectorAll(".mobile .menu-wrapper a").forEach(n => {
    n.addEventListener('click', toggleMenu, false)
})


function toggleMenu() {
    if (!menu_state) {
        toggleBurger();
        toggleBlur("off");
        nav.style.background = "-webkit-linear-gradient(0deg, rgb(0, 11, 76) 0%, rgb(0, 11, 76) 100%);";
        nav.style.backgroundColor = "hsla(0, 0%, 0%, 0)";
        menu.classList.remove("hidden");
        body.classList.add("fixed");
        body.classList.add("no-overflow");
    } else {
        toggleBurger();
        if (window.scrollY > 100) {
            toggleBlur("off")
        } else {
            toggleBlur("on")
        }
        menu.classList.add("hidden");
        body.classList.remove("fixed");
        body.classList.remove("no-overflow");
    }

    menu_state = !menu_state;
}



/*
    Video Player
 */

window.addEventListener('resize', stopOnResize, false)

function stopOnResize() {
    $('.iframe').each(function () {
        this.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*')
    });
}


const prev = document.querySelector('#previous');
const next = document.querySelector('#next');

const first_vid = document.querySelector('#first-vid');
const second_vid = document.querySelector('#second-vid');
//const third_vid = document.querySelector('#third-vid');

const videos = [first_vid, second_vid];

let current_vid = 0;

prev.addEventListener('click', prevVid, false);
next.addEventListener('click', nextVid, false);


function nextVid() {
    $('.iframe').each(function () {
        this.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*')
    });
    videos[current_vid].classList.add('hidden');
    if (videos.length - 1 === current_vid) {
        current_vid = 0;
    } else {
        current_vid++;
    }
    videos[current_vid].classList.remove('hidden');
}

function prevVid() {
    $('.iframe').each(function () {
        this.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*')
    });
    videos[current_vid].classList.add('hidden');
    if (current_vid === 0) {
        current_vid = videos.length-1;
    } else {
        current_vid--;
    }
    videos[current_vid].classList.remove('hidden');
}



/*
    Audio
 */

let audio = new Audio('assets/audio/Cant_touch_this.mp3');


/*
 Lottie-Files Animation trigger
 */

document.querySelectorAll('.sub-section').forEach(item => {
    item.addEventListener('click', event => {
        item.querySelectorAll('.lottiefile')[0].play();
        audio.play();
    }, {once: true})
})
