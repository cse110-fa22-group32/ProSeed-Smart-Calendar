/**
 * day_view.js
 * @author Steven Chin, Yangming Guan, Steven Khaw
 * @summary File contains functions for sidebar visibility and population
 * @fileoverview
 *
 * Created at : 2022-11-18 12:11 AM;
 * Last Modified : 2022-12-1 9:20 PM
 */

window.addEventListener("DOMContentLoaded", init);
//shadowClick is 1, prevent hide the side bar.
var shadowClick = 0;

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
  const dayNumbers = document.querySelectorAll(".calendar-day-block");

  dayNumbers.forEach((num) => {
    num.style.cursor = "pointer";
    num.onclick = viewDay;

    //num.addEventListener('click', viewDay);
  });

  addExpandListener();
}

/**
 * @author Yangming Guan
 * handle the delete call
 * @param {Event} event - click event
 * @param {string} year - date year
 * @param {string} month - date month
 * @param {string} day - date day
 * @param {boolean} isEvent - is this call from event type delete.
 */
function callDelete(event, year, month, day, isEvent) {
  shadowClick = 1;
  let eventID = event.currentTarget
    .getRootNode()
    .host.shadowRoot.querySelector("#Id");
  let id = parseInt(eventID.innerHTML);
  if (isEvent) {
    let eventList =
      calendarData[0].years[year].months[month].days[day - 1].Events;
    for (let i = 0; i < eventList.length; i++) {
      if (eventList[i].eventID === id) {
        eventList.splice(i, 1);
      }
    }
  } else {
    let taskList =
      calendarData[0].years[year].months[month].days[day - 1].tasks;
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].taskID === id) {
        taskList.splice(i, 1);
      }
    }
  }
  updateSideBar(day);
  calendarData[0].Show(currDay[0], currDay[1]);
  shadowClick = 0;
}

/**
 * @author Yangming Guan
 * format the date for use.
 * @param {String} date - date info from object data
 * @return new format date
 */
function dateFormat(date) {
  let formatDate = "";
  let dateTemp = date.split("/");
  formatDate =
    "20" +
    dateTemp[2] +
    "-" +
    dateTemp[0].padStart(2, "0") +
    "-" +
    dateTemp[1].padStart(2, "0");
  return formatDate;
}

/**
 * @author Yangming Guan
 * format the time for use.
 * @param {String} time - time info from object data
 * @return new format time
 */
function timeFormat(time) {
  let formatTime = "";
  let timeTemp = time.split(":");
  formatTime =
    timeTemp[0].padStart(2, "0") + ":" + timeTemp[1].padStart(2, "0");
  return formatTime;
}

/**
 * @author Yangming Guan
 * handle the edit click.
 * @param {Event} event - click event
 * @param {string} year - date year
 * @param {string} month - date month
 * @param {string} day - date day
 * @param {boolean} isEvent - is this call from event type delete.
 */
function callEdit(event, year, month, day, isEvent) {
  let eventID = event.currentTarget
    .getRootNode()
    .host.shadowRoot.querySelector("#Id");
  let id = parseInt(eventID.innerHTML);
  if (isEvent) {
    let eventList =
      calendarData[0].years[year].months[month].days[day - 1].Events;
    for (let i = 0; i < eventList.length; i++) {
      if (eventList[i].eventID === id) {
        //put all the info to the dialog.
        let add_event_dialog = document.getElementById("add-event-dialog");
        let eventTitle = document.getElementById("event-title");
        let date = document.getElementById("date");
        let startTime = document.getElementById("start-time");
        let endTime = document.getElementById("end-time");
        let location = document.getElementById("location");
        let description = document.getElementById("description");
        let editInfo = document.getElementById("edit-info");
        let isEdit = document.getElementById("is-edit");
        isEdit.value = true;
        editInfo.value =
          eventList[i].eventID + " " + year + " " + month + " " + day;
        eventTitle.value = eventList[i].eventName;
        date.value = dateFormat(eventList[i].startDay.split(" ")[0]);
        startTime.value = timeFormat(eventList[i].startDay.split(" ")[1]);
        endTime.value = timeFormat(eventList[i].endDay.split(" ")[1]);
        location.value = eventList[i].location;
        description.value = eventList[i].description;
        add_event_dialog.showModal();
      }
    }
  } else {
    let taskList =
      calendarData[0].years[year].months[month].days[day - 1].tasks;
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].taskID === id) {
        //put all the info to the dialog.
        let add_todo_dialog = document.getElementById("add-todo-dialog");
        let todoTitle = document.getElementById("task-title");
        let deuDate = document.getElementById("due-date");
        let description = document.getElementById("todo-description");
        let editInfo = document.getElementById("edit-info");
        let isEdit = document.getElementById("is-edit");
        isEdit.value = true;
        editInfo.value =
          taskList[i].taskID + " " + year + " " + month + " " + day;
        todoTitle.value = taskList[i].taskName;
        deuDate.value =
          dateFormat(taskList[i].dueDate.split(" ")[0]) +
          " " +
          timeFormat(taskList[i].dueDate.split(" ")[1]);
        description.value = taskList[i].description;
        add_todo_dialog.showModal();
      }
    }
  }
  updateSideBar(day);
  calendarData[0].Show(currDay[0], currDay[1]);
}

