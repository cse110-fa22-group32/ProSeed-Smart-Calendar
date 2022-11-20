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

    if (getIfLeapYear(year) && month === 2) return 29;

    switch(month) {
        case 1:
            return 31;
        case 2:
            return 28;
        case 3:
            return 31;
        case 4:
            return 30;
        case 5:
            return 31;
        case 6:
            return 30;
        case 7:
            return 31;
        case 8:
            return 31;
        case 9:
            return 30;
        case 10:
            return 31;
        case 11:
            return 30;
        case 12:
            return 31;
        default:
            return -1;
    }
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

    const DAYS_STRINGS = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const MONTH_STRINGS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

    const date = new Date(MONTH_STRINGS[month - 1] + " " + String(day) + ", " + String(year));
    return DAYS_STRINGS[date.getDay()];
}

/**
 * @author Steven Khaw
 * returns the current date in format: YYYY-MM-DD
 * 
 * @return {string} current date in format: YYYY-MM-DD
 */
function getWeekDayString() {

    const date = new Date();
    let currDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    return currDate;
}

console.log(getWeekDayString());
