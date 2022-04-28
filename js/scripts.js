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
const third_vid = document.querySelector('#third-vid');

const videos = [first_vid, second_vid, third_vid];

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
        current_vid = 2;
    } else {
        current_vid--;
    }
    videos[current_vid].classList.remove('hidden');
}


/*
    Major Carousel
 */

const majors = document.querySelector('#majors').children;

const major_title = document.querySelector('#major-title')
const major_description = document.querySelector('#major-description')

let current_eli = majors[0];
let absolute_position = majors.length * 2;
let relative_position = 0;
let dom_position = 0;

const titles = ["ELI", "ERROR", "SUPER LEE", "BIRDY", "MO ALI", "GIZMO", "MEGA E", "DEVIL", "CERSEI", "KERMIT", "SIR PATRICK"];
const stories = [
    "Eli was created by a mad scientist who was obsessed about control and domination. He was meant to be a killer robot that could aid him to eradicate life at his desire. But for some reason, and only having limited resources to build this robot, ELI was born with a cute exterior. No one would ever believe that he was made to kill. He looks like he cannot hurt a fly.",
    "ERROR, the first robot, was born from the womb of war. He saw first-hand what the enemy wanted from his creator. And so his character was forged with unparalleled obedience and loyalty. Though he was not blessed, like the others, with a well-built exterior, he was the most powerful between the majors and the most dedicated robot for the cause. He was ELI’s right hand in battle and rightfully so. The events that transpired to his creation were always a baffling mystery. Why he was born this way is always asked but never answered. Maybe in time, when the puzzle starts to unfold, people will know the truth.",
    "This robot is full of optimism and energy. Optimism is sometimes crucial in a war. It can be the drive and the reason for victory. Super LEE probably decided that it should be special and therefore named itself super. What is so super? Well the ability to scour through the dump and find things no one can find. Its immense curiosity enables it to dig through piles of junk, sometimes for days, just to find one item that could be of great power.If you want to get its attention tie a group of balloons together and let it fly about. You would probably hear LEE’s voice from waaaay far.",
    "The girliest and the cutest of them all. Birdy instantly had a thing for makeup, outfits and dress ups. Why she is so into the pink color is beyond any of the other robots. She chose the color pink for its exterior or it was given to her is also another mystery. When burdy started roaming around she was attracted to smaller and cuter creatures. Birds were one of them. How she finds them and catches them turns heads. She has a way with birds in a way that everytime she finds one it is easy for her to catch. Perhaps she uses crumbs of leftover food. Although she has a cute exterior and is affectionate towards the others, she is easily rattled. She could destroy entire fleets if she is not in the right mood. So make sure you are always on her good side and try bringing presents. Hint: things that resemble birds are her favorites.",
    "“The ultimate fighter”, that is what he likes to be called. In the left corner of the dump, at 10kg. Wearing black and blue is MOOOO aLIIII. You will hear this recording over and over again all over the dump. The minute this robot found these boxing gear, including DVD’s to the infamous fighter Mohamad Ali Klay, he was obsessed by the entire thing. Now he wears them all the time and picks fights all over the dump. He is relentless and is very effective on the battlefield. His dedication to be the best fighter won the robots many wars and taught others that you have to possess the will and to be the best at what you do.",
    "It’s a blessing and a curse to think you are of superior intelligence. One robot that believes he is the mastermind of all battle techniques is Gizmo. As all robots, upon their creation, they begin to wander the landfill. Gizmo was so lucky to find an old pencil and thought of it as a sign of his purpose. He also believed that by finding this particular pencil he is now a genius. He keeps this pencil with him at all times as it is also his main weapon. He was able to alter the pencil and insert sharp needles that are deadly in the hands of this genius. Maybe he is one. Transforming a pencil to a killing machine is not an easy task and is very admired by the army generals as well as subordinates. The cuter they get, these robots, the deadlier they are.",
    "You probably have heard of humans trying to be robots or mimicking robots. Or you dress up for Halloween as a robot. You have even heard of robots trying to be humans. But a robot loving being a robot so much he takes being a robot to a desktop level is most probably unheard of. Mega E is undeniably with no heart. To do so he ripped out pieces he liked from deactivated robots. If it was allowed he would have ripped out pieces he liked from activated robots. This one is a cold hearted killer. Very effective in strategizing as he considers all life to be ones and zeros. The most effective path to victory is the logical mathematical path. He has no affection for casualties as they are considered to be calculated collateral damage. This robot is metallic on the outside as well as on the inside. You do not want to cross paths with this robot.",
    "Where there is good there is Evil. And in the midst of the robot army lies an ancient evil. This story is not for the faint of heart. Devil, as he likes to call himself, is of strange origins. Although most of the robot army acts awkward about it or simply pretends there is no demon walking among them, with time many theories were formed about how this robot became this way. One particular theory is scarier than the others. There are rumors that in the beginning of the robot awakening, an ancient book of sorcery was found by one robot. The book was written by an ancient demon that lurked for centuries waiting for the right moment to find his passing to a human vessel. I guess his plans were literally dumped. The only vessel it found was a robotic one. Is this better or worse for the world? We are about to find out.",
    "If you think Devil is awkward to be around, Cersei is a weirdo. On her search for gadgets and creatures in the dumb she stumbled upon an old broom. You’d think she started cleaning. But no, she actually began riding the broom and pretending she is a witch of old. She gathered garments from the dump as well and designed an outfit that is best suited for a witch in the stories. Well she is no merlin and spells are definitely not her thing. Dumbeldore is tumbling in his grave watching her trying to create a spell. The search for a decent spell book continues. She will not rest until she has knowledge of the world of the occult. Right now the closest thing to witchcraft she has found is reddit. Not exactly adequate to be in the devil’s army but the rumor has it that the devil has an eye on her.",
    "The Guinness world record for the most amount of sleep is broken. Kermit is now in the books. When every robot roamed the land to search for items to help them in their quests and their war, this guy was still sleepy. “Sleep it off”, that is his motto. In life and in battle, whenever he faces adversity you will find him nesting up somewhere there is no sound and sleeping his way through. If you think he can't be more lazy, think again. He actually reprogrammed himself to be more sleepy. This is a desktop level of laziness. However, as lazy as he is, he is a masterful killer. When he is not sleeping he is playing games and learning desktop techniques to kill enemies. So when is on the battlefield he is feared by all foes.",
    "All the robots found a way to be one with the items they found. This robot is literally attached to his items. On his quest to be unique and find an item that could also be used in battle his eyes caught an old white sheet. From that moment he has no memory of how and why the sheet is always on him. The curse that accompanies the sheet is a powerful one. So powerful that Sir Patrick has the ability to go through walls and allows him to be invisible on the battlefield. His reputation precedes him as the invisible robot. He is feared by the armies of the enemy as he is able to kill large numbers behind enemy lines and never being spotted. He also goes through wells whenever he is demanded to reveal enemy secrets. Sir Patrick is not a social robot but one of the most important robots in the war."
];

