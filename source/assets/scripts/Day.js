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
     * Create a day object 
     * 
     * @constructor construct empty Day
     */
    constructor() {
        this.currDay = -1;
        this.events = [];
        this.todos = [];
        this.users = [];
    }

    //Getters:
    
    get Day() {
        return this.currDay;
    }

    get Events() {
        return this.events;
    }

    get Todos() {
        return this.todos;
    }

    get Users() {
        return this.users;
    }
}