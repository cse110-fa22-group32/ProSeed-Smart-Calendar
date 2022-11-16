/**
 * Year.js
 * @author Steven Khaw
 * @summary File contains year class and functions.
 * 
 * Last updated: 11/16
 */

/** Class Year */
class Year {

    /**
     * Create a year object 
     * 
     * @constructor construct empty Year
     */
    constructor(currYear, leapYear, months, users) {
        this.curYear = currYear;
        this.leapYear = leapYear;
        this.months = months;
        this.users = users;
    }
}