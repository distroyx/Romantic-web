/* =========================================================
   ROMANTIC LOVE WEBSITE
   FULL SCRIPT
========================================================= */


/* =========================================================
   ELEMENTS
========================================================= */

const giftHit =
    document.getElementById("giftHit");

const gift =
    document.getElementById("giftImage");

const flowerScreen =
    document.getElementById("flowerScreen");

const flowerField =
    document.getElementById("flowerField");

const nextPage =
    document.getElementById("nextPage");

const loveMusic =
    document.getElementById("loveMusic");

const heartFlow =
    document.getElementById("heartFlow");


/* =========================================================
   STATES
========================================================= */

let opened = false;
let splitStarted = false;
let secondPageStarted = false;
let heartFlowStarted = false;
let heartInterval = null;
let cornerRose = null;


/* =========================================================
   FLOWER ASSETS
========================================================= */

const flowerImages = [
    "./assets/rose-white.png",
    "./assets/rose-red.png",
    "./assets/rose-pink.png",
    "./assets/rose-yellow.png"
];


/* =========================================================
   FLOWER SETTINGS
========================================================= */

const COLUMNS = 16;
const ROWS = 12;

const TOTAL_FLOWERS =
    COLUMNS * ROWS;

const FLOWER_DELAY = 20;

const MIN_FALL = 0.9;
const MAX_FALL = 1.2;

const HOLD_BEFORE_SPLIT = 1800;

const SPLIT_DISTANCE = 60;
const SPLIT_DURATION = 1800;


/* =========================================================
   DRY ROSE
========================================================= */

const CORNER_ROSE_SRC =
    "./assets/dried-rose.png";


/* =========================================================
   CREATE DRY ROSE
========================================================= */

function createCornerRose() {

    if (!nextPage) {
        return null;
    }

    const existingRose =
        document.getElementById("cornerRose");

    if (existingRose) {

        cornerRose = existingRose;

        return cornerRose;
    }

    const rose =
        document.createElement("img");

    rose.id = "cornerRose";
    rose.className = "corner-rose";
    rose.src = CORNER_ROSE_SRC;
    rose.alt = "";
    rose.draggable = false;

    nextPage.insertBefore(
        rose,
        nextPage.firstChild
    );

    cornerRose = rose;

    return cornerRose;
}


/* =========================================================
   OPEN GIFT
========================================================= */

function openGift() {

    if (opened) {
        return;
    }

    opened = true;

    console.log(
        "Gift opened ❤️"
    );


    /* GIFT ANIMATION */

    if (gift) {

        gift.classList.add(
            "gift-clicked"
        );

    }


    /* MUSIC */

    if (loveMusic) {

        try {

            loveMusic.currentTime = 0;
            loveMusic.volume = 0.7;

            const playPromise =
                loveMusic.play();

            if (playPromise) {

                playPromise.catch(
                    (error) => {

                        console.log(
                            "Music autoplay blocked:",
                            error
                        );

                    }
                );

            }

        } catch (error) {

            console.log(
                "Music error:",
                error
            );

        }

    }


    /* FLOWER SCREEN */

    setTimeout(() => {

        if (!flowerScreen) {
            return;
        }

        flowerScreen.classList.add(
            "active"
        );

        startFlowerAnimation();

    }, 650);

}


/* =========================================================
   START FLOWER ANIMATION
========================================================= */

function startFlowerAnimation() {

    if (!flowerField) {
        return;
    }

    flowerField.innerHTML = "";

    splitStarted = false;

    if (flowerScreen) {

        flowerScreen.classList.remove(
            "splitting"
        );

    }


    const positions = [];

    for (
        let row = 0;
        row < ROWS;
        row++
    ) {

        for (
            let col = 0;
            col < COLUMNS;
            col++
        ) {

            positions.push({
                row,
                col
            });

        }

    }


    positions.sort(
        () =>
            Math.random() - 0.5
    );


    positions.forEach(
        (position, index) => {

            setTimeout(() => {

                createFlower(
                    position.row,
                    position.col
                );

            }, index * FLOWER_DELAY);

        }
    );


    const lastFlowerCreation =
        (
            TOTAL_FLOWERS - 1
        ) *
        FLOWER_DELAY;

    const maximumFall =
        MAX_FALL * 1000;

    const totalWait =
        lastFlowerCreation +
        maximumFall +
        HOLD_BEFORE_SPLIT;


    console.log(
        "Flower split in:",
        totalWait,
        "ms"
    );


    setTimeout(() => {

        forceFlowerSplit();

    }, totalWait);

}


