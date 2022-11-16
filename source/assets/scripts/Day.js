/**
 * Day.js
 * @author Steven Khaw
 * @summary File contains day class and functions.
 * 
 * Last updated: 11/16
 */

/** Class Day */
class Day {

    /**
     * @author Steven Khaw
     * Create a day object 
     * 
     * @constructor construct empty Day
     */
    constructor(currDayInt, currDayStr, events, todos, users) {
        this.currDayInt = currDayInt;
        this.currDayStr = currDayStr;
        this.events = events;
        this.todos = todos;
        this.users = users;
    }

    //Getters:

    /**
     * @author Steven Khaw
     * This is the getter for current day
     */
    get DayInt() {
        return this.currDayInt;
    }
    
    /**
     * @author Steven Khaw
     * This is the getter for current day
     */
    get DayStr() {
        return this.currDayStr;
    }

    /**
     * @author Steven Khaw
     * This is the getter for current day
     */
    get Events() {
        return this.events;
    }

    /**
     * @author Steven Khaw
     * This is the getter for current day
     */
    get Todos() {
        return this.todos;
    }

    /**
     * @author Steven Khaw
     * This is the getter for current day
     */
    get Users() {
        return this.users;
    }
}