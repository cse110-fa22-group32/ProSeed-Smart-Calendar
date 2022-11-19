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

    const DAYS_OF_WEEK_STRING = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const MONTH_KEY = [1,4,4,0,2,5,0,3,6,1,4,6];
    
    const last2Year = parseInt(String(year).slice(-2));
    const quarterLast2 = Math.trunc(last2Year / 2);
    
    let result = last2Year + quarterLast2 + day + MONTH_KEY[month - 1];

    if (getIfLeapYear(year) && (month == 1 || month == 2)) result--;

    /* For a Gregorian date, add 0 for 1900's, 6 for 2000's, 4 for 1700's, 2 for 1800's; for other years, add or subtract multiples of 400.
    Add the last two digits of the year.
    Divide by 7 and take the remainder. */
    return DAYS_OF_WEEK_STRING[result - 1];
}