/* =========================================================
   CREATE FLOWER
========================================================= */

function createFlower(
    row,
    col
) {

    if (!flowerField) {
        return;
    }

    const flower =
        document.createElement("img");


    const randomIndex =
        Math.floor(
            Math.random() *
            flowerImages.length
        );

    flower.src =
        flowerImages[randomIndex];

    flower.className =
        "falling-flower falling";

    flower.alt = "";
    flower.draggable = false;


    const cellWidth =
        100 / COLUMNS;

    const cellHeight =
        100 / ROWS;


    const left =
        (
            col * cellWidth
        ) +
        (
            cellWidth / 2
        );


    const top =
        (
            row * cellHeight
        ) +
        (
            cellHeight / 2
        );


    flower.style.setProperty(
        "--flower-left",
        `${left}vw`
    );

    flower.style.setProperty(
        "--flower-final-top",
        `${top}vh`
    );


    const size =
        180 +
        Math.random() * 80;

    flower.style.setProperty(
        "--flower-size",
        `${size}px`
    );


    const rotation =
        -14 +
        Math.random() * 28;

    flower.style.setProperty(
        "--flower-rotation",
        `${rotation}deg`
    );


    const drift =
        -18 +
        Math.random() * 36;

    flower.style.setProperty(
        "--flower-drift",
        `${drift}px`
    );


    const scale =
        0.90 +
        Math.random() * 0.25;

    flower.style.setProperty(
        "--flower-scale",
        scale
    );


    const duration =
        MIN_FALL +
        Math.random() *
        (
            MAX_FALL -
            MIN_FALL
        );

    flower.style.setProperty(
        "--flower-duration",
        `${duration}s`
    );


    const floatX =
        1.5 +
        Math.random() * 3;

    const floatY =
        1.5 +
        Math.random() * 3;

    const floatRotate =
        0.4 +
        Math.random() * 1;

    const floatDuration =
        18 +
        Math.random() * 8;


    flower.style.setProperty(
        "--float-x",
        `${floatX}px`
    );

    flower.style.setProperty(
        "--float-y",
        `${floatY}px`
    );

    flower.style.setProperty(
        "--float-rotate",
        `${floatRotate}deg`
    );

    flower.style.setProperty(
        "--float-duration",
        `${floatDuration}s`
    );


    if (left < 50) {

        flower.dataset.side =
            "left";

        flower.classList.add(
            "split-left"
        );

    } else {

        flower.dataset.side =
            "right";

        flower.classList.add(
            "split-right"
        );

    }


    flowerField.appendChild(
        flower
    );

}


/* =========================================================
   FORCE FLOWER SPLIT
========================================================= */

function forceFlowerSplit() {

    if (splitStarted) {
        return;
    }

    if (
        !flowerField ||
        !flowerScreen
    ) {
        return;
    }

    splitStarted = true;


    const flowers =
        Array.from(
            flowerField.querySelectorAll(
                ".falling-flower"
            )
        );


    if (
        flowers.length === 0
    ) {

        splitStarted = false;

        return;
    }


    console.log(
        "Flower split started:",
        flowers.length
    );


    const frozenFlowers = [];


    flowers.forEach(
        (flower) => {

            const rect =
                flower.getBoundingClientRect();

            frozenFlowers.push({

                flower,

                left:
                    rect.left,

                top:
                    rect.top,

                width:
                    rect.width,

                height:
                    rect.height,

                side:
                    flower.dataset.side

            });

        }
    );


    frozenFlowers.forEach(
        (item) => {

            const flower =
                item.flower;


            flower.style.setProperty(
                "animation",
                "none",
                "important"
            );

            flower.style.setProperty(
                "position",
                "fixed",
                "important"
            );

            flower.style.setProperty(
                "left",
                `${item.left}px`,
                "important"
            );

            flower.style.setProperty(
                "top",
                `${item.top}px`,
                "important"
            );

            flower.style.setProperty(
                "width",
                `${item.width}px`,
                "important"
            );

            flower.style.setProperty(
                "height",
                `${item.height}px`,
                "important"
            );

            flower.style.setProperty(
                "margin",
                "0",
                "important"
            );

            flower.style.setProperty(
                "opacity",
                "1",
                "important"
            );

            flower.classList.remove(
                "falling"
            );

            flower.classList.remove(
                "floating"
            );

            flower.style.setProperty(
                "transform",
                "none",
                "important"
            );

            flower.style.setProperty(
                "transition",
                "none",
                "important"
            );

        }
    );


    void flowerScreen.offsetWidth;
    void flowerField.offsetWidth;


    flowerScreen.classList.add(
        "splitting"
    );


    requestAnimationFrame(() => {

        requestAnimationFrame(() => {

            frozenFlowers.forEach(
                (item) => {

                    const flower =
                        item.flower;


                    flower.style.setProperty(
                        "transition",
                        `transform ${SPLIT_DURATION}ms cubic-bezier(.22,1,.36,1)`,
                        "important"
                    );


                    if (
                        item.side === "left"
                    ) {

                        flower.style.setProperty(
                            "transform",
                            `translateX(-${SPLIT_DISTANCE}vw)`,
                            "important"
                        );

                    } else {

                        flower.style.setProperty(
                            "transform",
                            `translateX(${SPLIT_DISTANCE}vw)`,
                            "important"
                        );

                    }

                }
            );

        });

    });


    setTimeout(() => {

        showSecondPage();


        setTimeout(() => {

            flowerScreen.classList.remove(
                "active"
            );

            flowerScreen.classList.remove(
                "splitting"
            );

            flowerField.innerHTML = "";

        }, 350);

    }, SPLIT_DURATION);

}


