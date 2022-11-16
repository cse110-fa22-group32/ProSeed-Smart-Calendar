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
        this.curMonthInt = -1;
        this.currMonthStr = "";
        this.days = [];
        this.users = [];
    }

    //Getters:
    get MonthInt() {
        return this.currMonth;
    }

    get MonthStr() {
        return this.currMonthStr;
    }

    get Users() {
        return this.users;
    }
}