/**
 * @author Yangming Guan
 * updata the display of side bar.
 * @param {string} day - date day
 */
function updateSideBar(day) {
  // 2022 -> 22
  let currentYear = String(currDay[0] - 2000);
  // 12 -> 11 (December)
  let currentMont = String(currDay[1] - 1);
  let startingDay = getWeekDayIndex(currDay[0], currDay[1], 1);
  let currDayElement = document.getElementById(
    "day-block-" + String(startingDay - 1 + parseInt(day))
  );

  let currDayString =
    currDay[1] +
    "/" +
    day +
    "/" +
    currDay[0] +
    " " +
    getWeekDayString(currDay[0], currDay[1], currDay[2]);

  const sidebarTitleElem = document.querySelector(".sidebar-title");
  sidebarTitleElem.textContent = currDayString;
  if (calendarData[0].years[currentYear] != null) {
    if (calendarData[0].years[currentYear].months[currentMont] != null) {
      //clear side bar
      let sideBarEvent = document.querySelector(".sidebar-events");
      sideBarEvent.innerHTML = "";
      let sideBarTask = document.querySelector(".sidebar-tasks");
      sideBarTask.innerHTML = "";
      if (currDayElement.classList.contains("othermonth") == false) {
        //let day = e.currentTarget.querySelector('p').innerHTML;
        if (
          calendarData[0].years[String(currDay[0] - 2000)].months[
            String(currDay[1] - 1)
          ].days[day - 1] != null
        ) {
          let days =
            calendarData[0].years[String(currDay[0] - 2000)].months[
              String(currDay[1] - 1)
            ].days[day - 1];
          let eventArray = [];
          let dotoArray = [];
          let count = 0;

          //create the data for the event-block
          for (let event of days.Events) {
            eventArray.push({
              id: event.eventID,
              title: event.EventName,
              start: event.StartDay.split(" ")[1],
              end: event.EndDay.split(" ")[1],
            });
            count++;
          }

          //create the data for the task-block
          count = 0;
          for (let task of days.Tasks) {
            dotoArray.push({
              id: task.taskID,
              title: task.TaskName,
              due: task.DueDate,
            });
            count++;
          }

          //add data to the new event-block
          eventArray.forEach((event) => {
            let event_block = document.createElement("event-block");
            event_block.eventData = event;
            sideBarEvent.append(event_block);
            let deleteBtun = event_block.shadowRoot.querySelector("#delete");
            deleteBtun.addEventListener("click", (btnEvnet) => {
              btnEvnet.stopPropagation();
              var result = window.confirm("Do you want to delete this event?");
              if (result) {
                callDelete(btnEvnet, currentYear, currentMont, day, true);
              }
            });

            let editButton = event_block.shadowRoot.querySelector("#edit");
            editButton.addEventListener("click", (btnEvnet) => {
              btnEvnet.stopPropagation();
              callEdit(btnEvnet, currentYear, currentMont, day, true);
            });

            // hide events if needed
            const todoList = document.querySelector(".sidebar-tasks");
            if (todoList.classList.contains(".sidebar-tasks-expanded")) {
              event_block.classList.add("hidden");
            }
          });

          //add data to the new event-block
          dotoArray.forEach((task) => {
            let todo_block = document.createElement("todo-block");
            todo_block.todoData = task;
            let deleteBtun = todo_block.shadowRoot.querySelector("#delete");
            deleteBtun.addEventListener("click", (btnEvnet) => {
              btnEvnet.stopPropagation();
              var result = window.confirm("Do you want to delete this task?");
              if (result) {
                callDelete(btnEvnet, currentYear, currentMont, day, false);
              }
            });
            let editButton = todo_block.shadowRoot.querySelector("#edit");
            editButton.addEventListener("click", (btnEvnet) => {
              btnEvnet.stopPropagation();
              callEdit(btnEvnet, currentYear, currentMont, day, false);
            });

            sideBarTask.append(todo_block);

            // hide tasks if needed
            const todoList = document.querySelector(".sidebar-tasks");
            if (!todoList.classList.contains(".sidebar-tasks-expanded")) {
              todo_block.classList.add("hidden");
            }
          });
        }
      }
    }
  }
}