/* =========================================================
   SHOW SECOND PAGE
========================================================= */

function showSecondPage() {

    if (!nextPage) {
        return;
    }

    document.body.classList.add(
        "scroll-enabled"
    );

    nextPage.classList.add(
        "show"
    );

    startSecondPageSequence();

}


/* =========================================================
   SECOND PAGE SEQUENCE
========================================================= */

function startSecondPageSequence() {

    if (secondPageStarted) {
        return;
    }

    secondPageStarted = true;


    const title =
        nextPage.querySelector("h1");

    const paragraphs =
        nextPage.querySelectorAll("p");

    const firstText =
        paragraphs[0] || null;

    const secondText =
        paragraphs[1] || null;

    const couple =
        nextPage.querySelector(
            ".romantic-couplesimg"
        );


    createCornerRose();


    if (title) {

        title.style.setProperty(
            "animation",
            "none",
            "important"
        );

        title.style.setProperty(
            "opacity",
            "0",
            "important"
        );

        title.style.setProperty(
            "transform",
            "translateY(25px)",
            "important"
        );

    }


    if (firstText) {

        firstText.style.setProperty(
            "animation",
            "none",
            "important"
        );

        firstText.style.setProperty(
            "opacity",
            "0",
            "important"
        );

        firstText.style.setProperty(
            "transform",
            "translateY(18px)",
            "important"
        );

    }


    if (secondText) {

        secondText.style.setProperty(
            "animation",
            "none",
            "important"
        );

        secondText.style.setProperty(
            "opacity",
            "0",
            "important"
        );

        secondText.style.setProperty(
            "transform",
            "translateY(18px)",
            "important"
        );

    }


    if (couple) {

        couple.style.setProperty(
            "animation",
            "none",
            "important"
        );

        couple.style.setProperty(
            "opacity",
            "0",
            "important"
        );

        couple.style.setProperty(
            "transform",
            "translateY(30px) scale(.94)",
            "important"
        );

        couple.style.setProperty(
            "transition",
            "none",
            "important"
        );

    }


    if (cornerRose) {

        cornerRose.style.setProperty(
            "animation",
            "none",
            "important"
        );

        cornerRose.style.setProperty(
            "opacity",
            "0",
            "important"
        );

        cornerRose.style.setProperty(
            "transform",
            "translate(-30px,-25px) rotate(-8deg) scale(.9)",
            "important"
        );

    }


    /* STEP 1 */

    setTimeout(() => {

        if (cornerRose) {

            cornerRose.style.setProperty(
                "display",
                "block",
                "important"
            );

            cornerRose.style.setProperty(
                "transition",
                "opacity .8s ease, transform .8s cubic-bezier(.22,1,.36,1)",
                "important"
            );

            cornerRose.style.setProperty(
                "opacity",
                "1",
                "important"
            );

            cornerRose.style.setProperty(
                "transform",
                "translate(0,0) rotate(0deg) scale(1)",
                "important"
            );


            setTimeout(() => {

                cornerRose.style.removeProperty(
                    "animation"
                );

                cornerRose.style.removeProperty(
                    "transform"
                );

                cornerRose.style.removeProperty(
                    "transition"
                );

                cornerRose.classList.add(
                    "rose-visible"
                );

            }, 850);

        }


        startHeartFlow();

    }, 250);


    /* STEP 2 */

    setTimeout(() => {

        if (title) {

            title.style.setProperty(
                "transition",
                "opacity .6s ease, transform .6s cubic-bezier(.22,1,.36,1)",
                "important"
            );

            title.style.setProperty(
                "opacity",
                "1",
                "important"
            );

            title.style.setProperty(
                "transform",
                "translateY(0)",
                "important"
            );

        }

    }, 450);


    /* STEP 3 */

    setTimeout(() => {

        if (firstText) {

            firstText.style.setProperty(
                "transition",
                "opacity .6s ease, transform .6s cubic-bezier(.22,1,.36,1)",
                "important"
            );

            firstText.style.setProperty(
                "opacity",
                "1",
                "important"
            );

            firstText.style.setProperty(
                "transform",
                "translateY(0)",
                "important"
            );

        }

    }, 750);


    /* STEP 4 */

    setTimeout(() => {

        if (couple) {

            couple.style.setProperty(
                "transition",
                "opacity .8s ease, transform .8s cubic-bezier(.22,1,.36,1)",
                "important"
            );

            couple.style.setProperty(
                "opacity",
                "1",
                "important"
            );

            couple.style.setProperty(
                "transform",
                "translateY(0) scale(1)",
                "important"
            );

        }

    }, 1050);


    /* STEP 5 */

    setTimeout(() => {

        if (secondText) {

            secondText.style.setProperty(
                "transition",
                "opacity .6s ease, transform .6s cubic-bezier(.22,1,.36,1)",
                "important"
            );

            secondText.style.setProperty(
                "opacity",
                "1",
                "important"
            );

            secondText.style.setProperty(
                "transform",
                "translateY(0)",
                "important"
            );

        }

    }, 1600);

}


