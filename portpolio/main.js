"use strict";

/*nav*/
//반응형 메뉴 만들기
const toggleBtn = document.querySelector(".navbar_toggleBtn");
const menu = document.querySelector(".main_menu");
const icons = document.querySelector(".icons");

//manu
const menuIntroduction = document.querySelector(".menu_Introduction");
const document_first = document.querySelector(".document_first");
const menuSkills = document.querySelector(".menu_Skills");
const document_second = document.querySelector(".document_second");
const menuProjects = document.querySelector(".menu_Projects");
const projects = document.querySelector(".projects");
const menuFooter = document.querySelector(".menu_footer");
const container = document.querySelector(".container");

/*nav*/
//마우스 이벤트 함수를 통해서 active상태에서 실행할 토글 함수 만들어주기
toggleBtn.addEventListener("click", () => {
  menu.classList.toggle("active");
  icons.classList.toggle("active");
}); //toggleBtn이 click될때마다 active 클래스를 토글할 것

//메뉴를 누르면 해당 페이지로 이동
menuIntroduction.addEventListener("click", () => {
  document_first.scrollIntoView({ behavior: "smooth", block: "start" });
});
menuSkills.addEventListener("click", () => {
  document_second.scrollIntoView({ behavior: "smooth", block: "start" });
});
menuProjects.addEventListener("click", () => {
  projects.scrollIntoView({ behavior: "smooth", block: "start" });
});
menuFooter.addEventListener("click", () => {
  container.scrollIntoView({ behavior: "smooth", block: "start" });
});
