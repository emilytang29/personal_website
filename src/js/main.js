/* Your JS here. */
console.log('Hello World!')

/**
 * this function handles resizing of (header && everything within header)
 */
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    const header_name = document.getElementById('header_name');
    const main = document.getElementById('main');
    const navbar = document.getElementById('navbar');
    // check where the scroll position is
    if (this.window.scrollY > 10) {
        header.style.height = '55px';
        header_name.style.fontSize = '25px';
        main.style.marginTop = '55px';
        navbar.style.fontSize = '15px';
    } else {
        header.style.height = '90px';
        header_name.style.fontSize = '35px';
        main.style.marginTop = '90px';
        navbar.style.fontSize = '25px';
    }
});

/**
 * this code deals with carousel viewing
 */
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
slides[1].style.display = 'none';
slides[2].style.display = 'none';
document.getElementById('carousel_next').addEventListener('click', showNextSlide);
document.getElementById('carousel_prev').addEventListener('click', showPrevSlide);

function showNextSlide() {
    slides[currentSlide].style.display = 'none';
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].style.display = 'flex';
}

function showPrevSlide() {
    slides[currentSlide].style.display = 'none';
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    slides[currentSlide].style.display = 'flex';
}


/**
 * this code deals with modals
 */
const modalOneButton = document.getElementById("modal_one_button");
const modalOne = document.getElementById("modal_one_modal");
const modalOneExitButton = document.getElementById("modal_one_exit_button");
modalOneButton.onclick = function() {
    modalOne.style.display = "flex";
}
modalOneExitButton.onclick = function() {
    modalOne.style.display = "none";
}

const modalTwoButton = document.getElementById("modal_two_button");
const modalTwo = document.getElementById("modal_two_modal");
const modalTwoExitButton = document.getElementById("modal_two_exit_button");
modalTwoButton.onclick = function() {
    modalTwo.style.display = "flex";
}
modalTwoExitButton.onclick = function() {
    modalTwo.style.display = "none";
}

const modalThreeButton = document.getElementById("modal_three_button");
const modalThree = document.getElementById("modal_three_modal");
const modalThreeExitButton = document.getElementById("modal_three_exit_button");
modalThreeButton.onclick = function() {
    modalThree.style.display = "flex";
}
modalThreeExitButton.onclick = function() {
    modalThree.style.display = "none";
}

/**
 * this code deals with navbar highlighting
 */
document.addEventListener("DOMContentLoaded", function() {
    const sections = document.querySelectorAll("main > div:not(#modal_one_modal):not(#modal_two_modal):not(#modal_three_modal)");
    const navLinks = document.querySelectorAll(".navbar .nav-link");
    const navbar = document.getElementById('navbar');
    let lastClickedID = null;

    function jumpToSection(e) {
        const link = e.target.closest('.nav-link');
        console.log(link);
        if (link) {
            e.preventDefault();
            const targetId = link.getAttribute("href").substring(1); 
            
            if (targetId == lastClickedID) {
                return;
            }
            
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                lastClickedID = targetId;
                const navbarHeight = navbar.offsetHeight
                const targetID = targetSection.getAttribute('id');
                const targetPos = targetSection.getBoundingClientRect().top + window.scrollY - navbarHeight;
                window.scrollTo({
                    top: targetPos,
                    behavior: "smooth"
                });
                highlightNav();
            }
        }
    }

    function highlightNav() {
        const navbarHeight = navbar.offsetHeight;
        let currentSection = "";

        if ((window.innerHeight + Math.round(window.scrollY)) >= document.body.offsetHeight) {
            currentSection = "footer";
        } else {
            sections.forEach((section) => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
    
                if (window.scrollY >= sectionTop - navbarHeight && window.scrollY < sectionTop + sectionHeight - navbarHeight) {
                    currentSection = section.getAttribute("id");
                }
            });
        }

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(currentSection)) {
                link.classList.add("active");
            }
        });

    }

    window.addEventListener('click', jumpToSection);
    window.addEventListener('scroll', highlightNav);

});
