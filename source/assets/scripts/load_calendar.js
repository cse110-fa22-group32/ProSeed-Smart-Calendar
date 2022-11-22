/**
 * @author Steven Khaw
 * @summary loads the current month calendar based on user's machine's current date
 */

// Run the init() function when the page has loaded
window.addEventListener("DOMContentLoaded", init);

// Starts the program, all function calls trace back here
function init() {

  const NUMBER_OF_WEEKS_TO_INIT = 6;

  createCalendarHTML(NUMBER_OF_WEEKS_TO_INIT);

  let currDay = getCurrentDay();

  loadCalendarHTML(currDay[0],currDay[1]);
}

/**
 * @author Steven Khaw
 * @summary loads in day-block-# elems in the HTML
 * 
 * @param {number} weeks number of weeks you would like to load into calendar
 * @default weeks should be set to 6 by default
 */
function createCalendarHTML(weeks) {

  let totalCount = 0;

  const calendarElement = document.getElementById("calendar-day-main");

  for (let week = 0; week < weeks; week++) {
    for (let day = 0; day < 7; day++) {
      let newDivElement = document.createElement("div");

      newDivElement.className = "calendar-day-block"; 
      newDivElement.id = String("day-block-" + totalCount++);

      calendarElement.append(newDivElement);
    }
  }
}

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

function loadCalendarHTML(year, month) {

}