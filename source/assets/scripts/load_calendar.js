/**
 * @author Steven Khaw
 * @summary loads the current month calendar based on user's machine's current date
 */

// Run the init() function when the page has loaded
window.addEventListener("DOMContentLoaded", init);

// Starts the program, all function calls trace back here
function init() {

  // currDay format = [YYYY,MM,DD]
  const currDay = getCurrentDay();
  const numWeeks = getWeekCount(currDay[0],currDay[1]);

  createCalendarHTML(numWeeks);

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

/**
 * @author Steven Khaw
 * @summary populates each day number into respective day-block-#
 * 
 * @param {number} year current year of month to populate calendar
 * @param {number} month current month to populate calendar
 */
function loadCalendarHTML(year, month) {
  
  // populate variables
  const numDays = getDaysInMonth(year,month);
  let startingDay = getWeekDayIndex(year,month,1);

  // add day number to each day block
  for (let dayNum = 1; dayNum - 1 < numDays; dayNum++, startingDay++) {
    const currDayElement = document.getElementById("day-block-" + 
        String(startingDay));
    const newDayNumElement = document.createElement("p");

    newDayNumElement.innerHTML = dayNum;
    currDayElement.append(newDayNumElement);
  }
}