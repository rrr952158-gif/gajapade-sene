/* =========================================================
   GAJAPADE WEBSITE JAVASCRIPT
   ========================================================= */


/* =========================================================
   LOADER
   ========================================================= */

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    setTimeout(() => {

        loader.classList.add("hide");

    }, 900);

});


/* =========================================================
   NAVBAR
   ========================================================= */

const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 40) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

});


/* =========================================================
   MOBILE MENU
   ========================================================= */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {

    navMenu.classList.toggle("open");

});


document.querySelectorAll("#navMenu a").forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("open");

    });

});


/* =========================================================
   SCROLL REVEAL
   ========================================================= */

const revealElements =
    document.querySelectorAll(".reveal");

const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("active");

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =========================================================
   CURRENT YEAR
   ========================================================= */

document.getElementById("year").textContent =
    new Date().getFullYear();


/* =========================================================
   HERO MOUSE MOVEMENT
   ========================================================= */

const hero = document.querySelector(".hero");
const heroLogo = document.querySelector(".hero-logo");

if (hero && heroLogo) {

    hero.addEventListener("mousemove", event => {

        const rect =
            hero.getBoundingClientRect();

        const x =
            (event.clientX - rect.left) /
            rect.width - 0.5;

        const y =
            (event.clientY - rect.top) /
            rect.height - 0.5;

        heroLogo.style.transform =
            `translate(${x * 8}px, ${y * 8}px)`;

    });


    hero.addEventListener("mouseleave", () => {

        heroLogo.style.transform =
            "translate(0,0)";

    });

}


/* =========================================================
   GALLERY LIGHTBOX
   ========================================================= */

const lightbox =
    document.getElementById("lightbox");

const lightboxImage =
    document.getElementById("lightboxImage");

const lightboxClose =
    document.getElementById("lightboxClose");


document.querySelectorAll(".gallery-item img")
    .forEach(image => {

        image.addEventListener("click", () => {

            lightboxImage.src =
                image.src;

            lightbox.classList.add("active");

            document.body.style.overflow =
                "hidden";

        });

    });


function closeLightbox() {

    lightbox.classList.remove("active");

    document.body.style.overflow =
        "";

}


lightboxClose.addEventListener(
    "click",
    closeLightbox
);


lightbox.addEventListener(
    "click",
    event => {

        if (event.target === lightbox) {

            closeLightbox();

        }

    }
);


document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            lightbox.classList.contains("active")
        ) {

            closeLightbox();

        }

    }
);


/* =========================================================
   BACKGROUND PARTICLES
   ========================================================= */

const particleCanvas =
    document.getElementById(
        "particleCanvas"
    );

const particleCtx =
    particleCanvas.getContext("2d");

let particles = [];

function resizeParticleCanvas() {

    particleCanvas.width =
        window.innerWidth;

    particleCanvas.height =
        window.innerHeight;

}

resizeParticleCanvas();

window.addEventListener(
    "resize",
    resizeParticleCanvas
);


function createParticles() {

    particles = [];

    const amount =
        Math.min(
            90,
            Math.floor(
                window.innerWidth / 15
            )
        );

    for (
        let i = 0;
        i < amount;
        i++
    ) {

        particles.push({

            x:
                Math.random() *
                particleCanvas.width,

            y:
                Math.random() *
                particleCanvas.height,

            radius:
                Math.random() * 1.2 + .2,

            speed:
                Math.random() * .25 + .05,

            opacity:
                Math.random() * .5 + .1

        });

    }

}

createParticles();


function animateParticles() {

    particleCtx.clearRect(
        0,
        0,
        particleCanvas.width,
        particleCanvas.height
    );

    particles.forEach(particle => {

        particle.y -=
            particle.speed;

        if (particle.y < -10) {

            particle.y =
                particleCanvas.height + 10;

            particle.x =
                Math.random() *
                particleCanvas.width;

        }

        particleCtx.beginPath();

        particleCtx.arc(
            particle.x,
            particle.y,
            particle.radius,
            0,
            Math.PI * 2
        );

        particleCtx.fillStyle =
            `rgba(214,174,85,${particle.opacity})`;

        particleCtx.fill();

    });

    requestAnimationFrame(
        animateParticles
    );

}

animateParticles();


/* =========================================================
   DEEPAVALI REALISTIC-STYLE FIREWORKS
   ========================================================= */

const fireworksCanvas =
    document.getElementById(
        "fireworksCanvas"
    );

