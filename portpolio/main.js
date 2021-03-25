"use strict";

//naviber
const toggleBtn = document.querySelector(".navbar_toggleBtn");
const menu = document.querySelector(".main_menu");
const icons = document.querySelector(".icons");
const content = document.querySelector(".content");
const footer = document.querySelector("footer");
const footerInner = document.querySelector(".footer__inner");


//naviber
toggleBtn.addEventListener("click", () => {
    menu.classList.toggle("active");
    icons.classList.toggle("active");

    content.style.display = 'none';
    footer.style.position = 'absolute';
    footer.style.top = '400px';
    footerInner.style.margin = 'auto';
    footerInner.style.textAlign = 'center';
});