/* =========================================================
   CREATE SMALL RED HEART
========================================================= */

function createFlowHeart() {

    if (!heartFlow) {
        return;
    }

    const heart =
        document.createElement("span");

    heart.className =
        "flow-heart";

    heart.textContent =
        "♥";

    heart.style.color =
        "#a61b2b";


    const size =
        7 +
        Math.random() * 8;

    heart.style.setProperty(
        "--heart-size",
        `${size}px`
    );


    const left =
        Math.random() * 100;

    heart.style.setProperty(
        "--heart-left",
        `${left}%`
    );


    const x1 =
        -25 +
        Math.random() * 50;

    const x2 =
        -45 +
        Math.random() * 90;

    const x3 =
        -55 +
        Math.random() * 110;

    const x4 =
        -70 +
        Math.random() * 140;


    heart.style.setProperty(
        "--heart-x1",
        `${x1}px`
    );

    heart.style.setProperty(
        "--heart-x2",
        `${x2}px`
    );

    heart.style.setProperty(
        "--heart-x3",
        `${x3}px`
    );

    heart.style.setProperty(
        "--heart-x4",
        `${x4}px`
    );


    const duration =
        8 +
        Math.random() * 6;

    heart.style.setProperty(
        "--heart-duration",
        `${duration}s`
    );


    heart.style.animationDelay =
        `${Math.random() * 1.5}s`;


    heartFlow.appendChild(
        heart
    );


    setTimeout(() => {

        heart.remove();

    }, (duration + 4) * 1000);

}


/* =========================================================
   START HEART FLOW
========================================================= */

function startHeartFlow() {

    if (!heartFlow) {
        return;
    }

    if (heartFlowStarted) {
        return;
    }

    heartFlowStarted = true;


    console.log(
        "❤️ Heart flow started"
    );


    for (
        let i = 0;
        i < 30;
        i++
    ) {

        setTimeout(() => {

            createFlowHeart();

        }, i * 70);

    }


    heartInterval =
        setInterval(() => {

            createFlowHeart();

        }, 350);

}


/* =========================================================
   GIFT CLICK
========================================================= */

if (giftHit) {

    giftHit.addEventListener(
        "click",
        openGift
    );

}


/* =========================================================
   GIFT IMAGE CLICK
========================================================= */

if (gift) {

    gift.addEventListener(
        "click",
        (event) => {

            event.stopPropagation();

            openGift();

        }
    );

}


