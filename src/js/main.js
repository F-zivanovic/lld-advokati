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

// Arrow up icon
const arrowUp = document.getElementById('arrow-up');

document.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    arrowUp.classList.add("active");
  } else {
    arrowUp.classList.remove("active");
  }
});

const scrollBtn = document.querySelector(".arrow__up");

scrollBtn.addEventListener("click", () => {
  window.scroll({ top: 0, behavior: "smooth" });
});


// Dynamic date
document.getElementById("year").textContent = new Date().getFullYear();


// Translation
function getCurrentLang() {

  let lang = localStorage.getItem("lang");
  if (!lang) {
    lang = "sr";
    localStorage.setItem("lang", lang);
  }
  return lang;
}

function setLang(lang) {
  localStorage.setItem("lang", lang);
  translatePage(lang);
}

function translatePage(lang) {
  const translations = {
    sr: {
      ...(window.pageTranslationsEvry?.sr || {}),
      ...(window.pageTranslations?.sr || {}),
      ...(window.pageTranslationsSide?.sr || {})
    },
    en: {
      ...(window.pageTranslationsEvry?.en || {}),
      ...(window.pageTranslations?.en || {}),
      ...(window.pageTranslationsSide?.en || {})
    }
  };


  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    const attr = el.getAttribute("data-i18n-attr"); 
    const translation = translations[lang][key];
  
    if (translation) {
      if (attr) {
        const attrs = attr.split(",").map(a => a.trim());
        console.log(attrs, translation);
          attrs.forEach(a => {
            if (a === "href") {
              el.setAttribute(a, translations[lang][key + "_href"]);
              el.textContent = translation;
            } else {
              el.setAttribute(a, translation)
            }
          });
      } else {
        el.textContent = translation;
      }
    }
  });

  // Lang btn switcher
  const langSwitcher = document.getElementById("langSwitcher");
  if (langSwitcher) langSwitcher.textContent = lang === "sr" ? "🇺🇸" : "🇷🇸";
}

document.addEventListener("DOMContentLoaded", () => {
  const currentLang = getCurrentLang();
  translatePage(currentLang);

  const langSwitcher = document.getElementById("langSwitcher");
  if (langSwitcher) {
    langSwitcher.addEventListener("click", () => {
      const newLang = getCurrentLang() === "sr" ? "en" : "sr";
      setLang(newLang);
    });
  }
});