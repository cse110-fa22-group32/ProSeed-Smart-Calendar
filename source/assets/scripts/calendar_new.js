
// Run the init() function when the page has loaded
window.addEventListener('DOMContentLoaded', init);

// Starts the program, all function calls trace back here
function init() {

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
