/**
 * calendar_helper.js
 * @author Steven Khaw
 * @summary Helper functions for the calendar
 *
 * Created at : 2022-11-18 2:00 PM
 * Last Modified : 2022-11-18 4:30 PM
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
 * returns how many days in month given year and month
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
 * returns the day of the week of an input date
 *
 * @param {number} year year being checked
 * @param {number} month month being checked
 * @param {number} day day being checked
 *
 * @return {string} day of week of input
 */
function getWeekDayString(year, month, day) {

  const DAYS_STRINGS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const date = new Date(month + " " + String(day) + ", " + String(year));
  return DAYS_STRINGS[date.getDay()];
}

/**
 * @author Steven Khaw
 * returns the integer day of the week of an input date
 * index = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
 *
 * @param {number} year year being checked
 * @param {number} month month being checked
 * @param {number} day day being checked
 *
 * @return {number} number day of week of input
 */
function getWeekDayIndex(year, month, day) {

  const date = new Date(String(month) + " " + String(day) + ", " + String(year));
  return date.getDay();
}

/**
 * @author Steven Khaw
 * returns the current date in format: [YYYY,MM,DD]
 *
 * @return {string[]} current date in format: [YYYY,MM,DD]
 */
function getCurrentDay() {

  const date = new Date();
  return [String(date.getFullYear()),String(date.getMonth() + 1),String(date.getDate())];
}
