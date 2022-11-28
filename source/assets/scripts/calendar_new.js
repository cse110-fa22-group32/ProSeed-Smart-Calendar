// Run the init() function when the page has loaded
window.addEventListener("DOMContentLoaded", init);

// Starts the program, all function calls trace back here
function init() {

  add_event();

  add_todo();

}

/**
 * @author Yangming Guan
 * @summary update a day block in html view.
 * 
 * @param {number} firstDayOfWeek first day of week day.
 * @param {number} dayOfMonth the day of month
 * @param {Array} data json data.
 * @default firstDayOfWeek should be greter than 0.
 */
function update_day_block(firstDayOfWeek, dayOfMonth, data) {
  const day_block = document.getElementById("day-block-" + String(firstDayOfWeek - 1 + dayOfMonth));
  day_block.innerHTML = '';
  let p = document.createElement("p");
  p.innerHTML = dayOfMonth;
  day_block.append(p);
  let count = 0;
  for (let d of data) {
    let p = document.createElement("p");
    p.innerHTML = d;
    day_block.append(p);
    if (count > 5) {
      console.log(dayOfMonth.length)
      p.innerHTML = String(data.length) + "+";
      day_block.append(p);
      break;
    }
    count++;
  }
}

/**
 * @author Yuelin Dai,Yangming Guan
 * @summary pop dialog for add event.
 */
function add_event() {
  //preload the element for further using.
  const add_event_btn = document.getElementById("add-event-btn");
  const add_event_dialog = document.getElementById("add-event-dialog");
  const event_form = add_event_dialog.querySelector("#add-event-form");
  const event_dialog_cancel = add_event_dialog.querySelector(".cancel");

  event_form.addEventListener("submit", () => {
    const data = new FormData(event_form);

    let eventTitle = data.get("title");
    let eventDate = data.get("date"); // format: "YYYY-MM-DD"
    let eventStart = data.get("start-time");
    let eventEnd = data.get("end-time");
    let eventLoc = data.get("location");
    let eventDescription = data.get("description");

    let eventLastTwoYear = Number(eventDate.substring(2, 4));
    let eventYear = Number(eventDate.substring(0, 4));
    let eventMonth = Number(eventDate.substring(5, 7));
    let eventDay = Number(eventDate.substring(8, 10));

    eventStart = String(eventMonth) + "/" + String(eventDay) + "/"
      + eventLastTwoYear + " " + eventStart;

    eventEnd = String(eventMonth) + "/" + String(eventDay) + "/"
      + eventLastTwoYear + " " + eventEnd;

    const newEvent = new Event(eventStart, eventEnd, eventTitle,
      eventLoc, eventDescription);

    // allocate empty year/month/day when needed
    if (calendarData[0].years[eventLastTwoYear] == null) { // allocate 12 empty months
      calendarData[0].years[eventLastTwoYear] = new Year(eventYear, []);
      calendarData[0].years[eventLastTwoYear].months =
        [null, null, null, null, null, null, null, null,
          null, null, null, null];

      console.log('new year');
    }

    if (calendarData[0].years[eventLastTwoYear].months[eventMonth - 1] == null) { // allocate 31 empty days
      calendarData[0].years[eventLastTwoYear].months[eventMonth - 1] =
        new Month(eventMonth, indexToMonth(eventMonth), []);
      calendarData[0].years[eventLastTwoYear].months[eventMonth - 1].days =
        [null, null, null, null, null, null, null, null, null, null,
          null, null, null, null, null, null, null, null, null, null,
          null, null, null, null, null, null, null, null, null, null, null];

      console.log('new month');
    }

    if (calendarData[0].years[eventLastTwoYear].months[eventMonth - 1].
      days[eventDay - 1] == null) { // allocate one day
      calendarData[0].years[eventLastTwoYear].months[eventMonth - 1].
        days[eventDay - 1] = new Day(eventDay, indexToDay(eventDay), [], []);
    }

    calendarData[0].years[eventLastTwoYear].months[eventMonth - 1].
      days[eventDay - 1].events.push(newEvent);

    currDay = [eventYear, eventMonth, eventDay];

    // refresh calendar
    // resetCalendarHTML();
    numWeeks = getWeekCount(eventYear, eventMonth);
    hideLastRow(numWeeks); // create day blocks
    loadCalendarHTML(eventYear, eventMonth);
    calendarData[0].Show(eventYear, eventMonth);
  })

  //display the dialog.
  add_event_btn.addEventListener("click", () => {
    add_event_dialog.showModal();
  })

  //close dialog without save.
  event_dialog_cancel.addEventListener("click", () => {
    add_event_dialog.close();
  })
}

