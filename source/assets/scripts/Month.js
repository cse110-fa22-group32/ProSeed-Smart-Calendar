/**
 * Month.js
 * @author Steven Khaw
 * @summary File contains Month class and functions.
 * 
 * Created at : 2022-11-16 2:30 PM
 * Last Modified : 2022-11-16 4:30 PM
 */

/** Class Month */
class Month {

    /**
     * @author Steven Khaw
     * Constructs a month object from the class
     * @constructor 
     * 
     * @param {number} currMonthInt number of month (1-12)
     * @param {string} currMonthStr string representation of month ('January'...etc.)
     * @param {Day[]} days days of month
     */
    constructor(currMonthInt, currMonthStr, days) {
        this.currMonthInt = currMonthInt;
        this.currMonthStr = currMonthStr;
        this.days = days;
    }

    // Getters:

    /**
     * @author Steven Khaw
     * @return currMonthInt
     */
    get MonthInt() {
        return this.currMonthInt;
    }

    /**
     * @author Steven Khaw
     * @return currMonthStr
     */
    get MonthStr() {
        return this.currMonthStr;
    }

    /**
     * @author Steven Khaw
     * @return days
     */
    get Days() {
        return this.days;
    }
}