if (fireworksCanvas) {

    const fireCtx =
        fireworksCanvas.getContext("2d");

    let fireworks = [];

    let fireParticles = [];

    let fireWidth = 0;
    let fireHeight = 0;


    /* -----------------------------------------
       RESIZE
       ----------------------------------------- */

    function resizeFireworks() {

        const rect =
            fireworksCanvas.parentElement
                .getBoundingClientRect();

        const dpr =
            Math.min(
                window.devicePixelRatio || 1,
                2
            );

        fireWidth =
            rect.width;

        fireHeight =
            rect.height;

        fireworksCanvas.width =
            rect.width * dpr;

        fireworksCanvas.height =
            rect.height * dpr;

        fireworksCanvas.style.width =
            rect.width + "px";

        fireworksCanvas.style.height =
            rect.height + "px";

        fireCtx.setTransform(
            dpr,
            0,
            0,
            dpr,
            0,
            0
        );

    }


    resizeFireworks();

    window.addEventListener(
        "resize",
        resizeFireworks
    );


    /* -----------------------------------------
       FIREWORK COLORS
       ----------------------------------------- */

    const fireColors = [
        "#f4d98a",
        "#d6ae55",
        "#fff1b8",
        "#e9bd62",
        "#ffffff"
    ];


    /* -----------------------------------------
       FIREWORK ROCKET
       ----------------------------------------- */

    class Rocket {

        constructor(
            x,
            targetY
        ) {

            this.x = x;

            this.y =
                fireHeight + 12;

            this.startX = x;

            this.targetY =
                targetY;

            this.speed =
                -(5 + Math.random() * 1.8);

            this.gravity =
                0.045;

            this.trail = [];

            this.exploded = false;

            this.color =
                fireColors[
                    Math.floor(
                        Math.random() *
                        fireColors.length
                    )
                ];

        }


        update() {

            this.trail.push({
                x: this.x,
                y: this.y
            });


            if (this.trail.length > 12) {

                this.trail.shift();

            }


            this.speed +=
                this.gravity;

            this.y +=
                this.speed;


            if (
                this.y <= this.targetY ||
                this.speed >= -0.8
            ) {

                this.explode();

                return true;

            }

            return false;

        }


        draw() {

            /*
             * Draw rocket trail
             */

            for (
                let i = 0;
                i < this.trail.length;
                i++
            ) {

                const point =
                    this.trail[i];

                const alpha =
                    i /
                    this.trail.length;

                fireCtx.beginPath();

                fireCtx.arc(
                    point.x,
                    point.y,
                    1.2,
                    0,
                    Math.PI * 2
                );

                fireCtx.fillStyle =
                    `rgba(244,217,138,${alpha * .35})`;

                fireCtx.fill();

            }


            /*
             * Main rocket
             */

            fireCtx.beginPath();

            fireCtx.arc(
                this.x,
                this.y,
                2.2,
                0,
                Math.PI * 2
            );

            fireCtx.fillStyle =
                this.color;

            fireCtx.shadowBlur = 12;

            fireCtx.shadowColor =
                this.color;

            fireCtx.fill();

            fireCtx.shadowBlur = 0;

        }


        explode() {

            const amount =
                45 +
                Math.floor(
                    Math.random() * 35
                );

            const angleOffset =
                Math.random() *
                Math.PI;

            for (
                let i = 0;
                i < amount;
                i++
            ) {

                const angle =
                    (
                        Math.PI * 2 * i
                    ) /
                    amount +
                    angleOffset;

                const speed =
                    1.5 +
                    Math.random() * 3.8;

                fireParticles.push(
                    new FireParticle(
                        this.x,
                        this.y,
                        angle,
                        speed,
                        this.color
                    )
                );

            }

        }

    }


    /* -----------------------------------------
       EXPLOSION PARTICLES
       ----------------------------------------- */

    class FireParticle {

        constructor(
            x,
            y,
            angle,
            speed,
            color
        ) {

            this.x = x;
            this.y = y;

            this.vx =
                Math.cos(angle) *
                speed;

            this.vy =
                Math.sin(angle) *
                speed;

            this.gravity =
                0.055;

            this.friction =
                0.982;

            this.life = 1;

            this.decay =
                0.012 +
                Math.random() * 0.009;

            this.radius =
                1 +
                Math.random() * 1.5;

            this.color =
                color;

            this.trail = [];

        }


        update() {

            this.trail.push({
                x: this.x,
                y: this.y
            });


            if (this.trail.length > 5) {

                this.trail.shift();

            }


            this.vx *=
                this.friction;

            this.vy *=
                this.friction;

            this.vy +=
                this.gravity;

            this.x +=
                this.vx;

            this.y +=
                this.vy;

            this.life -=
                this.decay;

        }


        draw() {

            /*
             * Particle trail
             */

            for (
                let i = 0;
                i < this.trail.length;
                i++
            ) {

                const point =
                    this.trail[i];

                const alpha =
                    (
                        i /
                        this.trail.length
                    ) *
                    this.life *
                    .4;

                fireCtx.beginPath();

                fireCtx.arc(
                    point.x,
                    point.y,
                    this.radius * .65,
                    0,
                    Math.PI * 2
                );

                fireCtx.fillStyle =
                    hexToRgba(
                        this.color,
                        alpha
                    );

                fireCtx.fill();

            }


            /*
             * Main particle
             */

            fireCtx.beginPath();

            fireCtx.arc(
                this.x,
                this.y,
                this.radius,
                0,
                Math.PI * 2
            );

            fireCtx.fillStyle =
                hexToRgba(
                    this.color,
                    this.life
                );

            fireCtx.shadowBlur =
                8;

            fireCtx.shadowColor =
                this.color;

            fireCtx.fill();

            fireCtx.shadowBlur =
                0;

        }

    }


    /* -----------------------------------------
       HEX TO RGBA
       ----------------------------------------- */

    function hexToRgba(
        hex,
        alpha
    ) {

        const clean =
            hex.replace("#","");

        const r =
            parseInt(
                clean.substring(0,2),
                16
            );

        const g =
            parseInt(
                clean.substring(2,4),
                16
            );

        const b =
            parseInt(
                clean.substring(4,6),
                16
            );

        return `
            rgba(
                ${r},
                ${g},
                ${b},
                ${alpha}
            )
        `;

    }


    /* -----------------------------------------
       LAUNCH FIREWORK
       ----------------------------------------- */

    function launchFirework() {

        if (fireWidth <= 0) {
            return;
        }

        const x =
            fireWidth *
            (
                .15 +
                Math.random() * .70
            );

        const targetY =
            fireHeight *
            (
                .15 +
                Math.random() * .30
            );

        fireworks.push(
            new Rocket(
                x,
                targetY
            )
        );

    }


    /* -----------------------------------------
       FIREWORK ANIMATION
       ----------------------------------------- */

    function animateFireworks() {

        fireCtx.fillStyle =
            "rgba(5,5,9,.18)";

        fireCtx.fillRect(
            0,
            0,
            fireWidth,
            fireHeight
        );


        /*
         * Rockets
         */

        for (
            let i = fireworks.length - 1;
            i >= 0;
            i--
        ) {

            const rocket =
                fireworks[i];

            const exploded =
                rocket.update();

            rocket.draw();

            if (exploded) {

                fireworks.splice(
                    i,
                    1
                );

            }

        }


        /*
         * Explosion particles
         */

        for (
            let i =
                fireParticles.length - 1;
            i >= 0;
            i--
        ) {

            const particle =
                fireParticles[i];

            particle.update();

            particle.draw();

            if (
                particle.life <= 0
            ) {

                fireParticles.splice(
                    i,
                    1
                );

            }

        }


        requestAnimationFrame(
            animateFireworks
        );

    }


    /* -----------------------------------------
       START
       ----------------------------------------- */

    animateFireworks();


    /*
     * First launch
     */

    setTimeout(
        launchFirework,
        600
    );


    /*
     * Keep launching fireworks
     */

    setInterval(() => {

        launchFirework();

        /*
         * Sometimes launch a second
         * firework shortly after.
         */

        if (
            Math.random() > .55
        ) {

            setTimeout(
                launchFirework,
                350 +
                Math.random() * 500
            );

        }

    }, 1400);

}