/**
 * @author Steven Khaw,Yangming Guan
 * @summary pop a dialog for add todo list.
 */
function add_todo() {
  //preload the element for further using.
  const add_todo_btn = document.getElementById("add-todo-btn");
  const add_todo_dialog = document.getElementById("add-todo-dialog");
  const todo_form = add_todo_dialog.querySelector("#add-todo-form");
  const todo_dialog_cancel = add_todo_dialog.querySelector(".cancel");

  //when submit button is clicked in the form.
  todo_form.addEventListener("submit", () => {
    const data = new FormData(todo_form);

    let taskTitle = data.get("title");
    let taskDate = data.get("due-date"); // format: "YYYY-MM-DDTHH:MM"
    let taskDescription = data.get("description");

    let taskLastTwoYear = Number(taskDate.substring(2, 4));
    let taskYear = Number(taskDate.substring(0, 4));
    let taskMonth = Number(taskDate.substring(5, 7));
    let taskDay = Number(taskDate.substring(8, 10));
    let taskHour = Number(taskDate.substring(11, 13));
    let taskMinute = Number(taskDate.substring(14, 16));

    let taskDueDate = String(taskMonth + "/" + taskDay + "/" + taskLastTwoYear
      + " " + taskHour + ":" + taskMinute);

    const newTask = new Task(taskTitle, [], taskDueDate, taskDescription, false);

    // allocate empty year/month/day when needed
    if (calendarData[0].years[taskLastTwoYear] == null) { // allocate 12 empty months
      calendarData[0].years[taskLastTwoYear] = new Year(taskYear, []);
      calendarData[0].years[taskLastTwoYear].months =
        [null, null, null, null, null, null, null, null,
          null, null, null, null];

      console.log('new year');
    }

    if (calendarData[0].years[taskLastTwoYear].months[taskMonth - 1] == null) { // allocate 31 empty days
      calendarData[0].years[taskLastTwoYear].months[taskMonth - 1] =
        new Month(taskMonth, indexToMonth(taskMonth), []);
      calendarData[0].years[taskLastTwoYear].months[taskMonth - 1].days =
        [null, null, null, null, null, null, null, null, null, null,
          null, null, null, null, null, null, null, null, null, null,
          null, null, null, null, null, null, null, null, null, null, null];

      console.log('new month');
    }

    if (calendarData[0].years[taskLastTwoYear].months[taskMonth - 1].
      days[taskDay - 1] == null) { // allocate one day
      calendarData[0].years[taskLastTwoYear].months[taskMonth - 1].
        days[taskDay - 1] = new Day(taskDay, indexToDay(taskDay), [], []);
    }

    calendarData[0].years[taskLastTwoYear].months[taskMonth - 1].
      days[taskDay - 1].tasks.push(newTask);

    currDay = [taskYear, taskMonth, taskDay];

    // refresh calendar
    //resetCalendarHTML();
    numWeeks = getWeekCount(taskYear, taskMonth);
    hideLastRow(numWeeks); // create day blocks
    loadCalendarHTML(taskYear, taskMonth);
    calendarData[0].Show(taskYear, taskMonth);
  })

  //display the dialog.
  add_todo_btn.addEventListener("click", () => {
    add_todo_dialog.showModal();
  })

  //close dialog without save.
  todo_dialog_cancel.addEventListener("click", () => {
    add_todo_dialog.close();
  })

}