/* =========================================================
   GIFT KEYBOARD
========================================================= */

if (giftHit) {

    giftHit.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                event.preventDefault();

                openGift();

            }

        }
    );

}


/* =========================================================
   DEBUG
========================================================= */

console.log(
    "======================================"
);

console.log(
    "ROMANTIC WEBSITE READY ❤️"
);

console.log(
    "Flowers:",
    TOTAL_FLOWERS
);

console.log(
    "Flower Grid:",
    `${COLUMNS} × ${ROWS}`
);

console.log(
    "Split:",
    `${SPLIT_DURATION}ms`
);

console.log(
    "Dry Rose + Hearts:",
    "SAME TIME"
);

console.log(
    "Initial Hearts:",
    30
);

console.log(
    "Heart Interval:",
    "350ms"
);

console.log(
    "======================================"
);


/* =========================================================
   THIRD PAGE REVEAL
========================================================= */

const thirdPage =
    document.getElementById("thirdPage");

if (thirdPage) {

    const observer =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(
                    (entry) => {

                        if (
                            entry.isIntersecting
                        ) {

                            thirdPage.classList.add(
                                "visible"
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.3
            }
        );


    observer.observe(
        thirdPage
    );

}


/* =========================================================
   REALISTIC HEART - SCROLL DIRECTION
========================================================= */

const realisticHeart =
    document.getElementById(
        "realisticHeart"
    );

const heartLine =
    document.querySelector(
        ".heart-line"
    );

let lastScrollPosition =
    nextPage ? nextPage.scrollTop : 0;

let heartScrollTicking = false;


function updateHeartOnScroll() {

    if (!realisticHeart) {
        return;
    }

    const currentScroll =
        nextPage ? nextPage.scrollTop : 0;

    const scrollingDown =
        currentScroll >
        lastScrollPosition;


    if (scrollingDown) {

        realisticHeart.classList.add(
            "heart-visible"
        );

        heartLine?.classList.add(
            "heart-visible"
        );

    }


    if (!scrollingDown) {

        realisticHeart.classList.remove(
            "heart-visible"
        );

        heartLine?.classList.remove(
            "heart-visible"
        );

    }


    lastScrollPosition =
        currentScroll;

    heartScrollTicking = false;

}


nextPage?.addEventListener(
    "scroll",
    () => {

        if (!heartScrollTicking) {

            window.requestAnimationFrame(
                updateHeartOnScroll
            );

            heartScrollTicking = true;

        }

    },
    {
        passive: true
    }
);


/* =========================================================
   HEART LOCK → PIN PAGE
   ========================================================= */

const heartLockButton =
    document.getElementById("heartLockButton");

const heartLockPage =
    document.getElementById("heartLockPage");

const CORRECT_PIN = "1234";

let enteredPin = "";

const pinDisplay =
    document.getElementById("pinDisplay");

const pinMessage =
    document.getElementById("pinMessage");

const pinClearBtn =
    document.getElementById("pinClear");

const pinEnterBtn =
    document.getElementById("pinEnter");


/* =========================================================
   OPEN PIN PAGE
   ========================================================= */

if (heartLockButton && heartLockPage) {

    heartLockButton.addEventListener(
        "click",
        function (event) {

            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();

            console.log("❤️ HEART LOCK CLICKED");

            document.body.style.setProperty(
                "overflow",
                "hidden",
                "important"
            );

            /* Hide previous pages */

            document.getElementById("page")
                ?.style.setProperty(
                    "display",
                    "none",
                    "important"
                );

            document.getElementById("flowerScreen")
                ?.style.setProperty(
                    "display",
                    "none",
                    "important"
                );

            document.getElementById("nextPage")
                ?.style.setProperty(
                    "display",
                    "none",
                    "important"
                );

            /* Reset PIN */

            enteredPin = "";

            updatePinDisplay();

            if (pinMessage) {
                pinMessage.textContent = "";
            }

            /* Show PIN page */

            heartLockPage.style.setProperty(
                "display",
                "flex",
                "important"
            );

            console.log(
                "🔐 PIN PAGE OPENED"
            );

        },
        true
    );
}


/* =========================================================
   PIN DISPLAY
   ========================================================= */

function updatePinDisplay() {

    const dots =
        document.querySelectorAll(
            "#pinDots span"
        );

    if (dots.length) {

        dots.forEach(
            function (dot, index) {

                dot.classList.toggle(
                    "filled",
                    index < enteredPin.length
                );

            }
        );

    } else if (pinDisplay) {

        pinDisplay.textContent =
            "•".repeat(
                enteredPin.length
            );

    }

}


/* =========================================================
   CLEAR PIN
   ========================================================= */

function clearPin() {

    enteredPin = "";

    updatePinDisplay();

    if (pinMessage) {
        pinMessage.textContent = "";
    }

}


/* =========================================================
   WRONG PIN
   ========================================================= */

function wrongPin() {

    console.warn(
        "❌ WRONG PIN"
    );

    if (pinMessage) {

        pinMessage.textContent =
            "Wrong Passkey 💔";

    }

    if (heartLockPage) {

        heartLockPage.classList.add(
            "pin-error"
        );

        setTimeout(
            function () {

                heartLockPage.classList.remove(
                    "pin-error"
                );

                clearPin();

            },
            900
        );

    } else {

        clearPin();

    }

}


/* =========================================================
   CORRECT PIN
   ========================================================= */

function submitPin() {

    if (
        enteredPin.length !==
        CORRECT_PIN.length
    ) {
        return;
    }


    /* WRONG */

    if (
        enteredPin !== CORRECT_PIN
    ) {

        wrongPin();

        return;
    }


    /* CORRECT */

    console.log(
        "✅ CORRECT PIN"
    );


    if (pinMessage) {

        pinMessage.textContent =
            "Unlocked ❤️";

    }


    if (heartLockPage) {

        heartLockPage.classList.add(
            "pin-unlocked"
        );

    }


    /* Open next page */

    setTimeout(
        function () {

            if (heartLockPage) {

                heartLockPage.style.setProperty(
                    "display",
                    "none",
                    "important"
                );

            }


            document.body.style.removeProperty(
                "overflow"
            );


            /* Reset previous forced display */

            document.getElementById("page")
                ?.style.removeProperty(
                    "display"
                );

            document.getElementById("flowerScreen")
                ?.style.removeProperty(
                    "display"
                );

            document.getElementById("nextPage")
                ?.style.removeProperty(
                    "display"
                );


            /* Open THIRD PAGE */

            if (thirdPage) {

                thirdPage.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

                thirdPage.classList.add(
                    "visible"
                );

                console.log(
                    "❤️ THIRD PAGE OPENED"
                );

            } else {

                console.warn(
                    "⚠️ thirdPage not found"
                );

            }

            enteredPin = "";

            updatePinDisplay();

        },
        1000
    );

}


/* =========================================================
   NUMBER KEYS
   ========================================================= */

document
    .querySelectorAll(
        ".pin-key[data-digit]"
    )
    .forEach(
        function (key) {

            key.addEventListener(
                "click",
                function () {

                    if (
                        enteredPin.length >=
                        CORRECT_PIN.length
                    ) {
                        return;
                    }


                    const digit =
                        key.getAttribute(
                            "data-digit"
                        );


                    enteredPin += digit;

                    updatePinDisplay();


                    /* AUTO SUBMIT AFTER 4 DIGITS */

                    if (
                        enteredPin.length === 4
                    ) {

                        setTimeout(
                            function () {

                                submitPin();

                            },
                            300
                        );

                    }

                }
            );

        }
    );


/* =========================================================
   CLEAR BUTTON
   ========================================================= */

if (pinClearBtn) {

    pinClearBtn.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            clearPin();

        }
    );

}


