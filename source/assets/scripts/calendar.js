// calendar.js

// Run the init() function when the page has loaded
window.addEventListener('DOMContentLoaded', init);

const max_month_days = 60;
const test_month_days = 30;
var events_list = [];

var start_col = 0;
var start_row = 0;
var num_disp_days = test_month_days;

// Starts the program, all function calls trace back here
function init() {

  // initialize events list
  for(let i = 0; i < max_month_days; i++) {
    events_list.push([]);
  }
  events_list[5].push('event 1');
  events_list[8].push('event 1');
  events_list[19].push('event 1');
  console.log(events_list.length);
  
  refreshCalendar();

  //initFormHandler();

  //add event to the calendar.
  add_event();
}

//dialog function for add event.
function add_event(){
  //preload the element for further using.
  const add_event_btn = document.getElementById("add-event-btn");
  const add_event_dialog = document.getElementById("add-event-dialog");
  const event_form = add_event_dialog.querySelector("#add-event-form");
  const event_title = add_event_dialog.querySelector(".title");
  const event_date = add_event_dialog.querySelector(".date");
  const event_start_time = add_event_dialog.querySelector(".start-time");
  const event_end_time = add_event_dialog.querySelector(".end-time");
  const event_summary = add_event_dialog.querySelector(".summary");
  const dialog_save = add_event_dialog.querySelector(".save");
  const dialog_cancel = add_event_dialog.querySelector(".cancel");

  //when submit button is clicked in the form.
  event_form.addEventListener("submit",()=>{
    const data = new FormData(event_form);


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
  add_event_btn.addEventListener("click",()=>{
    add_event_dialog.showModal();
  })

  //close dialog without save.
  dialog_cancel.addEventListener("click",()=>{
    add_event_dialog.close();
  })


}

function refreshCalendar() {
  let filling = false;
  let crt_day = 0;

  const tbod = document.getElementsByTagName('tbody')[0];
  const tr_ar = tbod.getElementsByTagName('tr');
  
  // clear calendar
  for(let cur_row = 0; cur_row < 6; cur_row ++) {
    for(let cur_col = 0; cur_col < 7; cur_col++) {
      var td = tr_ar[cur_row].getElementsByTagName('td')[cur_col];
      td.innerHTML = '';
    }
  }

  // populate calendar
  for(let cur_row = 0; cur_row < 6; cur_row ++) {

    for(let cur_col = 0; cur_col < 7; cur_col++) {
      if(!filling) {
        if(cur_col >= start_col && cur_row >= start_row) {
          filling = true;
        }
        else {
          continue;
        }
      }

      var td = tr_ar[cur_row].getElementsByTagName('td')[cur_col];
      td.innerHTML = '' + 
        (crt_day + 1);
        ;

      if(events_list[crt_day].length > 0) {
        for(let ev in events_list[crt_day]) {
          console.log(ev);
          td.innerHTML += '<br>' + ev + ' : ' + events_list[crt_day][ev];
        }
      }
      
      crt_day++;
      if(crt_day >= num_disp_days) {
        break;
      }
    }


    if(crt_day >= num_disp_days) {
      break;
    }
  }

}



function initFormHandler() {

  // register for "add"
  var ref_form = document.getElementById("add-event-form");
  ref_form.addEventListener('submit', (event) => {

    event.preventDefault();

    const form_elem = new FormData(ref_form);
    let new_obj = {};
    for(let ent of form_elem.entries()) {
      new_obj[ent[0]] = ent[1];
    }
    
    events_list[new_obj['dateIn'] - 1].push(new_obj['eventIn']);

    refreshCalendar();
  });

  // register for "change starting date"
  var ref_form2 = document.getElementById("month-setting");
  ref_form2.addEventListener('submit', (event) => {

    event.preventDefault();

    const form_elem = new FormData(ref_form2);
    let new_obj = {};
    for(let ent of form_elem.entries()) {
      new_obj[ent[0]] = ent[1];
    }

    start_col = new_obj["startCol"];
    start_row = new_obj["startRow"];
    num_disp_days = new_obj["monthDays"];

    refreshCalendar();
  });

  // register for "remove"
  var ref_form3 = document.getElementById("remove-event");
  ref_form3.addEventListener('submit', (event) => {

    event.preventDefault();

    const form_elem = new FormData(ref_form3);
    let new_obj = {};
    for(let ent of form_elem.entries()) {
      new_obj[ent[0]] = ent[1];
    }

    events_list[new_obj['date']-1].splice(new_obj['index'], 1);

    refreshCalendar();
  });

}