//Array aller Small-Majors
let majors_small = document.querySelector('#majors-small').querySelectorAll(":scope > .major-container");

let majors_small_width;

//Width eines Small-Majors ink. Update bei Viewport-Resize
window.addEventListener('resize', function (event) {
    majors_small_width = majors_small[1].offsetWidth;
});
window.onload = function () {
    majors_small_width = majors_small[1].offsetWidth;
};

const originalContent = document.querySelector('#majors-small').innerHTML;

function setCarousel() {
    //reset
    document.querySelector('#majors-small').innerHTML = originalContent;

    //multiply
    for (let i = 0; i < 3; i++) {
        document.querySelector('#majors-small').innerHTML += originalContent;
    }

    //hide first element for centering
    document.querySelector('#majors-small').querySelectorAll(":scope > .major-container")[0].style.display = "none";

    //reset values
    majors_small = document.querySelector('#majors-small').querySelectorAll(":scope > .major-container");
    current_eli = majors[0];
    absolute_position = majors.length * 2;
    relative_position = 0;
    majors_small[absolute_position].classList.remove('hidden');

    //apply onclick
    for (let index = 0; index < majors_small.length; index++) {
        majors_small[index].addEventListener('click', function () {
            changeEli(majors[index % majors.length], index)
        }, false);
    }
}

