/**
 * day_view.js
 * @author Steven Chin
 * @summary File contains functions for sidebar visibility and population
 * 
 * Created at : 2022-11-18 12:11 AM;
 * Last Modified : 2022-11-18 
 */

window.addEventListener('DOMContentLoaded', init);

function init() {
  addListeners();
}

function addListeners() {
  const dayNumbers = document.querySelectorAll(".calendar-day-block > p");
  
  dayNumbers.forEach(num => {
    num.addEventListener('click', e => {
      showSidebar();
      e.stopPropagation();
      addExitListener();
    });
  });

}

function addExitListener() {
  document.addEventListener('click', e => {
    if (!e.target.closest(".sidebar")) {
      hideSidebar();
    }
  });
}

function showSidebar() {
  document.querySelector(".sidebar").classList.remove("hidden");
}

function hideSidebar() {
  document.querySelector(".sidebar").classList.add("hidden");
}