/* =========================================================
   ENTER BUTTON
   ========================================================= */

if (pinEnterBtn) {

    pinEnterBtn.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            submitPin();

        }
    );

}


/* =========================================================
   KEYBOARD PIN SUPPORT
   ========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            !heartLockPage ||
            heartLockPage.style.display === "none"
        ) {
            return;
        }


        /* Number */

        if (
            /^[0-9]$/.test(
                event.key
            )
        ) {

            if (
                enteredPin.length <
                CORRECT_PIN.length
            ) {

                enteredPin += event.key;

                updatePinDisplay();


                if (
                    enteredPin.length === 4
                ) {

                    setTimeout(
                        submitPin,
                        300
                    );

                }

            }

            return;
        }


        /* Backspace */

        if (
            event.key === "Backspace"
        ) {

            enteredPin =
                enteredPin.slice(
                    0,
                    -1
                );

            updatePinDisplay();

            return;
        }


        /* Enter */

        if (
            event.key === "Enter"
        ) {

            submitPin();

            return;
        }


        /* Escape */

        if (
            event.key === "Escape"
        ) {

            clearPin();

        }

    }
);


/* =========================================================
   DEBUG
   ========================================================= */

console.log(
    "🔐 HEART LOCK SYSTEM READY"
);

console.log(
    "🔑 Correct PIN: 1234"
);

