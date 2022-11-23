/**
 * calendar_helper.js
 * @author Steven Khaw
 * @summary Helper functions for the calendar
 *
 * Created at : 2022-11-18 2:00 PM
 * Last Modified : 2022-11-21 11:30 PM
 */

/**
 * @author Steven Khaw
 * returns whether a year is a leap year or not
 *
 * @param {number} year year being checked
 *
 * @return {boolean} true if leap year, false if else
 */
 function getIfLeapYear(year) {
  return (year % 4 === 0);
}

/**
 * @author Steven Khaw
 * @summary returns how many days in month given year and month
 *
 * @param {number} year year being checked
 * @param {number} month month being checked (1-12)
 *
 * @return {number} days in a month given year
 */
function getDaysInMonth(year, month) {
  return new Date(year, month, 0).getDate();
}

/**
 * @author Steven Khaw
 * @summary returns month string
 *
 * @param {number} monthIndex month being checked (1-12)
 *
 * @return {string} month of given index input
 */
 function indexToMonth(monthIndex) {
  return ["January","February","March","April","May","June","July","August",
      "September","October","November","December"][monthIndex - 1];
}

/**
 * @author Steven Khaw
 * @summary returns day of week string
 *
 * @param {number} dayIndex day being checked
 *
 * @return {string} day of given index input
 */
 function indexToDay(dayIndex) {
  return ["Monday","Tuesday","Wednesday","Thursday","Friday", 
      "Saturday","Sunday"][dayIndex - 1];
}

/**
 * @author Steven Khaw
 * @summary returns the day of the week of an input date
 *
 * @param {number} year year being checked
 * @param {number} month month being checked
 * @param {number} day day being checked
 *
 * @return {string} day of week of input
 */
function getWeekDayString(year, month, day) {

  const DAYS_STRINGS = ["Sunday","Monday","Tuesday","Wednesday",
      "Thursday","Friday","Saturday"];

  const date = new Date(month + " " + String(day) + ", " + String(year));
  return DAYS_STRINGS[date.getDay()];
}

/**
 * @author Steven Khaw
 * @summary calculates the integer day of the week of an input date
 * index = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
 *
 * @param {number} year year being checked
 * @param {number} month month being checked
 * @param {number} day day being checked
 *
 * @return {number} number day of week of input
 */
function getWeekDayIndex(year, month, day) {

  const date = new Date(String(month) + " " + String(day) + ", " 
      + String(year));
  return date.getDay();
}

/**
 * @author Steven Khaw
 * @summary calculates how many weeks in month
 * 
 * @param {number} year year being checked
 * @param {number} month month being checked
 * @returns {number} number of weeks of input 
 */
function getWeekCount(year, month) {

  var firstOfMonth = new Date(year,month - 1,1);
  var lastOfMonth = new Date(year,month,0);

  var used = firstOfMonth.getDay() + lastOfMonth.getDate();

  return Math.ceil(used / 7);
}

/**
 * @author Steven Khaw
 * @summary returns the current date in format: [YYYY,MM,DD]
 *
 * @return {string[]} current date in format: [YYYY,MM,DD]
 */
function getCurrentDay() {

  const date = new Date();
  return [String(date.getFullYear()),String(date.getMonth() + 1),
      String(date.getDate())];
}