setCarousel();

let timeout = false;

function changeEli(eli, index) {
    if (!timeout) {
        timeout = true;
        //slide right
        if (index > absolute_position) {
            relative_position += index - absolute_position;
            dom_position -= majors_small_width * (index - absolute_position);
            for (let i = 0; i < index - absolute_position; i++) {
                majors_small.forEach(element => {
                    element.animate([
                            {
                                transform: `translateX(${dom_position}px)`
                            }
                        ],
                        {
                            duration: 300 * (index - absolute_position),
                            easing: 'ease-out',
                            fill: 'forwards'
                        }
                    );
                });
                majors_small[absolute_position].classList.add('hidden');
                majors_small[index].classList.remove('hidden');
            }
        }
        //slide left
        if (index < absolute_position) {
            relative_position -= absolute_position - index;
            dom_position += majors_small_width * (absolute_position - index);
            for (let i = 0; i < absolute_position - index; i++) {
                majors_small.forEach(element => {
                    element.animate([
                            {
                                transform: `translateX(${dom_position}px)`
                            }
                        ],
                        {
                            duration: 300 * (absolute_position - index),
                            easing: 'ease-out',
                            fill: 'forwards'
                        }
                    )
                });
                majors_small[absolute_position].classList.add('hidden');
                majors_small[index].classList.remove('hidden');
            }
        }
        current_eli.classList.add('hidden');
        eli.classList.remove('hidden');
        major_description.innerHTML = stories[index % majors.length]
        major_title.innerHTML = titles[index % majors.length]
        current_eli = eli;
        absolute_position = index;

        // rest if relative position <= starting position
        if (Math.abs(relative_position) >= majors.length) {
            let diff = (Math.abs(relative_position) - majors.length) * Math.sign(relative_position);
            dom_position = majors_small_width * (-diff);
            majors_small[(majors.length * 2) + diff].classList.remove('hidden');
            setTimeout(function () {
                majors_small.forEach(element => {
                    element.animate([
                            {
                                transform: `translateX(${dom_position}px)`
                            }
                        ],
                        {
                            duration: 1,
                            fill: 'forwards',
                        }
                    )
                });
                majors_small[absolute_position].classList.add('hidden');
                //reset values
                majors_small = document.querySelector('#majors-small').querySelectorAll(":scope > .major-container");
                if (Math.sign(diff) == -1) {
                    current_eli = majors[majors.length + diff];
                } else {
                    current_eli = majors[diff];
                }
                absolute_position = (majors.length * 2) + diff;
                relative_position = diff;
                majors_small[absolute_position].classList.remove('hidden');
            }, 300);

        }
    }
    setTimeout(function () {
        timeout = false;
    }, 300);
}

document.querySelector('#changeEliBefore').addEventListener('click', changeEliBefore, false)
document.querySelector('#changeEliAfter').addEventListener('click', changeEliAfter, false)

function changeEliBefore() {
    changeEli(majors[(absolute_position - 1) % majors.length], (absolute_position - 1))
}

function changeEliAfter() {
    changeEli(majors[(absolute_position + 1) % majors.length], (absolute_position + 1))
}

/*
    Team Member Info Cards
 */


$(".project").hover3d({
    selector: ".project__card",
    sensitivity: "17",
    perspective: "600",
    hoverClass: "hover-3d",
});


document.addEventListener('click', removeActive, false)

function removeActive() {
    document.querySelectorAll('.team-member').forEach(item => {
        item.classList.remove('active')
    })
}

document.querySelectorAll('.team-member').forEach(item => {
    item.addEventListener('click', event => {
        if(!item.classList.contains('active')) {
            setTimeout(() => {
                item.classList.add('active');
            }, 5)
        }
    })
})


/*
    Lottieplayer start animation on scroll
 */


var observer = new IntersectionObserver(function (entries) {
        if (entries[0].intersectionRatio === 1) {
            entries[0]['target'].play();
            entries[0]['target'].setLooping(true);
        } else {
            entries[0]['target'].setLooping(false);
        }
    },
    {
        root: null,
        threshold: [1],
        rootMargin: "0px 0px 0px 0px"
    });

observer.observe(document.querySelector("#lab_light"));