/* =========================================================
   FESTIVAL CARD DEPTH
   ========================================================= */

document
    .querySelectorAll(".festival-card")
    .forEach(card => {

        card.addEventListener(
            "mouseenter",
            () => {

                card.style.zIndex = "10";

            }
        );

        card.addEventListener(
            "mouseleave",
            () => {

                card.style.zIndex = "";

            }
        );

    });


/* =========================================================
   INTERNAL LINK SMOOTH SCROLL
   ========================================================= */

document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const target =
                    document.querySelector(
                        link.getAttribute("href")
                    );

                if (!target) {
                    return;
                }

                event.preventDefault();

                const navbarHeight =
                    navbar.offsetHeight;

                const position =
                    target.offsetTop -
                    navbarHeight;

                window.scrollTo({
                    top: position,
                    behavior: "smooth"
                });

            }
        );

    });


/* =========================================================
   IMAGE ERROR CHECK
   ========================================================= */

document
    .querySelectorAll("img")
    .forEach(image => {

        image.addEventListener(
            "error",
            () => {

                console.warn(
                    "Image not found:",
                    image.src
                );

            }
        );

    });


/* =========================================================
   CONSOLE
   ========================================================= */

console.log(
    "%c GAJAPADE ",
    "background:#050505;color:#f4d98a;font-size:20px;padding:10px;"
);

console.log(
    "%c ---- NAZARBAD ---- ",
    "color:#d6ae55;font-size:12px;"
);