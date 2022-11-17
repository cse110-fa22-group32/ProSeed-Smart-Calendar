/**
 * Year.js
 * @author Steven Khaw
 * @summary File contains Year class and functions.
 * 
 * Created at : 2022-11-16 2:30 PM
 * Last Modified : 2022-11-16 4:30 PM
 */

/** Class Year */
class Year {

    /**
     * @author Steven Khaw
     * Constructs a year object from the class
     * @constructor 
     * 
     * @param {number} currYear year of Year (2022)
     * @param {boolean} isLeapYear boolean on if leap year
     * @param {Month[]} months months of year 
     */
    constructor(currYear, isLeapYear, months) {
        this.currYear = currYear;
        this.isLeapYear = isLeapYear;
        this.months = months;
    }

    // Getters:

    /**
     * @author Steven Khaw
     * @return currYear
     */
    get Year() {
        return this.currYear;
    }

    /**
     * @author Steven Khaw
     * @return isLeapYear
     */
    get LeapYear() {
        return this.isLeapYear;
    }

    /**
     * @author Steven Khaw
     * @return months
     */
    get Months() {
        return this.months;
    }
}