/* =========================================================
   FINAL FLOW
   PIN → LOADING → NEW GALLERY
========================================================= */

function submitPin() {

    if (enteredPin.length !== 4) {
        return;
    }


    /* WRONG PIN */

    if (enteredPin !== CORRECT_PIN) {

        console.log("❌ WRONG PIN");

        if (pinMessage) {
            pinMessage.textContent =
                "Wrong Passkey 💔";
        }

        heartLockPage?.classList.add(
            "pin-error"
        );

        setTimeout(() => {

            heartLockPage?.classList.remove(
                "pin-error"
            );

            clearPin();

        }, 900);

        return;
    }


    /* CORRECT PIN */

    console.log("✅ CORRECT PIN");


    if (pinMessage) {
        pinMessage.textContent =
            "Unlocked ❤️";
    }


    heartLockPage?.classList.add(
        "pin-unlocked"
    );


    /* -----------------------------------------
       AFTER 800ms → LOADING
    ----------------------------------------- */

    setTimeout(() => {

        /* Hide PIN */

        if (heartLockPage) {
            heartLockPage.style.setProperty(
                "display",
                "none",
                "important"
            );
        }


        /* Hide previous pages */

        document.getElementById("page")
            ?.style.setProperty(
                "display",
                "none",
                "important"
            );

        document.getElementById("nextPage")
            ?.style.setProperty(
                "display",
                "none",
                "important"
            );


        /* Show Loading */

        const loadingScreen =
            document.getElementById(
                "loadingScreen"
            );

        if (loadingScreen) {

            loadingScreen.style.setProperty(
                "display",
                "flex",
                "important"
            );

            requestAnimationFrame(() => {

                loadingScreen.classList.add(
                    "active"
                );

            });

        }


        console.log(
            "🌸 LOADING STARTED"
        );


        /* -----------------------------------------
           LOADING 3 SECONDS
        ----------------------------------------- */

        setTimeout(() => {

            /* Hide Loading */

            if (loadingScreen) {

                loadingScreen.classList.remove(
                    "active"
                );

                loadingScreen.style.setProperty(
                    "display",
                    "none",
                    "important"
                );

            }


            /* -----------------------------------------
               OPEN NEW GALLERY
            ----------------------------------------- */

            const newLovePage =
                document.getElementById(
                    "newLovePage"
                );

            if (newLovePage) {

                newLovePage.style.setProperty(
                    "display",
                    "block",
                    "important"
                );

                requestAnimationFrame(() => {

                    newLovePage.classList.add(
                        "active"
                    );

                });

            }


            document.body.style.overflow =
                "hidden";


            console.log(
                "🖼️ NEW GALLERY OPENED"
            );

            // -----------------------------------------------------
            // BACK BUTTON HANDLER
            // When the user clicks the gallery back button, hide the
            // new gallery page and show the heart lock (pin) page.
            // -----------------------------------------------------
            const galleryBack = document.getElementById("galleryBack");
            if (galleryBack) {
                galleryBack.addEventListener("click", function (event) {
                    event.preventDefault();
                    // Hide the new gallery page
                    if (newLovePage) {
                        newLovePage.classList.remove("active");
                        newLovePage.style.setProperty(
                            "display",
                            "none",
                            "important"
                        );
                    }
                    // Show the heart lock (pin) page if it exists
                    if (heartLockPage) {
                        heartLockPage.style.setProperty(
                            "display",
                            "flex",
                            "important"
                        );
                        heartLockPage.classList.add("active");
                    }
                    // Restore overflow handling (keep hidden overflow as before)
                    document.body.style.overflow = "hidden";
                });
            }


        }, 3000);


    }, 800);

}

/* =========================================
   💌 LOVE LETTER TYPEWRITER
========================================= */

