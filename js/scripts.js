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
