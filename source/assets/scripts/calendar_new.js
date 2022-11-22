// Run the init() function when the page has loaded
window.addEventListener("DOMContentLoaded", init);

// Starts the program, all function calls trace back here
function init() {

  add_event();

  add_todo();

}

//test function
//update a day block in html view.
function update_day_block(firstDayOfWeek,dayOfMonth,data){
  const day_block = document.getElementById("day-block-"+String(firstDayOfWeek-1+dayOfMonth));
  day_block.innerHTML = '';
  let p = document.createElement("p");
  p.innerHTML = dayOfMonth;
  day_block.append(p);
  let count = 0;
  for (let d of data){
    let p = document.createElement("p");
    p.innerHTML = d;
    day_block.append(p);
    if(count>5) {
      console.log(dayOfMonth.length)
      p.innerHTML = String(data.length)+"+";
      day_block.append(p);
      break;
    }
    count++;
  }
}

//dialog function for add event.
function add_event(){
  //preload the element for further using.
  const add_event_btn = document.getElementById("add-event-btn");
  const add_event_dialog = document.getElementById("add-event-dialog");
  const event_form = add_event_dialog.querySelector("#add-event-form");
  /* const event_title = add_event_dialog.querySelector(".title");
  const event_date = add_event_dialog.querySelector(".date");
  const event_start_time = add_event_dialog.querySelector(".start-time");
  const event_end_time = add_event_dialog.querySelector(".end-time");
  const event_description = add_event_dialog.querySelector(".description");
  const event_dialog_save = add_event_dialog.querySelector(".save"); */
  const event_dialog_cancel = add_event_dialog.querySelector(".cancel");

  //when submit button is clicked in the form.
  /* event_form.addEventListener("submit",()=>{
    const data = new FormData(event_form);

    //test code for append string to the day block.
    let firstDayOfWeek = 0;
    let day = 0;
    let event = [];

    for(let d of data) {
      if(d[0]=="date"){
        let date = new Date(d[1]);
        day = date.getDate()+1;
        date.setDate(1);
        firstDayOfWeek = date.getDay();
      }
      if(d[0]=="title"){
        event.push(d[1]);
      }
    }

    update_day_block(firstDayOfWeek,day,event);
  }) */

  event_form.addEventListener("submit",()=>{
    const data = new FormData(event_form);

    let eventTitle = data.get("title");
    // let eventDate = new Date(data.get("date"));
    let eventDate = data.get("date"); // format: "YYYY-MM-DD"
    let eventStart =  data.get("start-time");
    let eventEnd = data.get("end-time");
    let eventLoc = data.get("location");
    let eventDescription = data.get("description");

    // didn't use Date() since the date format "YYYY-MM-DD" sometimes leades to timezone change
    // let eventLastTwoYear = Number(String(eventDate.getFullYear()).slice(-2));
    // let eventYear = Number(eventDate.getFullYear());
    // let eventMonth = Number(eventDate.getMonth() + 1)
    // let eventDay = Number(eventDate.getDate());
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
    if(calendarData[0].years[eventLastTwoYear] == null) { // allocate 12 empty months
      calendarData[0].years[eventLastTwoYear] = [null, null, null, null, null, null, null, null, null, null, null, null];
    }
    if(calendarData[0].years[eventLastTwoYear].months[eventMonth-1] == null) { // allocate 31 empty days
      calendarData[0].years[eventLastTwoYear].months[eventMonth-1] = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null];
    }
    if(calendarData[0].years[eventLastTwoYear].months[eventMonth-1].days[eventDay-1] == null) { // allocate one day
      calendarData[0].years[eventLastTwoYear].months[eventMonth-1].days[eventDay-1] = new Day(eventDay, indexToDay(eventDay), [], []);
    }
        
    calendarData[0].years[eventLastTwoYear].months[eventMonth - 1].
        days[eventDay-1].events.push(newEvent);
    
    calendarData[0].Show(eventYear,eventMonth)
  })

  //display the dialog.
  add_event_btn.addEventListener("click",()=>{
    add_event_dialog.showModal();
  })

  //close dialog without save.
  event_dialog_cancel.addEventListener("click",()=>{
    add_event_dialog.close();
  })

}

//dialog function for add todo list.
function add_todo(){
  //preload the element for further using.
  const add_todo_btn = document.getElementById("add-todo-btn");
  const add_todo_dialog = document.getElementById("add-todo-dialog");
  const todo_form = add_todo_dialog.querySelector("#add-todo-form");
  /* const todo_title = add_todo_dialog.querySelector(".title");
  const todo_date = add_todo_dialog.querySelector(".duedate");
  const todo_description = add_todo_dialog.querySelector(".description");
  const todo_dialog_save = add_todo_dialog.querySelector(".save"); */
  const todo_dialog_cancel = add_todo_dialog.querySelector(".cancel");

  //when submit button is clicked in the form.
  todo_form.addEventListener("submit",()=>{
    const data = new FormData(todo_form);


    //test code for append string to the day block.
    let num = 0;
    for(let d of data) {
      const day_block = document.getElementById("day-block-"+String(num));
      let p = document.createElement("p");
      p.innerHTML ="<p>"+d[0]+":"+d[1]+"</p>";
      day_block.append(p);
      num ++;
    }
    
    //===========================
    //update calendar here.
    //using function update_day() to update a day event in the calendar.
    //===========================

  })

  //display the dialog.
  add_todo_btn.addEventListener("click",()=>{
    add_todo_dialog.showModal();
  })

  //close dialog without save.
  todo_dialog_cancel.addEventListener("click",()=>{
    add_todo_dialog.close();
  })

}