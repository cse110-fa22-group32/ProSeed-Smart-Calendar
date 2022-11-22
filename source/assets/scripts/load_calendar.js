/**
 * @author Steven Khaw
 * @summary loads the current month calendar based on user's machine's current date
 */

// Run the init() function when the page has loaded
window.addEventListener("DOMContentLoaded", init);

let calendarData;

// Starts the program, all function calls trace back here
function init() {

  // currDay format = [YYYY,MM,DD]
  let currDay = getCurrentDay();
  let numWeeks = getWeekCount(currDay[0], currDay[1]);

  // create day blocks
  createCalendarHTML(numWeeks);

  // populate day blocks with date number
  loadCalendarHTML(currDay[0], currDay[1]);

  // adds event listeners to buttons
  traverseMonthEventListener();
  traverseYearEventListener();
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

      calendarElement.appendChild(newDivElement);
    }
  }
}

/**
 * @author Steven Khaw
 * @summary populates each day number into respective day-block-# 
 * and adds month year header
 * 
 * @param {number} year current year of month to populate calendar
 * @param {number} month current month to populate calendar
 */
function loadCalendarHTML(year, month) {

  const headerString = String(indexToMonth(month)) + " " + String(year);
  const headerElement = document.getElementById("calendar-head");

  const newHeaderTextElement = document.createElement("h1");
  newHeaderTextElement.innerText = headerString;
  headerElement.appendChild(newHeaderTextElement);

  // populate variables
  const numDays = getDaysInMonth(year, month);
  let startingDay = getWeekDayIndex(year, month, 1);

  // add day number to each day block
  for (let dayNum = 1; dayNum - 1 < numDays; dayNum++, startingDay++) {
    const currDayElement = document.getElementById("day-block-" +
        String(startingDay));
    const newDayNumElement = document.createElement("p");

    newDayNumElement.innerHTML = dayNum;
    currDayElement.appendChild(newDayNumElement);
  }
}

/**
 * @author Steven Khaw
 * @summary resets HTML elements back to only days of weeks
 */
function resetCalendarHTML() {
  const headerElement = document.getElementById("calendar-head");
  const calendarElement = document.getElementById("calendar-day-main");

  headerElement.replaceChildren();

  while (calendarElement.lastChild.className != "week-of-day") {
    calendarElement.removeChild(calendarElement.lastChild);
  }
}

/**
 * @author Christopher Han, Steven Khaw
 * @summary adds event listeners to buttons that traverse months
 */
function traverseMonthEventListener() {

  let currDay = getCurrentDay();
  let numWeeks = getWeekCount(currDay[0], currDay[1]);

  const monthBtnUp = document.getElementById('calendar-month-btn-up');
  const monthBtnDown = document.getElementById('calendar-month-btn-down');

  monthBtnUp.addEventListener('click', function () {
    resetCalendarHTML();

    if (currDay[1] === 1) { // go to previous year's December
      currDay[0]--;
      currDay[1] = 12;

      numWeeks = getWeekCount(currDay[0], currDay[1]);

      // create day blocks
      createCalendarHTML(numWeeks);

      // populate day blocks with date number
      loadCalendarHTML(currDay[0], currDay[1]);

      calendarData[0].Show(currDay[0],currDay[1]);
    }
    else { // go to previous month
      currDay[1]--;

      numWeeks = getWeekCount(currDay[0], currDay[1]);

      // create day blocks
      createCalendarHTML(numWeeks);

      // populate day blocks with date number
      loadCalendarHTML(currDay[0], currDay[1]);
      
      calendarData[0].Show(currDay[0],currDay[1]);
    }
  });

  monthBtnDown.addEventListener('click', function () {
    resetCalendarHTML();

    if (currDay[1] === 12) { // go to next year's january
      currDay[0]++;
      currDay[1] = 1;

      numWeeks = getWeekCount(currDay[0], currDay[1]);

      // create day blocks
      createCalendarHTML(numWeeks);

      // populate day blocks with date number
      loadCalendarHTML(currDay[0], currDay[1]);

      calendarData[0].Show(currDay[0],currDay[1]);
    }
    else { // go to next month
      currDay[1]++;

      numWeeks = getWeekCount(currDay[0], currDay[1]);

      // create day blocks
      createCalendarHTML(numWeeks);

      // populate day blocks with date number
      loadCalendarHTML(currDay[0], currDay[1]);
      
      calendarData[0].Show(currDay[0],currDay[1]);
    }
  });
}

/**
* @author Christopher Han, Steven Khaw
* @summary adds event listeners to buttons that traverse years
*/
function traverseYearEventListener() {

  let currDay = getCurrentDay();
  let numWeeks = getWeekCount(currDay[0], currDay[1]);

  const yearBtnUp = document.getElementById('calendar-year-btn-up');
  const yearBtnDown = document.getElementById('calendar-year-btn-down');

  yearBtnUp.addEventListener('click', function () { // go to previous year
    resetCalendarHTML();

    currDay[0]--;

    numWeeks = getWeekCount(currDay[0], currDay[1]);

    // create day blocks
    createCalendarHTML(numWeeks);

    // populate day blocks with date number
    loadCalendarHTML(currDay[0], currDay[1]);

    calendarData[0].Show(currDay[0],currDay[1]);
  });

  yearBtnDown.addEventListener('click', function () { // go to next year
    resetCalendarHTML();

    currDay[0]++;

    numWeeks = getWeekCount(currDay[0], currDay[1]);

    // create day blocks
    createCalendarHTML(numWeeks);

    // populate day blocks with date number
    loadCalendarHTML(currDay[0], currDay[1]);

    calendarData[0].Show(currDay[0],currDay[1]);
  });
}