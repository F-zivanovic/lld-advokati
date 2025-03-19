let hamburgerIcon = document.getElementById('hamburger');
let navList = document.getElementById('nav-list');
let hamburgerLines = hamburgerIcon.querySelectorAll('.nav__hamburger__line');
let navLinks = navList.querySelectorAll('.nav__link');

hamburgerIcon.addEventListener('click', openMobileMenu);

function openMobileMenu() {
    let isExpanded = hamburgerIcon.getAttribute('aria-expanded') === "true";

    // Animate hamburger
    hamburgerLines.forEach(item=>{item.classList.toggle('active');})
    navList.classList.toggle('active');
    hamburgerIcon.setAttribute('aria-expanded', !isExpanded);
}

// Close mobile menu on screen > 1200px
window.addEventListener('resize', () => {
    if (window.innerWidth > 1200) {
        navList.classList.remove('active');
        hamburgerLines.forEach(item=>{item.classList.remove('active');})
        hamburgerIcon.setAttribute('aria-expanded', "false");
    }
});

// Close mobile menu when click on nav link
navLinks.forEach(link=>{
    link.addEventListener('click', ()=>{
        navList.classList.remove('active');
        hamburgerLines.forEach(item=>{item.classList.remove('active');})
        hamburgerIcon.setAttribute('aria-expanded', "false");
    })
})