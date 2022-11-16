/**
 * Month.js
 * @author Steven Khaw
 * @summary File contains month class and functions.
 * 
 * Last updated: 11/16
 */

/** Class Month */
class Month {

    /**
     * Create a month object 
     * 
     * @constructor construct empty Month
     */
    constructor(curMonthInt, currMonthStr, days, users) {
        this.curMonthInt = curMonthInt;
        this.currMonthStr = currMonthStr;
        this.days = days;
        this.users = users;
    }

    //Getters:

    /**
     * @author Steven Khaw
     * This is the getter for current month number (1-12)
     */
    get MonthInt() {
        return this.currMonth;
    }

    /**
     * @author Steven Khaw
     * This is the getter for current day
     */
    get MonthStr() {
        return this.currMonthStr;
    }

    /**
     * @author Steven Khaw
     * This is the getter for current day
     */
    get Users() {
        return this.users;
    }
}