/**
 * @author Steven Chin, Yangming Guan
 * Handles proper display and operation of day view
 * @param {Event} e - click event
 */
function viewDay(e) {
  //looking for the event list
  let day = e.currentTarget.querySelector("p").innerHTML;
  updateSideBar(day);
  populateSidebar(e);
  showSidebar();
  e.stopPropagation();
  addExitListener();
  hideTodo();
}

/**
 * @author Steven Chin, Yangming Guan
 * Adds event listener to hide sidebar upon clicking outside of sidebar
 */
function addExitListener() {
  document.addEventListener("click", function docClick(event) {
    if (!event.target.closest(".sidebar")) {
      let isEdit = document.getElementById("is-edit");
      if (shadowClick == 0 && isEdit.value == "false") {
        hideSidebar();
      }
      document.removeEventListener("click", addExitListener);
    }
  });
}

/**
 * @author Steven Chin, Steven Khaw
 * Adds event listener to expand to-do list
 */
function addExpandListener() {
  const taskHeaderElem = document.querySelector(".tasks-head");
  taskHeaderElem.addEventListener("click", () => {
    const todoList = document.querySelector(".sidebar-tasks");
    if (todoList.classList.contains(".sidebar-tasks-expanded")) {
      hideTodo();
    } else {
      showTodo();
    }
  });
}

/**
 * @author Steven Chin, Yangming Guan, Steven Khaw
 * Adds style to expand to-do list and shrink event list
 */
function showTodo() {
  const taskHeaderElem = document.querySelector(".tasks-head");
  taskHeaderElem.style.borderRadius = "0px 0px 0px 0px";
  const expandBtn = document.querySelector(".expand-tasks-btn");
  expandBtn.textContent = "⌄";
  const todoList = document.querySelector(".sidebar-tasks");
  todoList.classList.add(".sidebar-tasks-expanded");

  const eventList = document.querySelector(".sidebar-events");
  eventList.style.height = "0";
  eventList.style.flex = "0";

  //hide event
  let events = document.querySelectorAll(".sidebar-events event-block");
  events.forEach((e) => {
    e.classList.add("hidden");
  });

  //show task
  let tasks = document.querySelectorAll(".sidebar-tasks todo-block");
  tasks.forEach((t) => {
    t.classList.remove("hidden");
  });
}

/**
 * @author Steven Chin,Yangming Guan, Steven Khaw
 * Adds style to shrink to-do list and expand event list
 */
function hideTodo() {
  const taskHeaderElem = document.querySelector(".tasks-head");
  taskHeaderElem.style.borderRadius = "0px 0px 30px 0px";
  const expandBtn = document.querySelector(".expand-tasks-btn");
  expandBtn.textContent = "^";
  const todoList = document.querySelector(".sidebar-tasks");
  todoList.classList.remove(".sidebar-tasks-expanded");

  const eventList = document.querySelector(".sidebar-events");
  eventList.style.height = "90%";
  eventList.style.flex = "1";

  //show event
  let events = document.querySelectorAll(".sidebar-events event-block");
  events.forEach((e) => {
    e.classList.remove("hidden");
  });

  //hide tast
  let tasks = document.querySelectorAll(".sidebar-tasks todo-block");
  tasks.forEach((t) => {
    t.classList.add("hidden");
  });
}

/**
 * @author Steven Chin
 * Adds style to move sidebar from off-screen to on-screen
 */
function showSidebar() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.classList.add("sidebar-open");

  const container = sidebar.parentElement;
  container.classList.add("sidebar-container-open");
}

/**
 * @author Steven Chin
 * Removes style to move sidebar from on-screen to off-screen
 */
function hideSidebar() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.classList.remove("sidebar-open");

  const container = sidebar.parentElement;
  container.classList.remove("sidebar-container-open");
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