(function () {

    const page = document.getElementById("newLovePage");
    const text = document.getElementById("letterText");
    const caret = document.querySelector(".letter-caret");

    if (!page || !text) return;

    const letter = `To My papa❤️,

Sep 19, 2019… andha naal unna first time paatha moment innum en mind-la apdiye irukku. Unna paatha odane enakku oru feeling vandhuchu — “I need her.” Avlo dhaan. Andha oru feeling ippo varaikkum en kooda irukku.
Un caring, un eyes, un voice, un character, un attitude… ellame enakku romba special. Aana un eyes-ku mattum oru thani place irukku. Un eyes-a paakumbodhu, enakku unna apdiye paathutte irukkanum pola thonum. ❤️
Papuuu, nee en kooda irukkumbodhu naan oru chinna paiyan madhiri happy-aa iruppen. Namma happy moments mattum illa, fights, problems, kastam ellame share pannirukkom. Adhanala nee enakku just oru person illa… en life-la ellathayum share panna mudiyura person.
Ammu-kku kashtam vandha, “enna aachu?” nu nee ketkura. Enakku problem irundha support pannura. Enkitta amount illa na kooda, nee unakku mudinja alavukku help pannura. Appo dhaan enakku oru feeling romba strong-aa vandhuchu…
“Enakkaga ivlo panra oru person-a naan life-la eppavume lose panna koodadhu.” ❤️
Papuuu, future-la enna nadandhaalum, evlo kashtam vandhaalum, ippo mattum illa future-layum naan un kooda dhaan iruppen. Own house, own car, bike ellam irukkattum… enakku biggest wish onnu dhaan — nee kastapadama happy-aa, jolly-aa un life-a enjoy pannanum.
Nee en kooda irukkumbodhu, “naan safe place-la irukken, safe hands-la irukken” nu feel pannanum. Unakku edhavadhu worry irundha, adha thaniya carry panna vendam. Naan irukken. Unna support panna naan irukken. Unna badhramaa paathukka naan irukken. ❤️
Papuuu… life eppadi ponaalum, days easy-aa irundhaalum difficult-aa irundhaalum, naan un side-la iruppen. Un happiness enakku romba mukkiyam. Nee happy-aa irundha, adhuve enakku podhum.
Thank you, Papuuu… en life-la vandhadhukku. Enna support pannadhukku. En kooda irundhadhukku. ❤️
Evalo kashtam vandhaalum, naan un kooda iruppen. Nee happy-aa iru, jolly-aa iru. Un life-a enjoy pannu. Kavala padadha… edhu vandhaalum seekrama seri aagidum. Unna naan badhramaa paathuppen, seriyaa Papa? ❤️

Love u sooooooo much, Papuuu ❤️🥹🫶

Thank you for being a beautiful part of my life.And if I could choose again, I would still choose you.

Always.

With all my heart,Your forever. ♡`;

    let timer = null;
    let started = false;

    function typeLetter() {

        if (started) return;

        started = true;

        text.textContent = "";

        if (caret) {
            caret.style.display = "inline-block";
        }

        let index = 0;

        timer = setInterval(() => {

            text.textContent += letter[index];

            index++;

            if (index >= letter.length) {

                clearInterval(timer);

                timer = null;

                if (caret) {
                    caret.style.display = "none";
                }
            }

        }, 32);
    }


    const observer = new MutationObserver(() => {

        if (page.classList.contains("active")) {

            started = false;

            setTimeout(() => {
                typeLetter();
            }, 900);
        }

    });

    observer.observe(page, {
        attributes: true,
        attributeFilter: ["class"]
    });

})();

/* =========================================
   ❤️ RANDOM FLOATING HEARTS
========================================= */

(function createFloatingHearts() {

    const container =
        document.getElementById("floatingHearts");

    if (!container) return;


    const heartCount = 28;


    for (let i = 0; i < heartCount; i++) {

        const heart =
            document.createElement("span");

        heart.className = "floating-heart";


        /* Random heart size */

        const sizes = [
            "small",
            "medium",
            "large"
        ];

        const size =
            sizes[
                Math.floor(
                    Math.random() * sizes.length
                )
            ];

        heart.classList.add(size);


        /* Heart symbol */

        heart.textContent = "♥";


        /* Random position */

        heart.style.left =
            (Math.random() * 100) + "%";

        heart.style.top =
            (25 + Math.random() * 65) + "%";


        /* Random animation */

        heart.style.setProperty(
            "--duration",
            (6 + Math.random() * 7) + "s"
        );

        heart.style.setProperty(
            "--delay",
            (-Math.random() * 10) + "s"
        );


        container.appendChild(heart);
    }

})();