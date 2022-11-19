/**
 * day_view.js
 * @author Steven Chin
 * @summary File contains functions for sidebar visibility and population
 * @fileoverview
 * 
 * Created at : 2022-11-18 12:11 AM;
 * Last Modified : 2022-11-18 
 */

window.addEventListener('DOMContentLoaded', init);

/**
 * @author Steven Chin
 * Initializes day view functionality
 */
function init() {
  addListeners();
}

/**
 * @author Steven Chin
 * Adds event listeners to trigger day view sidebar
 */
function addListeners() {
  const dayNumbers = document.querySelectorAll('.calendar-day-block > p');
  dayNumbers.forEach(num => {
    num.addEventListener('click', viewDay);
  });

  addExpandListener();
}

/**
 * @author Steven Chin
 * Handles proper display and operation of day view
 * @param {Event} e - click event
 */
function viewDay(e) {
  populateSidebar(e);
  showSidebar();
  e.stopPropagation();
  addExitListener();
  hideTodo(); // TODO: Do not hide when clicking on current day number again
}

/**
 * @author Steven Chin
 * Adds event listener to hide sidebar upon clicking outside of sidebar
 */
function addExitListener() {
  document.addEventListener('click', e => {
    if (!e.target.closest('.sidebar')) {
      hideSidebar();
      document.removeEventListener('click', arguments.callee);
    }
  });
}

/**
 * @author Steven Chin
 * Adds event listener to expand to-do list 
 */
function addExpandListener() {
  const expandBtn = document.querySelector('.expand-tasks-btn');
  expandBtn.addEventListener('click', () => {
    const todoList = document.querySelector('.sidebar-tasks');
    if (todoList.classList.contains('.sidebar-tasks-expanded')) {
      hideTodo();
    } else {
      showTodo();
    }
  });
}

/**
 * @author Steven Chin
 * Adds style to expand to-do list and shrink event list
 */
function showTodo() {
  const expandBtn = document.querySelector('.expand-tasks-btn');
  expandBtn.textContent = '⌄';
  const todoList = document.querySelector('.sidebar-tasks');
  todoList.classList.add('.sidebar-tasks-expanded');

  const eventList = document.querySelector('.sidebar-events');
  eventList.style.height = '0';
  eventList.style.flex = '0';
}

/**
 * @author Steven Chin
 * Adds style to shrink to-do list and expand event list
 */
function hideTodo() {
  const expandBtn = document.querySelector('.expand-tasks-btn');
  expandBtn.textContent = '^';
  const todoList = document.querySelector('.sidebar-tasks');
  todoList.classList.remove('.sidebar-tasks-expanded');

  const eventList = document.querySelector('.sidebar-events');
  eventList.style.height = '90%';
  eventList.style.flex = '1';
}

/**
 * @author Steven Chin
 * Adds style to move sidebar from off-screen to on-screen
 */
function showSidebar() {
  const sidebar = document.querySelector('.sidebar');
  sidebar.classList.add('sidebar-open');

  const container = sidebar.parentElement;
  container.classList.add('sidebar-container-open');
}

/**
 * @author Steven Chin
 * Removes style to move sidebar from on-screen to off-screen
 */
function hideSidebar() {
  const sidebar = document.querySelector('.sidebar');
  sidebar.classList.remove('sidebar-open');

  const container = sidebar.parentElement;
  container.classList.remove('sidebar-container-open');
}

/**
 * @author Steven Chin
 * Populates sidebar with calendar event and task elements
 * TODO: Complete populateSidebar function
 * @param {Event} e - click event
 */
function populateSidebar(e) {
  const calendar = -1; // somehow get calendar
  const dayNumber = Number(e.target);
}