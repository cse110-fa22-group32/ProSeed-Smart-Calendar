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
   var currDay = getCurrentDay();
   addListeners();
 }
 
 /**
  * @author Steven Chin
  * Adds event listeners to trigger day view sidebar
  */
 function addListeners() {
   const dayNumbers = document.querySelectorAll('.calendar-day-block');
   
   dayNumbers.forEach(num => {
     num.style.cursor = 'pointer';
     num.onclick = viewDay;
 
     //num.addEventListener('click', viewDay);
   });
 
   addExpandListener();
 }
 
 /**
  * @author Steven Chin, Yangming Guan
  * Handles proper display and operation of day view
  * @param {Event} e - click event
  */
 function viewDay(e) {
   //looking for the event list
   if(calendarData[0].years[String(currDay[0]-2000)] != null){
     if(calendarData[0].years[String(currDay[0]-2000)].months[String(currDay[1]-1)] != null){
       //clear side bar
       let sideBarEvent = document.querySelector('.sidebar-events');
       sideBarEvent.innerHTML = '';
       let sideBarTask = document.querySelector('.sidebar-tasks');
       sideBarTask.innerHTML = '';
       if(e.currentTarget.classList.contains('othermonth') == false){
         let day = e.currentTarget.querySelector('p').innerHTML;
         if(calendarData[0].years[String(currDay[0]-2000)].months[String(currDay[1]-1)].days[day-1] != null){
           let days = calendarData[0].years[String(currDay[0]-2000)].months[String(currDay[1]-1)].days[day-1]
           let eventArray = [];
           let dotoArray = [];
           let count = 0;
 
           //create the data for the event-block
           for (let event of days.Events) {
             eventArray.push({
               "id": count,
               "title": event.EventName,
               "start": event.StartDay.split(" ")[1],
               "end": event.EndDay.split(" ")[1],
             });
             count++;
           }
 
           //create the data for the event-block
           count = 0;
           for (let event of days.Tasks) {
             dotoArray.push({
               "id": count,
               "title": event.TaskName,
               "due": event.DueDate.split(" ")[1],
             });
             count++;
           }
 
           //add data to the new event-block
           eventArray.forEach((event)=>{
             console.log(event.end)
             let event_block = document.createElement('event-block');
             event_block.eventData = event;
             sideBarEvent.append(event_block);
             let deleteBtun = event_block.shadowRoot.querySelector("#delete");
             deleteBtun.addEventListener("click",(btnEvnet)=>{
              console.log(btnEvnet.currentTarget.getRootNode().host);
              //===================
              //delete method here for event, or have some other idea.
              //==================

             });
           });
 
           //add data to the new event-block
           dotoArray.forEach((task)=>{
             console.log(task.end)
             let todo_block = document.createElement('todo-block');
             todo_block.todoData = task;
             let deleteBtun = todo_block.shadowRoot.querySelector("#delete");
             deleteBtun.addEventListener("click",(btnEvnet)=>{
              console.log(btnEvnet.currentTarget.parentNode);
              //===================
              //delete method here for todo, or have some other idea.
              //==================
             });
             sideBarTask.append(todo_block);
           });
           
         }
       }
     }
   }
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
  * @author Steven Chin, Yangming Guan
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
 
   //hide event
   let events = document.querySelectorAll('.sidebar-events event-block');
   events.forEach(e=>{
     e.classList.add("hidden");
   })
 
   //show task
   let tasks = document.querySelectorAll('.sidebar-tasks todo-block');
   tasks.forEach(t=>{
     t.classList.remove("hidden");
   })
 }
 
 /**
  * @author Steven Chin,Yangming Guan
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
 
   //show event
   let events = document.querySelectorAll('.sidebar-events event-block');
   events.forEach(e=>{
     e.classList.remove("hidden");
   })
 
   //hide tast
   let tasks = document.querySelectorAll('.sidebar-tasks todo-block');
   tasks.forEach(t=>{
     t.classList.add("hidden");
   })
 
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